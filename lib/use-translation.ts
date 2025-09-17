'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import enTranslations from '../locales/en/common.json'
import jaTranslations from '../locales/ja/common.json'

const translations = {
  en: enTranslations,
  ja: jaTranslations,
}

export type SupportedLocale = keyof typeof translations

// 获取嵌套对象的值
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && current[key] ? current[key] : path
  }, obj)
}

// useTranslation hook for App Router with [locale] dynamic segment
export function useTranslation() {
  const params = useParams()
  const locale = (params?.locale as SupportedLocale) || 'en'

  const t = (key: string): string => {
    const translation = translations[locale]
    if (!translation) {
      console.warn(`Translation not found for locale: ${locale}`)
      return key
    }
    
    const value = getNestedValue(translation, key)
    if (value === key) {
      console.warn(`Translation key not found: ${key} for locale: ${locale}`)
    }
    
    return value
  }

  return {
    t,
    locale,
    availableLocales: Object.keys(translations) as SupportedLocale[],
  }
} 