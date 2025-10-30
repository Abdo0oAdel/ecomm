/**
 * Example Component showing how to use react-i18next
 * 
 * This file demonstrates best practices for using translations
 * in your React components.
 */

import { useTranslation } from 'react-i18next';

const ExampleComponent = () => {
  const { t, i18n } = useTranslation();

  // Change language programmatically
  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  // Get current language
  const currentLanguage = i18n.language;

  // Check if current language is RTL
  const isRTL = currentLanguage === 'ar';

  return (
    <div>
      {/* Basic translation */}
      <h1>{t('nav.home')}</h1>

      {/* Translation with nested keys */}
      <p>{t('auth.email')}</p>

      {/* Dynamic content */}
      <p>Current language: {currentLanguage}</p>
      <p>Is RTL: {isRTL ? 'Yes' : 'No'}</p>

      {/* Language switcher buttons */}
      <div>
        <button onClick={() => handleLanguageChange('en')}>
          {t('languages.english')}
        </button>
        <button onClick={() => handleLanguageChange('ar')}>
          {t('languages.arabic')}
        </button>
        <button onClick={() => handleLanguageChange('fr')}>
          {t('languages.french')}
        </button>
      </div>

      {/* Conditional rendering based on language */}
      {isRTL && <p>This text will only show for RTL languages</p>}
    </div>
  );
};

export default ExampleComponent;

