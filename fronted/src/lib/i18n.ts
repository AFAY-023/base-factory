import { createContext, useContext } from 'react';
export type Lang = 'en' | 'zh';
export const LangContext = createContext<Lang>('en');
export const useTranslation = () => {
  const lang = useContext(LangContext);
  return {
    lang,
    t: (en: string, zh: string) => lang === 'zh' ? zh : en
  };
};
