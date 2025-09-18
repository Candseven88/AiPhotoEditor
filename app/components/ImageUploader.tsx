'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X } from 'lucide-react'
import { useToast } from './ui/Toast'
import Image from 'next/image'

interface ImageUploaderProps {
  uploadedImage: string | null
  onImageUpload: (imageData: string) => void
  onRemoveImage: () => void
  disabled?: boolean
}

export default function ImageUploader({ 
  uploadedImage, 
  onImageUpload, 
  onRemoveImage, 
  disabled = false 
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showError } = useToast()

  // 处理图像上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 验证文件大小 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        showError('File size must be less than 10MB', 'File Too Large')
        return
      }

      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        showError('Please upload an image file', 'Invalid File Type')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Source Image
      </label>
      
      {!uploadedImage ? (
        <motion.div
          className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors hover:border-orange-400 ${
            disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
          }`}
          onClick={() => !disabled && fileInputRef.current?.click()}
          whileHover={!disabled ? { scale: 1.01 } : {}}
          whileTap={!disabled ? { scale: 0.99 } : {}}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="relative rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={uploadedImage}
            alt="Uploaded image"
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />
          {!disabled && (
            <motion.button
              onClick={onRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
} 