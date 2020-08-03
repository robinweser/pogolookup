import React, { useState, useContext, createContext } from 'react'

const TranslationContext = createContext()

import dePokemon from '../translations/pokemon/de.json'

import deUI from '../translations/ui/de.json'
import enUI from '../translations/ui/en.json'

const pokemon = {
  de: dePokemon,
}

const ui = {
  de: deUI,
  en: enUI,
}

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const translations = {
    pokemon: pokemon[language],
    ui: ui[language],
  }

  const context = {
    language,
    setLanguage,
    translations,
  }

  return (
    <TranslationContext.Provider value={context}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  return useContext(TranslationContext)
}
