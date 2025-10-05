// Utility functions for Chrome Extension
class ExtensionUtils {
  /**
   * Validate image prompt
   * @param {string} prompt - Text prompt to validate
   * @returns {Object} Validation result
   */
  static validatePrompt(prompt) {
    if (!prompt || typeof prompt !== 'string') {
      return { valid: false, error: 'Prompt is required' };
    }

    const trimmed = prompt.trim();
    
    if (trimmed.length < 3) {
      return { valid: false, error: 'Prompt must be at least 3 characters long' };
    }

    if (trimmed.length > 500) {
      return { valid: false, error: 'Prompt must be less than 500 characters' };
    }

    // Check for inappropriate content keywords
    const inappropriateKeywords = [
      'nude', 'naked', 'nsfw', 'explicit', 'sexual', 'porn', 'xxx',
      'violence', 'gore', 'blood', 'kill', 'death', 'suicide',
      'hate', 'racist', 'discrimination', 'offensive'
    ];

    const lowerPrompt = trimmed.toLowerCase();
    for (const keyword of inappropriateKeywords) {
      if (lowerPrompt.includes(keyword)) {
        return { valid: false, error: 'Prompt contains inappropriate content' };
      }
    }

    return { valid: true, prompt: trimmed };
  }

  /**
   * Validate username for avatar generation
   * @param {string} username - Username to validate
   * @returns {Object} Validation result
   */
  static validateUsername(username) {
    if (!username || typeof username !== 'string') {
      return { valid: false, error: 'Username is required' };
    }

    const trimmed = username.trim();
    
    if (trimmed.length < 2) {
      return { valid: false, error: 'Username must be at least 2 characters long' };
    }

    if (trimmed.length > 50) {
      return { valid: false, error: 'Username must be less than 50 characters' };
    }

    // Allow alphanumeric, underscore, hyphen, and dot
    const validPattern = /^[a-zA-Z0-9._-]+$/;
    if (!validPattern.test(trimmed)) {
      return { valid: false, error: 'Username can only contain letters, numbers, dots, underscores, and hyphens' };
    }

    return { valid: true, username: trimmed };
  }

  /**
   * Format file size in human readable format
   * @param {number} bytes - Size in bytes
   * @returns {string} Formatted size
   */
  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Generate unique ID
   * @returns {string} Unique identifier
   */
  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Debounce function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function calls
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Convert data URL to blob
   * @param {string} dataURL - Data URL to convert
   * @returns {Blob} Converted blob
   */
  static dataURLToBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], { type: mime });
  }

  /**
   * Download file from URL
   * @param {string} url - File URL
   * @param {string} filename - Download filename
   */
  static async downloadFile(url, filename) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = objectURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(objectURL), 100);
      
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      return false;
    }
  }

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} Success status
   */
  static async copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const result = document.execCommand('copy');
        document.body.removeChild(textArea);
        return result;
      }
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
      return false;
    }
  }

  /**
   * Get image dimensions from URL
   * @param {string} url - Image URL
   * @returns {Promise<Object>} Image dimensions
   */
  static getImageDimensions(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight
        });
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Format timestamp to readable date
   * @param {number} timestamp - Unix timestamp
   * @returns {string} Formatted date
   */
  static formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  /**
   * Storage helper functions
   */
  static storage = {
    /**
     * Get item from chrome storage
     * @param {string|string[]} keys - Storage keys
     * @returns {Promise<Object>} Storage data
     */
    async get(keys) {
      try {
        return await chrome.storage.local.get(keys);
      } catch (error) {
        console.error('Storage get failed:', error);
        return {};
      }
    },

    /**
     * Set item in chrome storage
     * @param {Object} items - Items to store
     * @returns {Promise<boolean>} Success status
     */
    async set(items) {
      try {
        await chrome.storage.local.set(items);
        return true;
      } catch (error) {
        console.error('Storage set failed:', error);
        return false;
      }
    },

    /**
     * Remove item from chrome storage
     * @param {string|string[]} keys - Keys to remove
     * @returns {Promise<boolean>} Success status
     */
    async remove(keys) {
      try {
        await chrome.storage.local.remove(keys);
        return true;
      } catch (error) {
        console.error('Storage remove failed:', error);
        return false;
      }
    },

    /**
     * Clear all storage
     * @returns {Promise<boolean>} Success status
     */
    async clear() {
      try {
        await chrome.storage.local.clear();
        return true;
      } catch (error) {
        console.error('Storage clear failed:', error);
        return false;
      }
    }
  };

  /**
   * Analytics helper functions
   */
  static analytics = {
    /**
     * Track event
     * @param {string} action - Event action
     * @param {string} label - Event label
     * @param {Object} metadata - Additional metadata
     */
    track(action, label, metadata = {}) {
      try {
        // Send to extension analytics
        const event = {
          action,
          label,
          timestamp: Date.now(),
          url: window.location?.href || 'extension',
          userAgent: navigator.userAgent,
          ...metadata
        };

        // Store locally for batch sending
        this.storeEvent(event);
        
        // Send immediately for important events
        if (['generation_success', 'generation_error', 'website_visit'].includes(action)) {
          this.sendEvent(event);
        }
      } catch (error) {
        console.error('Analytics tracking failed:', error);
      }
    },

    /**
     * Store event locally
     * @param {Object} event - Event data
     */
    async storeEvent(event) {
      try {
        const { events = [] } = await ExtensionUtils.storage.get(['events']);
        events.push(event);
        
        // Keep only last 100 events
        if (events.length > 100) {
          events.splice(0, events.length - 100);
        }
        
        await ExtensionUtils.storage.set({ events });
      } catch (error) {
        console.error('Event storage failed:', error);
      }
    },

    /**
     * Send event to analytics API
     * @param {Object} event - Event data
     */
    async sendEvent(event) {
      try {
        await fetch('https://www.aiphotoeditor.space/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: 'chrome_extension',
            ...event
          })
        });
      } catch (error) {
        console.error('Analytics send failed:', error);
      }
    }
  };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExtensionUtils;
} else {
  window.ExtensionUtils = ExtensionUtils;
} 