# Internationalization (i18n) Setup

This project uses **react-i18next** for internationalization support.

## Supported Languages

- **English (en)** - Default
- **Arabic (ar)** - RTL support
- **French (fr)**

## How to Use

### In Components

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <button onClick={() => i18n.changeLanguage('ar')}>
        Switch to Arabic
      </button>
    </div>
  );
}
```

### Language Switching

The language switcher is implemented in the NavBar component:

```javascript
const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

// Usage
<button onClick={() => changeLanguage('en')}>English</button>
<button onClick={() => changeLanguage('ar')}>العربية</button>
<button onClick={() => changeLanguage('fr')}>Français</button>
```

## Translation Files

All translations are stored in JSON files under `src/i18n/locales/`:

- `en.json` - English translations
- `ar.json` - Arabic translations
- `fr.json` - French translations

## Adding New Translations

1. Add the key-value pair to all translation files
2. Use the translation key in your component with `t('key.path')`

Example:
```json
{
  "common": {
    "welcome": "Welcome"
  }
}
```

Then in component:
```javascript
{t('common.welcome')}
```

## RTL Support

Arabic language automatically triggers RTL (Right-to-Left) layout. The `dir` attribute on the HTML element is automatically set when the language changes.

## Features

- ✅ Automatic language detection from localStorage
- ✅ Fallback to browser language
- ✅ Persistent language selection
- ✅ RTL support for Arabic
- ✅ Dynamic HTML dir and lang attributes

