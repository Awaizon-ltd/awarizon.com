'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Lang = 'ts' | 'js'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangCtx>({ lang: 'ts', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ts')

  useEffect(() => {
    const saved = localStorage.getItem('awz-docs-lang') as Lang | null
    if (saved === 'js' || saved === 'ts') setLangState(saved)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('awz-docs-lang', l)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
