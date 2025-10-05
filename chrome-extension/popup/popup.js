// Chrome Extension Popup Script
class PopupController {
  constructor() {
    this.currentTab = 'text-to-image';
    this.isGenerating = false;
    this.stats = { total: 0, today: 0 };
    
    this.init();
  }

  async init() {
    await this.loadStats();
    this.bindEvents();
    this.updateUI();
    this.setupCharacterCounter();
  }

  // Load user statistics from storage
  async loadStats() {
    try {
      const result = await chrome.storage.local.get(['stats']);
      if (result.stats) {
        this.stats = result.stats;
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  }

  // Save statistics to storage
  async saveStats() {
    try {
      await chrome.storage.local.set({ stats: this.stats });
    } catch (error) {
      console.error('Failed to save stats:', error);
    }
  }

  // Bind all event listeners
  bindEvents() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.closest('.tab-btn').dataset.tab);
      });
    });

    // Generate buttons
    document.getElementById('generateText').addEventListener('click', () => {
      this.handleTextToImage();
    });

    document.getElementById('generateAvatar').addEventListener('click', () => {
      this.handleUsernameToAvatar();
    });

    // Result actions
    document.getElementById('closeResult').addEventListener('click', () => {
      this.hideResult();
    });

    document.getElementById('downloadBtn').addEventListener('click', () => {
      this.downloadImage();
    });

    document.getElementById('copyBtn').addEventListener('click', () => {
      this.copyImage();
    });

    // Upgrade button
    document.getElementById('upgradeBtn').addEventListener('click', () => {
      this.openWebsite();
    });

    // Footer links
    document.getElementById('historyLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.showHistory();
    });

    document.getElementById('settingsLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.showSettings();
    });

    document.getElementById('helpLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.openWebsite('/help');
    });
  }

  // Setup character counter for textarea
  setupCharacterCounter() {
    const textPrompt = document.getElementById('textPrompt');
    const charCount = document.getElementById('charCount');
    
    textPrompt.addEventListener('input', () => {
      charCount.textContent = textPrompt.value.length;
    });
  }

  // Switch between tabs
  switchTab(tabId) {
    this.currentTab = tabId;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });

    // Track tab switch
    this.trackEvent('tab_switch', tabId);
  }

  // Handle text to image generation
  async handleTextToImage() {
    const prompt = document.getElementById('textPrompt').value.trim();
    const size = document.getElementById('imageSize').value;

    if (!prompt) {
      this.showError('Please enter a description for your image');
      return;
    }

    if (prompt.length < 3) {
      this.showError('Please enter a more detailed description');
      return;
    }

    await this.generateImage({
      type: 'text-to-image',
      prompt: prompt,
      size: size
    });
  }

  // Handle username to avatar generation
  async handleUsernameToAvatar() {
    const username = document.getElementById('username').value.trim();
    const style = document.getElementById('avatarStyle').value;

    if (!username) {
      this.showError('Please enter a username');
      return;
    }

    if (username.length < 2) {
      this.showError('Username must be at least 2 characters long');
      return;
    }

    // Create avatar prompt based on username and style
    const avatarPrompt = this.createAvatarPrompt(username, style);

    await this.generateImage({
      type: 'username-to-avatar',
      prompt: avatarPrompt,
      size: '1024x1024',
      username: username,
      style: style
    });
  }

  // Create avatar prompt from username and style
  createAvatarPrompt(username, style) {
    const stylePrompts = {
      professional: `Professional headshot portrait of a person representing the username "${username}", clean background, business attire, confident expression, high quality`,
      cartoon: `Cartoon character avatar for username "${username}", colorful, friendly, animated style, cute and approachable`,
      artistic: `Artistic portrait representing the username "${username}", creative interpretation, stylized, unique artistic flair`,
      minimal: `Minimalist avatar for username "${username}", simple design, clean lines, modern aesthetic`
    };

    return stylePrompts[style] || stylePrompts.professional;
  }

  // Main image generation function
  async generateImage(params) {
    if (this.isGenerating) return;

    this.isGenerating = true;
    this.showLoading();
    
    try {
      // Track generation start
      this.trackEvent('generation_start', params.type);

      // Call the API
      const result = await AIPhotoEditorAPI.generateImage({
        prompt: params.prompt,
        size: params.size,
        source: 'chrome_extension'
      });

      if (result.success && result.imageUrl) {
        this.showResult(result.imageUrl);
        this.updateStats();
        this.trackEvent('generation_success', params.type);
      } else {
        throw new Error(result.error || 'Generation failed');
      }

    } catch (error) {
      console.error('Generation error:', error);
      this.showError(error.message || 'Failed to generate image. Please try again.');
      this.trackEvent('generation_error', params.type);
    } finally {
      this.isGenerating = false;
      this.hideLoading();
    }
  }

  // Show loading state
  showLoading() {
    document.getElementById('loadingState').style.display = 'block';
    document.querySelector('.tab-content').style.display = 'none';
    
    // Simulate progress
    this.simulateProgress();
  }

  // Hide loading state
  hideLoading() {
    document.getElementById('loadingState').style.display = 'none';
    document.querySelector('.tab-content').style.display = 'block';
  }

  // Simulate loading progress
  simulateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const steps = [
      { progress: 20, text: 'Analyzing prompt...' },
      { progress: 40, text: 'Initializing AI model...' },
      { progress: 60, text: 'Generating image...' },
      { progress: 80, text: 'Processing details...' },
      { progress: 95, text: 'Finalizing...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep >= steps.length || !this.isGenerating) {
        clearInterval(interval);
        return;
      }

      const step = steps[currentStep];
      progressFill.style.width = `${step.progress}%`;
      progressText.textContent = step.text;
      currentStep++;
    }, 1500);
  }

  // Show generation result
  showResult(imageUrl) {
    const resultSection = document.getElementById('resultSection');
    const generatedImage = document.getElementById('generatedImage');
    
    generatedImage.src = imageUrl;
    generatedImage.onload = () => {
      resultSection.style.display = 'block';
      document.querySelector('.tab-content').style.display = 'none';
    };

    // Store current image for download/copy
    this.currentImageUrl = imageUrl;
  }

  // Hide result and return to form
  hideResult() {
    document.getElementById('resultSection').style.display = 'none';
    document.querySelector('.tab-content').style.display = 'block';
    this.currentImageUrl = null;
  }

  // Download current image
  async downloadImage() {
    if (!this.currentImageUrl) return;

    try {
      const response = await fetch(this.currentImageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.trackEvent('image_download', 'success');
    } catch (error) {
      console.error('Download failed:', error);
      this.showError('Failed to download image');
    }
  }

  // Copy image to clipboard
  async copyImage() {
    if (!this.currentImageUrl) return;

    try {
      const response = await fetch(this.currentImageUrl);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);

      this.showSuccess('Image copied to clipboard!');
      this.trackEvent('image_copy', 'success');
    } catch (error) {
      console.error('Copy failed:', error);
      this.showError('Failed to copy image');
    }
  }

  // Update usage statistics
  async updateStats() {
    this.stats.total++;
    
    // Update today's count (reset if new day)
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('lastGenerationDate');
    
    if (lastDate !== today) {
      this.stats.today = 1;
      localStorage.setItem('lastGenerationDate', today);
    } else {
      this.stats.today++;
    }

    await this.saveStats();
    this.updateUI();
  }

  // Update UI with current stats
  updateUI() {
    document.getElementById('totalGenerated').textContent = this.stats.total;
    document.getElementById('todayGenerated').textContent = this.stats.today;
  }

  // Open main website
  openWebsite(path = '') {
    const url = `https://www.aiphotoeditor.space${path}?utm_source=chrome_extension`;
    chrome.tabs.create({ url });
    this.trackEvent('website_visit', path || 'home');
  }

  // Show history (placeholder)
  showHistory() {
    this.showInfo('History feature coming soon!');
    this.trackEvent('feature_request', 'history');
  }

  // Show settings (placeholder)
  showSettings() {
    this.showInfo('Settings feature coming soon!');
    this.trackEvent('feature_request', 'settings');
  }

  // Show error message
  showError(message) {
    this.showNotification(message, 'error');
  }

  // Show success message
  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  // Show info message
  showInfo(message) {
    this.showNotification(message, 'info');
  }

  // Show notification (simple implementation)
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideDown 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 3000);
  }

  // Track events for analytics
  trackEvent(action, label) {
    try {
      // Send to analytics API
      fetch('https://www.aiphotoeditor.space/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'chrome_extension',
          action: action,
          label: label,
          timestamp: Date.now()
        })
      }).catch(console.error);
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from { transform: translate(-50%, -100%); opacity: 0; }
    to { transform: translate(-50%, 0); opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translate(-50%, 0); opacity: 1; }
    to { transform: translate(-50%, -100%); opacity: 0; }
  }
`;
document.head.appendChild(style); 