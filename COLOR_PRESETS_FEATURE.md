# Color Presets Feature

## Overview

Users can now save their favorite color combinations as presets and quickly switch between them. Presets are stored in localStorage via Zustand and persist across sessions.

## Features

### ✅ Save Color Presets

- Click "Save Current Colors" button
- Enter a name for your preset
- Press Enter or click Save
- Preset is saved to localStorage

### ✅ Apply Presets

- Click on any saved preset from the list
- Colors are instantly applied
- Both DOM and cookies are updated
- Slider positions update automatically

### ✅ Delete Presets

- Click the trash icon next to any preset
- Preset is removed from localStorage
- No confirmation (clean UX)

### ✅ Visual Preview

- Each preset shows two color squares
- Primary and secondary hue preview
- Easy visual identification

## UI/UX

### Dropdown Menu Structure:

```
┌─────────────────────────────┐
│ 🎲 Shuffle Random Colors    │
│ 🔄 Reset to Default         │
├─────────────────────────────┤
│ Saved Presets               │ ← Only shows if presets exist
│   🎨🎨 Sunset Vibes      🗑️ │
│   🎨🎨 Ocean Blue        🗑️ │
│   🎨🎨 Forest Green      🗑️ │
├─────────────────────────────┤
│ 💾 Save Current Colors      │
│                             │
│   [When clicked:]           │
│   ┌─────────────────────┐   │
│   │ Preset name...      │   │
│   ├──────────┬──────────┤   │
│   │   Save   │  Cancel  │   │
│   └──────────┴──────────┘   │
├─────────────────────────────┤
│ Custom Colors               │
│ [Color sliders...]          │
└─────────────────────────────┘
```

## Data Structure

### ColorPreset Type:

```typescript
type ColorPreset = {
  id: string; // "preset-{timestamp}-{random}"
  name: string; // User-provided name
  primaryHue: number; // 0-360
  secondaryHue: number; // 0-360
  createdAt: number; // Unix timestamp
};
```

### Storage:

- **Location**: localStorage (via Zustand persist)
- **Key**: `persistent-global-store`
- **Max Presets**: Unlimited (practical limit ~50-100)

## Store Actions

### Save Preset:

```tsx
const { saveColorPreset } = usePersistentGlobalStoreHook();
saveColorPreset("My Cool Theme", 285, 190);
```

### Delete Preset:

```tsx
const { deleteColorPreset } = usePersistentGlobalStoreHook();
deleteColorPreset("preset-123456-abc");
```

### Get All Presets:

```tsx
const { colorPresets } = usePersistentGlobalStoreHook();
// Returns: ColorPreset[]
```

### Update Preset Name:

```tsx
const { updateColorPresetName } = usePersistentGlobalStoreHook();
updateColorPresetName("preset-123456-abc", "New Name");
```

### Clear All Presets:

```tsx
const { clearAllColorPresets } = usePersistentGlobalStoreHook();
clearAllColorPresets();
```

## User Flow

### Saving a Preset:

```
1. User customizes colors with sliders or shuffle
2. User clicks "Save Current Colors"
3. Input field appears
4. User types preset name (e.g., "Midnight Purple")
5. User presses Enter or clicks Save
6. Preset added to list
7. Input field closes
8. Success! ✨
```

### Applying a Preset:

```
1. User opens color dropdown
2. User sees "Saved Presets" section
3. User clicks on "Midnight Purple"
4. Colors instantly update
5. Cookie is set with new hues
6. Sliders move to preset positions
7. Dropdown stays open (for quick switching)
```

### Deleting a Preset:

```
1. User hovers over preset
2. User clicks trash icon
3. Preset immediately removed
4. List updates
```

## Technical Details

### Persistence:

- Presets stored in Zustand persistent store
- Automatically saved to localStorage
- Survives page reloads and browser restarts
- Separate from cookie-based color persistence

### Why Two Storage Methods?

1. **Cookies** (current active color):
   - Server-side access
   - Fast page loads
   - No FOUC
2. **localStorage** (saved presets):
   - Client-side only
   - Larger storage capacity
   - Better for list of presets

### ID Generation:

```javascript
`preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
// Example: "preset-1699123456789-x7k2p9m1q"
```

## Keyboard Shortcuts

When save input is focused:

- **Enter** → Save preset
- **Escape** → Cancel and close

## Responsive Design

- Preset list scrolls if > 6 presets (max-height: 12rem)
- Works on mobile (touch-friendly)
- Trash button positioned for easy access

## Future Enhancements (Not Implemented)

- ⭐ Favorite/pin presets
- 📤 Export/import presets
- 🔗 Share preset via URL
- 📋 Duplicate preset
- ✏️ Edit preset name inline
- 📁 Organize in folders/tags
- 🎨 More color preview options

## Example Usage

```tsx
import { usePersistentGlobalStoreHook } from "@/hooks/use-persistent-global-store";

function MyComponent() {
  const { colorPresets, saveColorPreset, deleteColorPreset } =
    usePersistentGlobalStoreHook();

  return (
    <div>
      <h2>My Color Presets ({colorPresets.length})</h2>

      {colorPresets.map((preset) => (
        <div key={preset.id}>
          <span>{preset.name}</span>
          <span>Primary: {preset.primaryHue}°</span>
          <span>Secondary: {preset.secondaryHue}°</span>
          <button onClick={() => deleteColorPreset(preset.id)}>Delete</button>
        </div>
      ))}

      <button onClick={() => saveColorPreset("New Preset", 180, 90)}>
        Save New Preset
      </button>
    </div>
  );
}
```

## Benefits

✅ **Fast Color Switching**: One click to change entire theme
✅ **Personal Library**: Build your own color palette collection
✅ **Experimentation**: Try different colors without losing favorites
✅ **Productivity**: No need to remember hue values
✅ **Persistence**: Never lose your favorite combinations
✅ **Shareable**: Can be extended to share presets

## Integration with Existing System

- Works seamlessly with cookie-based persistence
- Applying preset updates both DOM and cookies
- Shuffle and manual adjustments can be saved as presets
- Reset to default works independently
- No conflicts between systems

🎨 **Enjoy building your color palette library!**
