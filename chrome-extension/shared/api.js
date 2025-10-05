// AI Photo Editor API Client for Chrome Extension
class AIPhotoEditorAPI {
  static BASE_URL = 'https://www.aiphotoeditor.space/api';
  static TIMEOUT = 30000; // 30 seconds

  /**
   * Generate image from text prompt
   * @param {Object} params - Generation parameters
   * @param {string} params.prompt - Text prompt
   * @param {string} params.size - Image size (e.g., "1024x1024")
   * @param {string} params.source - Request source identifier
   * @returns {Promise<Object>} Generation result
   */
  static async generateImage(params) {
    try {
      const response = await this.makeRequest('/generate', {
        method: 'POST',
        body: JSON.stringify({
          prompt: params.prompt,
          size: params.size || '1024x1024',
          source: params.source || 'chrome_extension'
        })
      });

      if (response.success && response.artifacts && response.artifacts.length > 0) {
        const artifact = response.artifacts[0];
        return {
          success: true,
          imageUrl: artifact.url || `data:image/png;base64,${artifact.base64}`,
          metadata: {
            prompt: params.prompt,
            size: params.size,
            generatedAt: Date.now()
          }
        };
      } else {
        throw new Error(response.error || 'No image generated');
      }
    } catch (error) {
      console.error('API Generation Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate image'
      };
    }
  }

  /**
   * Generate username-based avatar
   * @param {Object} params - Avatar parameters
   * @param {string} params.username - Username for avatar
   * @param {string} params.style - Avatar style
   * @returns {Promise<Object>} Generation result
   */
  static async generateAvatar(params) {
    const prompt = this.createAvatarPrompt(params.username, params.style);
    
    return this.generateImage({
      prompt: prompt,
      size: '1024x1024',
      source: 'chrome_extension_avatar'
    });
  }

  /**
   * Create avatar prompt from username and style
   * @param {string} username - Username
   * @param {string} style - Style preference
   * @returns {string} Generated prompt
   */
  static createAvatarPrompt(username, style = 'professional') {
    const stylePrompts = {
      professional: `Professional headshot portrait representing the username "${username}", clean background, business attire, confident expression, high quality, detailed`,
      cartoon: `Cartoon character avatar for username "${username}", colorful, friendly, animated style, cute and approachable, vibrant colors`,
      artistic: `Artistic portrait representing the username "${username}", creative interpretation, stylized, unique artistic flair, expressive`,
      minimal: `Minimalist avatar for username "${username}", simple design, clean lines, modern aesthetic, geometric`
    };

    return stylePrompts[style] || stylePrompts.professional;
  }

  /**
   * Make HTTP request with error handling and timeout
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} Response data
   */
  static async makeRequest(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Extension-Version': '1.0.0',
          'X-Source': 'chrome-extension',
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // Use default error message if JSON parsing fails
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error - please check your connection');
      }
      
      throw error;
    }
  }

  /**
   * Check API health status
   * @returns {Promise<boolean>} API health status
   */
  static async checkHealth() {
    try {
      const response = await this.makeRequest('/health', {
        method: 'GET'
      });
      return response.status === 'ok';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  /**
   * Send analytics event
   * @param {Object} event - Event data
   * @returns {Promise<boolean>} Success status
   */
  static async sendAnalytics(event) {
    try {
      await this.makeRequest('/analytics', {
        method: 'POST',
        body: JSON.stringify({
          ...event,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          extensionVersion: '1.0.0'
        })
      });
      return true;
    } catch (error) {
      console.error('Analytics failed:', error);
      return false;
    }
  }

  /**
   * Get user quota information
   * @returns {Promise<Object>} Quota information
   */
  static async getQuota() {
    try {
      const response = await this.makeRequest('/quota', {
        method: 'GET'
      });
      return {
        success: true,
        quota: response.quota || { daily: 50, used: 0, remaining: 50 }
      };
    } catch (error) {
      console.error('Quota check failed:', error);
      return {
        success: false,
        quota: { daily: 50, used: 0, remaining: 50 }
      };
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIPhotoEditorAPI;
} else {
  window.AIPhotoEditorAPI = AIPhotoEditorAPI;
} 