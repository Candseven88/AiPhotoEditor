// Chrome Extension Content Script
class ContentScript {
  constructor() {
    this.init();
  }

  init() {
    this.setupMessageListeners();
    // this.setupKeyboardShortcuts(); // 暂时禁用
    // this.injectFloatingButton(); // 暂时禁用
    // this.detectImageElements(); // 暂时禁用
  }

  // Setup message listeners for communication with background script
  setupMessageListeners() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true;
    });
  }

  // Setup keyboard shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+Shift+G (or Cmd+Shift+G on Mac) to generate from selected text
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'G') {
        e.preventDefault();
        this.generateFromSelection();
      }
      
      // Ctrl+Shift+A (or Cmd+Shift+A on Mac) to generate avatar from selected text
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        this.generateAvatarFromSelection();
      }
    });
  }

  // Inject floating action button
  injectFloatingButton() {
    // Only inject on certain domains to avoid conflicts
    const allowedDomains = ['twitter.com', 'facebook.com', 'instagram.com', 'reddit.com', 'linkedin.com'];
    const currentDomain = window.location.hostname.replace('www.', '');
    
    if (!allowedDomains.some(domain => currentDomain.includes(domain))) {
      return;
    }

    const button = document.createElement('div');
    button.id = 'ai-photo-editor-float-btn';
    button.innerHTML = `
      <div class="ai-float-button">
        <img src="${chrome.runtime.getURL('assets/icons/icon48.png')}" alt="AI Photo Editor" />
        <span class="tooltip">AI Photo Editor</span>
      </div>
    `;
    
    button.addEventListener('click', () => {
      this.openExtensionPopup();
    });

    document.body.appendChild(button);
  }

  // Detect and enhance image elements
  detectImageElements() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
      // Skip very small images (likely icons)
      if (img.width < 100 || img.height < 100) return;
      
      // Add hover overlay for image enhancement options
      this.addImageOverlay(img, index);
    });

    // Watch for dynamically added images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const newImages = node.querySelectorAll ? node.querySelectorAll('img') : [];
            newImages.forEach((img, index) => {
              if (img.width >= 100 && img.height >= 100) {
                this.addImageOverlay(img, Date.now() + index);
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Add overlay to images for enhancement options
  addImageOverlay(img, index) {
    const overlay = document.createElement('div');
    overlay.className = 'ai-image-overlay';
    overlay.innerHTML = `
      <div class="ai-overlay-content">
        <button class="ai-enhance-btn" data-action="enhance">
          ✨ Enhance
        </button>
        <button class="ai-style-btn" data-action="style">
          🎨 Restyle
        </button>
      </div>
    `;

    // Position overlay
    img.style.position = 'relative';
    img.parentNode.style.position = 'relative';
    
    overlay.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = e.target.dataset.action;
      if (action) {
        this.handleImageAction(img, action);
      }
    });

    // Show overlay on hover
    img.addEventListener('mouseenter', () => {
      if (!img.querySelector('.ai-image-overlay')) {
        img.parentNode.appendChild(overlay);
      }
    });

    img.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!overlay.matches(':hover')) {
          overlay.remove();
        }
      }, 100);
    });

    overlay.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!img.matches(':hover')) {
          overlay.remove();
        }
      }, 100);
    });
  }

  // Handle image enhancement actions
  async handleImageAction(img, action) {
    try {
      // Get image URL
      const imageUrl = img.src;
      
      // Open website with image editing functionality
      const params = new URLSearchParams({
        utm_source: 'chrome_extension',
        utm_medium: 'image_overlay',
        action: action,
        image_url: imageUrl
      });

      const websiteUrl = `https://www.aiphotoeditor.space/aiphotoeditor?${params.toString()}`;
      
      // Send message to background script to open website
      chrome.runtime.sendMessage({
        action: 'open-website',
        url: `/aiphotoeditor?${params.toString()}`
      });

      // Track action
      this.trackEvent('image_action', action, {
        imageUrl: imageUrl.substring(0, 100),
        domain: window.location.hostname
      });

    } catch (error) {
      console.error('Image action error:', error);
    }
  }

  // Generate image from selected text
  generateFromSelection() {
    const selectedText = window.getSelection().toString().trim();
    
    if (!selectedText) {
      this.showNotification('Please select some text first', 'info');
      return;
    }

    if (selectedText.length < 3) {
      this.showNotification('Please select more descriptive text', 'warning');
      return;
    }

    // Open extension popup with selected text
    this.openExtensionPopup({
      text: selectedText,
      type: 'text-to-image'
    });

    this.trackEvent('keyboard_shortcut', 'generate_from_selection', {
      textLength: selectedText.length,
      domain: window.location.hostname
    });
  }

  // Generate avatar from selected text
  generateAvatarFromSelection() {
    const selectedText = window.getSelection().toString().trim();
    
    if (!selectedText) {
      this.showNotification('Please select a username first', 'info');
      return;
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!usernameRegex.test(selectedText) || selectedText.length > 50) {
      this.showNotification('Selected text doesn\'t look like a username', 'warning');
      return;
    }

    // Open extension popup with selected username
    this.openExtensionPopup({
      text: selectedText,
      type: 'avatar'
    });

    this.trackEvent('keyboard_shortcut', 'generate_avatar_from_selection', {
      username: selectedText,
      domain: window.location.hostname
    });
  }

  // Open extension popup
  openExtensionPopup(data = {}) {
    // Send message to background script to open popup
    chrome.runtime.sendMessage({
      action: 'open-popup',
      data: data
    });
  }

  // Handle messages from background script
  handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'get-selected-text':
        const selectedText = window.getSelection().toString().trim();
        sendResponse({ text: selectedText });
        break;
        
      case 'show-notification':
        this.showNotification(request.message, request.type);
        sendResponse({ success: true });
        break;
        
      case 'highlight-images':
        this.highlightImages();
        sendResponse({ success: true });
        break;
        
      default:
        sendResponse({ error: 'Unknown action' });
    }
  }

  // Show notification to user
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `ai-notification ai-notification-${type}`;
    notification.innerHTML = `
      <div class="ai-notification-content">
        <div class="ai-notification-icon">
          ${type === 'error' ? '❌' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}
        </div>
        <div class="ai-notification-message">${message}</div>
        <button class="ai-notification-close">×</button>
      </div>
    `;

    // Add event listeners
    notification.querySelector('.ai-notification-close').addEventListener('click', () => {
      notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.add('ai-notification-show');
    }, 100);
  }

  // Highlight images for enhancement
  highlightImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img) => {
      if (img.width >= 100 && img.height >= 100) {
        img.classList.add('ai-highlighted-image');
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
          img.classList.remove('ai-highlighted-image');
        }, 3000);
      }
    });
  }

  // Track events
  trackEvent(action, label, metadata = {}) {
    chrome.runtime.sendMessage({
      action: 'track-event',
      event: {
        action: action,
        label: label,
        url: window.location.href,
        domain: window.location.hostname,
        timestamp: Date.now(),
        ...metadata
      }
    });
  }

  // Utility: Check if element is visible
  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Utility: Get element's computed style
  getComputedStyleProperty(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
  }
}

// Initialize content script when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ContentScript();
  });
} else {
  new ContentScript();
} 