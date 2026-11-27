import type {LangCode} from './seo';

export const AMAZON_AFFILIATE_TAG = 'bastelar-21';
export const AMAZON_ES_ORIGIN = 'https://www.amazon.es';

/**
 * Forces every Amazon product or search recommendation URL onto https://www.amazon.es
 * and ensures the Amazon Spain Associates tracking parameter tag=bastelar-21 is present.
 */
export function buildAmazonEsAffiliateUrl(rawUrlOrQuery: string): string {
  const trimmed = rawUrlOrQuery.trim();
  if (!trimmed) {
    return `${AMAZON_ES_ORIGIN}/?tag=${AMAZON_AFFILIATE_TAG}`;
  }

  try {
    const parsed = /^https?:\/\//i.test(trimmed)
      ? new URL(trimmed)
      : new URL(`${AMAZON_ES_ORIGIN}/s?k=${encodeURIComponent(trimmed)}`);

    // Enforce Amazon Spain domain strictly regardless of input Amazon TLD (.com, .de, .fr, etc.)
    if (/(^|\.)amazon\./i.test(parsed.hostname)) {
      parsed.protocol = 'https:';
      parsed.hostname = 'www.amazon.es';
      parsed.port = '';
    } else if (!parsed.hostname) {
      return `${AMAZON_ES_ORIGIN}/?tag=${AMAZON_AFFILIATE_TAG}`;
    }

    parsed.searchParams.set('tag', AMAZON_AFFILIATE_TAG);
    return parsed.toString();
  } catch {
    const encoded = encodeURIComponent(trimmed);
    return `${AMAZON_ES_ORIGIN}/s?k=${encoded}&tag=${AMAZON_AFFILIATE_TAG}`;
  }
}

export const AMAZON_AFFILIATE_DISCLOSURE: Record<LangCode, string> = {
  en: 'Affiliate Disclosure: As an Amazon Associate (Amazon España), we earn from qualifying purchases via amazon.es links.',
  es: 'Aviso de afiliación: En calidad de Afiliado de Amazon España, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.',
  fr: 'Mention d’affiliation : En tant que Partenaire Amazon Espagne (amazon.es), je réalise un bénéfice sur les achats remplissant les conditions requises.',
  de: 'Affiliate-Hinweis: Als Amazon-Partner (Amazon Spanien / amazon.es) verdienen wir an qualifizierten Verkäufen.',
  pt: 'Aviso de afiliação: Como Associado da Amazon Espanha (amazon.es), recebemos comissões por compras elegíveis.',
  ru: 'Партнёрское уведомление: Как участник партнёрской программы Amazon España (amazon.es), мы получаем доход от соответствующих покупок.',
  hi: 'संबद्ध प्रकटीकरण: Amazon España (amazon.es) सहयोगी के रूप में, हम योग्य खरीदारी से आय अर्जित करते हैं।',
  ar: 'إفصاح الشراكة: بصفتنا شريكاً لبرنامج أمازون إسبانيا (amazon.es)، نحصل على عمولة من المشتريات المؤهلة.',
  zh: '联盟披露：作为亚马逊西班牙（amazon.es）联盟成员，我们从符合条件的购买中赚取佣金。',
  ja: 'アフィリエイト表記：Amazonスペイン（amazon.es）アソシエイトとして、適格販売により収入を得ています。',
};

export function getAmazonAffiliateDisclosure(lang: LangCode): string {
  return AMAZON_AFFILIATE_DISCLOSURE[lang] ?? AMAZON_AFFILIATE_DISCLOSURE.en;
}
