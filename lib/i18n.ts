import { useRouter } from 'next/router'
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

// 翻译函数
export function translate(key: string, locale: SupportedLocale = 'en'): string {
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

// useTranslation hook
export function useTranslation() {
  const router = useRouter()
  const [locale, setLocale] = useState<SupportedLocale>('en')

  useEffect(() => {
    if (router.locale && router.locale in translations) {
      setLocale(router.locale as SupportedLocale)
    }
  }, [router.locale])

  const t = (key: string) => translate(key, locale)

  const changeLanguage = (newLocale: SupportedLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return {
    t,
    locale,
    changeLanguage,
    availableLocales: Object.keys(translations) as SupportedLocale[],
  }
}

// 服务端翻译函数
export function getServerTranslations(locale: string) {
  const supportedLocale = locale in translations ? locale as SupportedLocale : 'en'
  return {
    t: (key: string) => translate(key, supportedLocale),
    locale: supportedLocale,
  }
} 