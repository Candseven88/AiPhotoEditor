const fs = require('fs').promises;
const path = require('path');
const { ImagePool } = require('@squoosh/lib');

async function optimizeImages() {
  const imagePool = new ImagePool();
  const publicDir = path.join(process.cwd(), 'public');
  
  // 获取所有图片文件
  async function getImageFiles(dir) {
    const files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files.push(...await getImageFiles(fullPath));
      } else if (/\.(png|jpg|jpeg)$/i.test(item.name)) {
        files.push(fullPath);
      }
    }
    return files;
  }
  
  try {
    const imageFiles = await getImageFiles(publicDir);
    console.log(`Found ${imageFiles.length} images to optimize`);
    
    for (const imagePath of imageFiles) {
      console.log(`Optimizing: ${path.relative(publicDir, imagePath)}`);
      
      try {
        const imageBuffer = await fs.readFile(imagePath);
        const image = imagePool.ingestImage(imageBuffer);
        
        // 获取原始信息
        const { bitmap } = await image.decoded;
        const originalSize = imageBuffer.length;
        
        // 判断是否为Logo，使用不同的压缩策略
        const isLogo = imagePath.includes('Logo');
        const isCaseImage = imagePath.includes('cases');
        
        let optimizedBuffer;
        
        if (isLogo) {
          // Logo使用WebP格式，高质量
          await image.encode({
            webp: { quality: 90 }
          });
          optimizedBuffer = (await image.encodedWith.webp).binary;
          
          // 保存为webp格式
          const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
          await fs.writeFile(webpPath, optimizedBuffer);
          console.log(`  Logo saved as WebP: ${path.basename(webpPath)}`);
          
        } else if (isCaseImage) {
          // 案例图片压缩为较小尺寸，保持质量
          const maxWidth = 800;
          const maxHeight = 600;
          
          let targetWidth = bitmap.width;
          let targetHeight = bitmap.height;
          
          if (bitmap.width > maxWidth || bitmap.height > maxHeight) {
            const aspectRatio = bitmap.width / bitmap.height;
            if (bitmap.width > bitmap.height) {
              targetWidth = maxWidth;
              targetHeight = Math.round(maxWidth / aspectRatio);
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(maxHeight * aspectRatio);
            }
          }
          
          // 调整尺寸并压缩
          await image.preprocess({
            resize: {
              width: targetWidth,
              height: targetHeight
            }
          });
          
          await image.encode({
            webp: { quality: 80 }
          });
          
          optimizedBuffer = (await image.encodedWith.webp).binary;
          
          // 保存为webp格式
          const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
          await fs.writeFile(webpPath, optimizedBuffer);
          
        } else {
          // 其他图片使用WebP，中等质量
          await image.encode({
            webp: { quality: 75 }
          });
          optimizedBuffer = (await image.encodedWith.webp).binary;
          
          const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
          await fs.writeFile(webpPath, optimizedBuffer);
        }
        
        const newSize = optimizedBuffer.length;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB -> Optimized: ${(newSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
        
      } catch (error) {
        console.error(`Error optimizing ${imagePath}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('Error during optimization:', error);
  } finally {
    await imagePool.close();
  }
}

console.log('Starting image optimization...');
optimizeImages().then(() => {
  console.log('Image optimization completed!');
  console.log('Note: Original images are preserved. WebP versions have been created for better performance.');
}).catch(console.error); 