# Content Manager - Complete Guide

## Overview

The Content Manager is a powerful admin tool that allows you to edit **ALL** text content on your website for **English**, **Arabic**, **Russian**, and **Egyptian Arabic** languages directly from the admin panel.

## Features

✅ **Multi-Language Support**: Edit content for EN, AR, RU, EG
✅ **Hierarchical View**: Organized tree structure of all translations
✅ **Search Functionality**: Find any text by key or value
✅ **Side-by-Side Comparison**: See translations in other languages
✅ **Real-Time Editing**: Changes apply immediately
✅ **Automatic Backups**: Creates backup files before saving
✅ **Expand/Collapse**: Navigate large translation files easily
✅ **Visual Indicators**: Color-coded sections and arrays

## How to Access

1. **Login to Admin**: Go to `/login` and enter your credentials
2. **Navigate to Dashboard**: Go to `/admin`
3. **Click "Content Manager"**: In the navigation tabs
4. **Or Direct URL**: `/admin/content-manager`

## Interface Components

### 1. **Language Selector**
   - 4 buttons at the top: 🇬🇧 English | 🇸🇦 Arabic | 🇷🇺 Russian | 🇪🇬 Egyptian Arabic
   - Click any language to switch
   - Active language is highlighted in green

### 2. **Search Bar**
   - Search by translation key (e.g., "hero.title")
   - Search by value (e.g., "Premium Olives")
   - Results update as you type

### 3. **Action Buttons**
   - **Expand All**: Opens all sections
   - **Collapse All**: Closes all sections
   - **Refresh**: Reloads translations from files

### 4. **Translation Tree**
   - **Gray Sections**: Collapsible groups (e.g., "nav", "hero")
   - **Yellow Arrays**: Lists of items (e.g., features list)
   - **White Cards**: Individual editable text fields

## How to Edit Content

### Method 1: Single Field Edit

1. **Find the text** you want to edit (use search if needed)
2. **Click "Edit" button** on the right side of the field
3. **Modify the text** in the textarea that appears
4. **Click "✓ Save"** to save changes
5. **Or "✕ Cancel"** to discard changes

### Method 2: Bulk Edit (Coming Soon)

Currently, each field must be edited individually for safety.

## Translation Structure

### Common Sections

```
nav/                    → Navigation menu items
hero/                   → Homepage hero section
features/               → Feature highlights
about/                  → About page content
products/               → Products page content
sustainability/         → Sustainability page content
contact/                → Contact page content
footer/                 → Footer content
newsletter/             → Newsletter subscription
common/                 → Common UI elements (buttons, labels)
specifications/         → Product specifications
```

### Example Translation Path

```
hero.title
└── Section: hero
    └── Field: title
        └── Value: "BELLO - Dynamic Brand of IEFI"
```

## Best Practices

### ✅ DO:
- **Test changes** on staging before production
- **Keep translations consistent** across languages
- **Use search** to find existing terms
- **Check "Other Languages"** section to maintain consistency
- **Save frequently** when making multiple edits

### ❌ DON'T:
- **Don't use special characters** that might break JSON
- **Don't delete keys** - only edit values
- **Don't edit while others are editing** - changes might conflict
- **Don't use machine translation** - hire professional translators

## Common Editing Tasks

### 1. Change Homepage Title

1. Switch to desired language
2. Search for "hero.title" or expand "hero" section
3. Click Edit on "title" field
4. Update the text
5. Save

### 2. Update Product Description

1. Go to "products" section
2. Find the specific product entry
3. Edit description field
4. Repeat for all languages

### 3. Add New Feature

1. Find "features" section
2. Locate the array of features
3. Note: Arrays require direct file editing currently
4. Use Website Editor for complex structures

### 4. Change Button Text

1. Search for button name (e.g., "Get Quote")
2. Or navigate to relevant section
3. Edit and save
4. Repeat for all languages

## File Structure

### Location
```
public/
└── locales/
    ├── en/
    │   └── common.json      ← English translations
    ├── ar/
    │   └── common.json      ← Arabic translations
    ├── ru/
    │   └── common.json      ← Russian translations
    └── eg/
        └── common.json      ← Egyptian Arabic translations
```

### Backups
When you save changes, a backup file is created:
```
public/locales/en/common.backup.1699999999999.json
```

This allows you to restore previous versions if needed.

## Translation Keys Reference

### Navigation (nav)
- `home` - Home menu item
- `about` - About menu item
- `sustainability` - Sustainability menu item
- `products` - Products menu item
- `joinUs` - Join Us menu item
- `contact` - Contact menu item

### Hero Section (hero)
- `subtitle` - Tagline above main title
- `title` - Main heading
- `description` - Hero description text
- `getQuote` - Call-to-action button
- `exploreProducts` - Secondary button

### Features (features)
- `subtitle` - Section subtitle
- `title` - Section title
- `description` - Section description
- Individual feature objects with `title` and `description`

### Footer (footer)
- `aboutCompany` - Company description
- `getInTouch` - Contact section title
- `quickLink` - Quick links section title
- `followUs` - Social media section title
- `copyright` - Copyright text

## API Endpoints

### Get Translations
```
GET /api/content-manager/translations?language=en
Authorization: Bearer [token]
```

### Update Single Field
```
POST /api/content-manager/translations
Content-Type: application/json
Authorization: Bearer [token]

{
  "language": "en",
  "path": "hero.title",
  "value": "New Title Text"
}
```

### Bulk Update
```
PUT /api/content-manager/translations
Content-Type: application/json
Authorization: Bearer [token]

{
  "updates": {
    "en": { entire translation object },
    "ar": { entire translation object }
  }
}
```

## Troubleshooting

### Changes Not Appearing?

1. **Clear browser cache**: Ctrl+Shift+Delete
2. **Refresh the page**: Ctrl+F5 (hard refresh)
3. **Check if saved**: Look for success message
4. **Restart dev server**: Sometimes needed in development

### Can't Edit Certain Fields?

- Arrays and nested objects may require direct file editing
- Use VS Code or another text editor for complex changes
- Or request feature enhancement

### Lost Changes?

- Check backup files in `public/locales/[lang]/`
- Backups are created with timestamps
- Restore by copying backup to `common.json`

### Translation Not Loading?

1. Check file syntax is valid JSON
2. Look for console errors in browser
3. Verify file permissions
4. Check if translation key exists

## Security

- ✅ Requires admin authentication
- ✅ Creates automatic backups
- ✅ Validates JSON before saving
- ✅ Authorization checks on API
- ⚠️ Only trusted admins should have access

## Performance

- Translations are cached by Next.js
- Changes require page refresh to appear
- Backup files accumulate over time - clean periodically
- Large translation files may take longer to load

## Future Enhancements

- [ ] Bulk edit multiple fields
- [ ] Translation history/versioning
- [ ] Compare translations side-by-side
- [ ] Export/Import translations
- [ ] Translation suggestions
- [ ] Missing translation detection
- [ ] Character count for each field
- [ ] RTL preview for Arabic

## Support

For issues or questions:
1. Check this guide first
2. Review console errors
3. Check backup files
4. Contact system administrator

## Tips & Tricks

1. **Use Ctrl+F** in browser to find text quickly
2. **Expand sections** you frequently edit
3. **Keep a glossary** of common terms
4. **Test on mobile** after editing
5. **Update all languages** when changing key content
6. **Take screenshots** before major changes

## Keyboard Shortcuts

- `Ctrl+F` - Search in browser
- `Esc` - Cancel editing (when textarea focused)
- `Enter` - Submit form (single-line inputs)

---

**Created**: November 2025
**Version**: 1.0
**Last Updated**: November 12, 2025

