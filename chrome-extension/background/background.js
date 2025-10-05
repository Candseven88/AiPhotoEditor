// Chrome Extension Background Script
class BackgroundService {
  constructor() {
    this.init();
  }

  init() {
    this.setupContextMenus();
    this.setupMessageListeners();
    this.setupInstallHandlers();
    this.setupAlarmHandlers();
  }

  // Setup right-click context menus - 简化版本
  setupContextMenus() {
    // Remove existing menus first
    chrome.contextMenus.removeAll(() => {
      // 只保留打开网站的功能
      chrome.contextMenus.create({
        id: 'open-website',
        title: 'Open AI Photo Editor',
        contexts: ['page'],
        documentUrlPatterns: ['http://*/*', 'https://*/*']
      });
    });
  }

  // Setup message listeners for communication with popup and content scripts
  setupMessageListeners() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep message channel open for async response
    });

    // Handle context menu clicks
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      this.handleContextMenuClick(info, tab);
    });
  }

  // Setup extension install/update handlers
  setupInstallHandlers() {
    chrome.runtime.onInstalled.addListener((details) => {
      this.handleInstall(details);
    });

    chrome.runtime.onStartup.addListener(() => {
      this.handleStartup();
    });
  }

  // Setup alarm handlers for periodic tasks
  setupAlarmHandlers() {
    chrome.alarms.onAlarm.addListener((alarm) => {
      this.handleAlarm(alarm);
    });

    // Create periodic alarms
    chrome.alarms.create('analytics-sync', { periodInMinutes: 60 });
    chrome.alarms.create('quota-reset', { periodInMinutes: 1440 }); // Daily
  }

  // Handle messages from popup and content scripts
  async handleMessage(request, sender, sendResponse) {
    try {
      switch (request.action) {
        case 'generate-image':
          await this.handleGenerateImage(request.data, sendResponse);
          break;
          
        case 'open-website':
          await this.openWebsite(request.url || '');
          sendResponse({ success: true });
          break;
          
        case 'track-event':
          await this.trackEvent(request.event);
          sendResponse({ success: true });
          break;
          
        case 'get-quota':
          const quota = await this.getQuota();
          sendResponse(quota);
          break;
          
        case 'sync-analytics':
          await this.syncAnalytics();
          sendResponse({ success: true });
          break;
          
        default:
          sendResponse({ error: 'Unknown action' });
      }
    } catch (error) {
      console.error('Message handling error:', error);
      sendResponse({ error: error.message });
    }
  }

  // Handle context menu clicks - 简化版本
  async handleContextMenuClick(info, tab) {
    switch (info.menuItemId) {
      case 'open-website':
        await this.openWebsite('?utm_source=chrome_extension&utm_medium=context_menu');
        break;
    }
  }

  // Generate image from selected text
  async generateFromSelection(text, type, tab) {
    try {
      // Track context menu usage
      await this.trackEvent({
        action: 'context_menu_generate',
        label: type,
        text: text.substring(0, 100), // Truncate for privacy
        tabUrl: tab.url
      });

      // Open popup with pre-filled text
      const popupUrl = chrome.runtime.getURL('popup/popup.html');
      const popupWindow = await chrome.windows.create({
        url: `${popupUrl}?text=${encodeURIComponent(text)}&type=${type}`,
        type: 'popup',
        width: 400,
        height: 650,
        focused: true
      });

      // Store context for popup
      await chrome.storage.local.set({
        contextGeneration: {
          text: text,
          type: type,
          timestamp: Date.now()
        }
      });

    } catch (error) {
      console.error('Context menu generation error:', error);
      
      // Fallback: open main website
      await this.openWebsite(`?utm_source=chrome_extension&utm_medium=context_menu_fallback&text=${encodeURIComponent(text)}`);
    }
  }

  // Handle image generation requests
  async handleGenerateImage(data, sendResponse) {
    try {
      // Check quota first
      const quota = await this.getQuota();
      if (quota.remaining <= 0) {
        sendResponse({
          success: false,
          error: 'Daily quota exceeded. Please visit our website for unlimited access.'
        });
        return;
      }

      // Make API request
      const response = await fetch('https://www.aiphotoeditor.space/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Extension-Version': '1.0.0',
          'X-Source': 'chrome-extension'
        },
        body: JSON.stringify({
          prompt: data.prompt,
          size: data.size || '1024x1024',
          source: 'chrome_extension'
        })
      });

      const result = await response.json();
      
      if (result.success && result.artifacts && result.artifacts.length > 0) {
        // Update quota
        await this.updateQuota();
        
        // Track successful generation
        await this.trackEvent({
          action: 'generation_success',
          label: data.type || 'text-to-image',
          prompt: data.prompt.substring(0, 100)
        });

        sendResponse({
          success: true,
          imageUrl: result.artifacts[0].url || `data:image/png;base64,${result.artifacts[0].base64}`,
          metadata: {
            prompt: data.prompt,
            size: data.size,
            generatedAt: Date.now()
          }
        });
      } else {
        throw new Error(result.error || 'Generation failed');
      }

    } catch (error) {
      console.error('Generation error:', error);
      
      await this.trackEvent({
        action: 'generation_error',
        label: data.type || 'text-to-image',
        error: error.message
      });

      sendResponse({
        success: false,
        error: error.message || 'Failed to generate image'
      });
    }
  }

  // Open main website
  async openWebsite(path = '') {
    const url = `https://www.aiphotoeditor.space${path}`;
    await chrome.tabs.create({ url });
    
    await this.trackEvent({
      action: 'website_visit',
      label: 'background',
      path: path
    });
  }

  // Handle extension installation
  async handleInstall(details) {
    if (details.reason === 'install') {
      // First time installation
      await this.trackEvent({
        action: 'extension_installed',
        label: 'new_user'
      });

      // Initialize storage
      await chrome.storage.local.set({
        stats: { total: 0, today: 0 },
        quota: { daily: 50, used: 0, remaining: 50 },
        installDate: Date.now(),
        version: '1.0.0'
      });

      // Open welcome page
      await this.openWebsite('?utm_source=chrome_extension&utm_medium=install&utm_campaign=welcome');

    } else if (details.reason === 'update') {
      // Extension updated
      await this.trackEvent({
        action: 'extension_updated',
        label: details.previousVersion
      });
    }
  }

  // Handle extension startup
  async handleStartup() {
    await this.trackEvent({
      action: 'extension_startup',
      label: 'browser_start'
    });
  }

  // Handle periodic alarms
  async handleAlarm(alarm) {
    switch (alarm.name) {
      case 'analytics-sync':
        await this.syncAnalytics();
        break;
        
      case 'quota-reset':
        await this.resetDailyQuota();
        break;
    }
  }

  // Track events
  async trackEvent(event) {
    try {
      // Store event locally
      const { events = [] } = await chrome.storage.local.get(['events']);
      events.push({
        ...event,
        timestamp: Date.now(),
        extensionVersion: '1.0.0'
      });

      // Keep only last 100 events
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }

      await chrome.storage.local.set({ events });

      // Send important events immediately
      if (['generation_success', 'generation_error', 'extension_installed'].includes(event.action)) {
        await this.sendAnalytics([event]);
      }

    } catch (error) {
      console.error('Event tracking failed:', error);
    }
  }

  // Sync analytics to server
  async syncAnalytics() {
    try {
      const { events = [] } = await chrome.storage.local.get(['events']);
      
      if (events.length > 0) {
        await this.sendAnalytics(events);
        
        // Clear sent events
        await chrome.storage.local.set({ events: [] });
      }
    } catch (error) {
      console.error('Analytics sync failed:', error);
    }
  }

  // Send analytics to server
  async sendAnalytics(events) {
    try {
      await fetch('https://www.aiphotoeditor.space/api/analytics/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'chrome_extension',
          events: events
        })
      });
    } catch (error) {
      console.error('Analytics send failed:', error);
    }
  }

  // Get current quota
  async getQuota() {
    try {
      const { quota } = await chrome.storage.local.get(['quota']);
      return quota || { daily: 50, used: 0, remaining: 50 };
    } catch (error) {
      console.error('Quota get failed:', error);
      return { daily: 50, used: 0, remaining: 50 };
    }
  }

  // Update quota after generation
  async updateQuota() {
    try {
      const quota = await this.getQuota();
      quota.used++;
      quota.remaining = Math.max(0, quota.daily - quota.used);
      
      await chrome.storage.local.set({ quota });
    } catch (error) {
      console.error('Quota update failed:', error);
    }
  }

  // Reset daily quota
  async resetDailyQuota() {
    try {
      const today = new Date().toDateString();
      const { lastQuotaReset } = await chrome.storage.local.get(['lastQuotaReset']);
      
      if (lastQuotaReset !== today) {
        await chrome.storage.local.set({
          quota: { daily: 50, used: 0, remaining: 50 },
          lastQuotaReset: today
        });
        
        await this.trackEvent({
          action: 'quota_reset',
          label: 'daily'
        });
      }
    } catch (error) {
      console.error('Quota reset failed:', error);
    }
  }
}

// Initialize background service
new BackgroundService(); 