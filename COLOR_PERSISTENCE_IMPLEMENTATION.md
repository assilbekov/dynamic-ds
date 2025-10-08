# Color Persistence Implementation

## Overview

Color customizations are now persisted using cookies and synchronized between server and client.

## How It Works

### 🔄 Data Flow

```
User Changes Color
    ↓
Client updates DOM immediately (no flash)
    ↓
Save hues to cookie: { primaryHue: 285, secondaryHue: 285 }
    ↓
On reload/navigation:
    ↓
Server reads cookie → Generates full CSS → Injects in <head>
    ↓
Client hydrates → Syncs state from cookie
    ↓
Perfect sync, no flash!
```

## 📁 Files Modified

### 1. `/src/lib/color-css-generator.ts` (NEW)

- **Purpose**: Generate complete color CSS from just hue values
- **Functions**:
  - `generateColorCSS(hues)` - Creates full CSS with all color scales
  - `applyColorCSSToDOM(hues)` - Applies colors client-side
  - `DEFAULT_HUES` - Default values (285, 285)

### 2. `/src/app/layout.tsx` (UPDATED)

- **Changes**: Now async, reads cookies, injects color CSS
- **Flow**:
  1. Read `color-hues` cookie
  2. Generate CSS if cookie exists
  3. Inject `<style>` tag in `<head>`
  4. No flash of unstyled content!

### 3. `/src/components/color-shuffler.tsx` (UPDATED)

- **Changes**: Uses cookies + new CSS generator
- **Features**:
  - Saves hues to cookie on every change
  - Syncs state from cookie on mount
  - Reset clears cookies and styles
  - Uses js-cookie library

## 🍪 Cookie Details

**Cookie Name**: `color-hues`

**Cookie Value**:

```json
{
  "primaryHue": 285,
  "secondaryHue": 285
}
```

**Cookie Options**:

- Expires: 365 days
- SameSite: Lax
- Path: /

## 🎨 Color Generation

Only **hue values** are stored (~50 bytes). The server regenerates:

- Primary color scale (50-950)
- Secondary color scale (50-950)
- Supporting colors (muted, accent, border, input, ring)
- Chart colors (with hue variations)
- Sidebar colors
- Dark mode variants
- Background tints

**Total**: ~150+ CSS custom properties generated from 2 numbers!

## 🔒 No Hydration Issues

✅ **Server** injects CSS variables in `<head>`
✅ **Client** reads same cookie and syncs state
✅ **No JSX mismatch** - only CSS variables change
✅ **No flash** - colors applied before React hydrates

## 🚀 Performance

- Cookie size: ~50 bytes
- Server overhead: Minimal (cookie read + string generation)
- Client overhead: Cookie read on mount only
- Network: Cookie sent automatically with requests

## 🎯 User Experience

1. **First Visit**: Default violet theme
2. **Customize Colors**: Changes apply instantly
3. **Navigate**: Colors persist (client-side state)
4. **Reload**: No flash, colors already there
5. **Close/Reopen**: Colors restored from cookie

## 📦 Dependencies Added

- `js-cookie` - Client-side cookie manipulation
- `@types/js-cookie` - TypeScript types

## 🔧 How to Use

**Change colors programmatically:**

```tsx
import { applyColorCSSToDOM } from "@/lib/color-css-generator";
import Cookies from "js-cookie";

const hues = { primaryHue: 200, secondaryHue: 50 };
applyColorCSSToDOM(hues);
Cookies.set("color-hues", JSON.stringify(hues), { expires: 365 });
```

**Get current colors:**

```tsx
import Cookies from "js-cookie";

const colorHues = Cookies.get("color-hues");
const hues = colorHues ? JSON.parse(colorHues) : DEFAULT_HUES;
```

**Reset to default:**

```tsx
Cookies.remove("color-hues");
// Remove style tags
document.getElementById("custom-colors-server")?.remove();
document.getElementById("custom-colors-dynamic")?.remove();
```

## ✨ Features

- ✅ Persistent across sessions (365 days)
- ✅ No flash of unstyled content
- ✅ Server-side rendering compatible
- ✅ Minimal cookie size (hue only)
- ✅ Type-safe TypeScript
- ✅ Works with dark mode
- ✅ Automatic synchronization
- ✅ Reset to default functionality
