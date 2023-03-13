type Locale = "de" | "en" | "es" | "fr" | "it" | "nl" | "pt";

const termsAndConditions: Partial<Record<string, Record<Locale, string>>> = {
  DEU: {
    de: "deu/de.pdf",
    en: "deu/en.pdf",
    es: "deu/en.pdf",
    fr: "deu/en.pdf",
    it: "deu/en.pdf",
    nl: "deu/en.pdf",
    pt: "deu/en.pdf",
  },
  FRA: {
    de: "en.pdf",
    en: "en.pdf",
    es: "en.pdf",
    fr: "fr.pdf",
    it: "en.pdf",
    nl: "en.pdf",
    pt: "en.pdf",
  },
};

const defaultTerms = termsAndConditions.FRA as Record<Locale, string>;

export const getTermsAndConditionsPathByAccountCountryAndLocale = ({
  rootUrl,
  accountCountry,
  locale,
}: {
  rootUrl: string;
  accountCountry?: string;
  locale: Locale;
}) => {
  if (accountCountry == null) {
    return new URL(defaultTerms[locale], rootUrl).toString();
  }
  const termsByLocale = termsAndConditions[accountCountry] ?? defaultTerms;
  return new URL(termsByLocale[locale], rootUrl).toString();
};
