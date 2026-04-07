import { createContext, useContext, useEffect, useState } from 'react'
import en from '../translations/en'
import fr from '../translations/fr'

const translations = { en, fr }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('cs_lang') || 'en')

  useEffect(() => { localStorage.setItem('cs_lang', lang) }, [lang])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
