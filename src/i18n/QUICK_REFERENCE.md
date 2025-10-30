# i18n Quick Reference Card

## 🎯 Quick Start

### Import Hook
```javascript
import { useTranslation } from 'react-i18next';
```

### Use in Component
```javascript
const { t, i18n } = useTranslation();
```

## 🔑 Common Translation Keys

### Navigation
```javascript
{t('nav.home')}        // Home
{t('nav.contact')}     // Contact
{t('nav.about')}       // About
{t('nav.cart')}        // Cart
{t('nav.wishlist')}    // Wishlist
{t('nav.myAccount')}   // My Account
```

### Auth
```javascript
{t('auth.login')}         // Login
{t('auth.signup')}        // Sign Up
{t('auth.email')}         // Email
{t('auth.password')}      // Password
{t('auth.forgotPassword')} // Forgot Password?
```

### Cart/Wishlist
```javascript
{t('cart.title')}         // Shopping Cart
{t('cart.checkout')}      // Checkout
{t('cart.subtotal')}      // Subtotal
{t('cart.total')}         // Total
{t('wishlist.title')}     // My Wishlist
{t('wishlist.addToCart')} // Add to Cart
```

### Common Actions
```javascript
{t('common.save')}     // Save
{t('common.cancel')}   // Cancel
{t('common.delete')}   // Delete
{t('common.edit')}     // Edit
{t('common.loading')}  // Loading...
```

## 🌍 Change Language

```javascript
// Switch to English
i18n.changeLanguage('en');

// Switch to Arabic (RTL)
i18n.changeLanguage('ar');

// Switch to French
i18n.changeLanguage('fr');
```

## 📖 Get Current Language

```javascript
const currentLang = i18n.language; // 'en' | 'ar' | 'fr'
const isRTL = i18n.language === 'ar'; // boolean
```

## ➕ Add New Translation

1. **en.json**
```json
{
  "mySection": {
    "myKey": "Hello World"
  }
}
```

2. **ar.json**
```json
{
  "mySection": {
    "myKey": "مرحبا بالعالم"
  }
}
```

3. **fr.json**
```json
{
  "mySection": {
    "myKey": "Bonjour le monde"
  }
}
```

4. **Use it**
```javascript
{t('mySection.myKey')}
```

## 🎨 RTL Aware Styling

```javascript
// Get direction
const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

// Use in style
<div style={{ direction: dir }}>
  {t('some.text')}
</div>
```

## 📝 Input Placeholders

```javascript
<input 
  type="text" 
  placeholder={t('auth.email')}
/>
```

## 🔢 Dynamic Values (if needed)

```javascript
// In JSON
{
  "welcome": "Welcome {{name}}"
}

// In component
{t('welcome', { name: user.name })}
```

## 🏷️ Available Languages

| Code | Language | Direction |
|------|----------|-----------|
| `en` | English  | LTR       |
| `ar` | Arabic   | RTL       |
| `fr` | French   | LTR       |

---

**Files**: 
- Config: `src/i18n/config.js`
- Translations: `src/i18n/locales/*.json`
- RTL Styles: `src/assets/styles/rtl.css`

