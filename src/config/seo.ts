export type LangCode =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'pt'
  | 'ru'
  | 'hi'
  | 'ar'
  | 'zh'
  | 'ja';

export const CANONICAL_ORIGIN = 'https://survivalcue.bastelar.com';

export interface LanguageMeta {
  code: LangCode;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  hreflang: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  {code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', hreflang: 'en'},
  {code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr', hreflang: 'es'},
  {code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr', hreflang: 'fr'},
  {code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr', hreflang: 'de'},
  {code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr', hreflang: 'pt'},
  {code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr', hreflang: 'ru'},
  {code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr', hreflang: 'hi'},
  {code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', hreflang: 'ar'},
  {code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr', hreflang: 'zh'},
  {code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr', hreflang: 'ja'},
];

export function getCanonicalUrl(lang: LangCode): string {
  if (lang === 'en') {
    return `${CANONICAL_ORIGIN}/`;
  }
  return `${CANONICAL_ORIGIN}/?lang=${lang}`;
}

export function detectInitialLanguage(): LangCode {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang')?.toLowerCase() as LangCode | undefined;
    if (urlLang && SUPPORTED_LANGUAGES.some((l) => l.code === urlLang)) {
      return urlLang;
    }

    try {
      const savedLang = window.localStorage.getItem('survivalcue_lang') as LangCode | null;
      if (savedLang && SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)) {
        return savedLang;
      }
    } catch {
      // Ignore storage access failures
    }

    const navLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const raw of navLangs) {
      if (!raw) continue;
      const prefix = raw.toLowerCase().split('-')[0] as LangCode;
      if (SUPPORTED_LANGUAGES.some((l) => l.code === prefix)) {
        return prefix;
      }
    }
  }
  return 'en';
}
