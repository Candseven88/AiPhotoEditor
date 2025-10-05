// AI Photo Editor API Client for Chrome Extension - TEST VERSION
class AIPhotoEditorAPI {
  static BASE_URL = 'https://www.aiphotoeditor.space/api';
  static TIMEOUT = 30000; // 30 seconds

  /**
   * Generate image from text prompt - TEST VERSION
   * @param {Object} params - Generation parameters
   * @param {string} params.prompt - Text prompt
   * @param {string} params.size - Image size (e.g., "1024x1024")
   * @param {string} params.source - Request source identifier
   * @returns {Promise<Object>} Generation result
   */
  static async generateImage(params) {
    try {
      console.log('🚀 Starting image generation...', params);
      
      // 首先尝试真实API
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
        }
      } catch (apiError) {
        console.warn('Real API failed, using demo image:', apiError);
        
        // 如果真实API失败，返回演示图片
        return this.generateDemoImage(params);
      }

      // 如果没有artifacts，也使用演示图片
      return this.generateDemoImage(params);

    } catch (error) {
      console.error('API Generation Error:', error);
      
      // 最后的备选方案：演示图片
      return this.generateDemoImage(params);
    }
  }

  /**
   * 生成演示图片
   */
  static async generateDemoImage(params) {
    console.log('📸 Generating demo image for:', params.prompt);
    
    // 模拟加载时间
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 根据提示词选择不同的演示图片
    const demoImages = {
      'sunset': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1024&h=1024&fit=crop',
      'mountain': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1024&h=1024&fit=crop',
      'beautiful': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1024&h=1024&fit=crop',
      'landscape': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1024&h=1024&fit=crop',
      'default': 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1024&h=1024&fit=crop'
    };
    
    // 根据提示词匹配图片
    let imageUrl = demoImages.default;
    const prompt = params.prompt.toLowerCase();
    
    for (const [keyword, url] of Object.entries(demoImages)) {
      if (prompt.includes(keyword)) {
        imageUrl = url;
        break;
      }
    }
    
    return {
      success: true,
      imageUrl: imageUrl,
      metadata: {
        prompt: params.prompt,
        size: params.size,
        generatedAt: Date.now(),
        isDemo: true,
        demoMessage: '这是演示图片。完整功能请访问网站。'
      }
    };
  }

  /**
   * Generate username-based avatar
   */
  static async generateAvatar(params) {
    console.log('👤 Generating avatar for:', params.username);
    
    // 为头像使用不同的演示图片
    const avatarImages = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1024&h=1024&fit=crop',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=1024&h=1024&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1024&h=1024&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1024&h=1024&fit=crop'
    ];
    
    // 根据用户名选择头像（简单哈希）
    const hash = params.username.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const imageIndex = Math.abs(hash) % avatarImages.length;
    
    // 模拟加载时间
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      imageUrl: avatarImages[imageIndex],
      metadata: {
        username: params.username,
        style: params.style,
        generatedAt: Date.now(),
        isDemo: true,
        demoMessage: '这是演示头像。完整功能请访问网站。'
      }
    };
  }

  /**
   * Make HTTP request with error handling and timeout
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