(function () {
  const STORAGE_KEY = 'astrovia-language';
  const DEFAULT_LANGUAGE = 'tr';
  const SUPPORTED_LANGS = ['tr', 'en'];
  const translations = window.SITE_TRANSLATIONS || {};
  const listeners = [];

  function normalizeLang(lang) {
    if (!lang || !SUPPORTED_LANGS.includes(lang)) {
      return DEFAULT_LANGUAGE;
    }
    return lang;
  }

  function getPageKey() {
    return document.documentElement.dataset.page || 'index';
  }

  function getMergedTranslations(lang) {
    const common = (translations.common && translations.common[lang]) || {};
    const pageKey = getPageKey();
    const pageTranslations = (translations[pageKey] && translations[pageKey][lang]) || {};
    return { ...common, ...pageTranslations };
  }

  let currentLanguage = normalizeLang(localStorage.getItem(STORAGE_KEY));
  let cachedTranslations = getMergedTranslations(currentLanguage);

  function replacePlaceholders(template, replacements) {
    if (!template || !replacements) {
      return template;
    }
    return Object.keys(replacements).reduce((result, key) => {
      return result.replace(new RegExp(`\\{${key}\\}`, 'g'), replacements[key]);
    }, template);
  }

  function translate(key, replacements, fallback) {
    const value = cachedTranslations[key];
    const text = value !== undefined ? value : fallback !== undefined ? fallback : key;
    return replacePlaceholders(text, replacements);
  }

  function updateLangButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', btnLang === lang);
    });
  }

  function applyTranslations() {
    cachedTranslations = getMergedTranslations(currentLanguage);
    document.documentElement.lang = currentLanguage;

    const body = document.body;
    const titleKey = body ? body.getAttribute('data-title-key') : null;
    if (titleKey && cachedTranslations[titleKey]) {
      document.title = cachedTranslations[titleKey];
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const useHtml = el.hasAttribute('data-i18n-html');
      const value = translate(key, undefined, null);
      if (value === null) return;
      if (useHtml) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      const value = translate(key, undefined, null);
      if (value !== null) {
        el.setAttribute('placeholder', value);
      }
    });

    updateLangButtons(currentLanguage);
  }

  function setLanguage(lang) {
    const normalized = normalizeLang(lang);
    if (normalized === currentLanguage) {
      return;
    }
    currentLanguage = normalized;
    localStorage.setItem(STORAGE_KEY, currentLanguage);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        applyTranslations();
        listeners.forEach(fn => fn(currentLanguage));
      }, { once: true });
    } else {
      applyTranslations();
      listeners.forEach(fn => fn(currentLanguage));
    }
  }

  function handleLanguageButtonClick(event) {
    const target = event.currentTarget;
    if (!target) return;
    const lang = target.getAttribute('data-lang');
    if (!lang) return;
    setLanguage(lang);
  }

  function setupLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.removeEventListener('click', handleLanguageButtonClick);
      btn.addEventListener('click', handleLanguageButtonClick);
    });
    updateLangButtons(currentLanguage);
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupLanguageButtons();
    applyTranslations();
  });

  window.LanguageManager = {
    getCurrentLanguage: () => currentLanguage,
    setLanguage,
    translate,
    onChange: fn => {
      if (typeof fn === 'function') {
        listeners.push(fn);
      }
    }
  };
})();
