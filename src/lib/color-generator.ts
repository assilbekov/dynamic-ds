/**
 * Color Generator Utility
 * Generates random color palettes in OKLCH format while maintaining consistent intensity
 */

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type ColorPalette = {
  primary: ColorScale;
  secondary: ColorScale;
};

/**
 * Generates a random hue between 0-360 degrees
 */
const getRandomHue = (): number => Math.floor(Math.random() * 360);

/**
 * Creates an OKLCH color string with consistent lightness and chroma
 * @param lightness - L value (0-1)
 * @param chroma - C value (0-0.4+)
 * @param hue - H value (0-360)
 */
const oklch = (lightness: number, chroma: number, hue: number): string => {
  return `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(
    1
  )})`;
};

/**
 * Generates a color scale based on a base hue with consistent chroma progression
 * Uses varying lightness and chroma for perceptually uniform colors
 */
const generateColorScale = (
  baseHue: number,
  baseChroma: number = 0.1
): ColorScale => {
  return {
    50: oklch(0.98, baseChroma * 0.1, baseHue), // Very light, low chroma
    100: oklch(0.95, baseChroma * 0.2, baseHue), // Light
    200: oklch(0.9, baseChroma * 0.4, baseHue), // Light-medium
    300: oklch(0.8, baseChroma * 0.6, baseHue), // Medium-light
    400: oklch(0.7, baseChroma * 0.8, baseHue), // Medium
    500: oklch(0.6, baseChroma, baseHue), // Base (full chroma)
    600: oklch(0.5, baseChroma * 0.9, baseHue), // Medium-dark
    700: oklch(0.4, baseChroma * 0.7, baseHue), // Dark
    800: oklch(0.3, baseChroma * 0.5, baseHue), // Very dark
    900: oklch(0.2, baseChroma * 0.4, baseHue), // Darkest
    950: oklch(0.15, baseChroma * 0.3, baseHue), // Deepest
  };
};

/**
 * Generates a complete random color palette with primary and complementary secondary colors
 * Primary uses higher chroma for vibrant colors
 * Secondary uses lower chroma for more subtle complementary colors
 */
export const generateRandomColorPalette = (): ColorPalette => {
  // Generate random hue for primary color
  const primaryHue = getRandomHue();

  // Calculate complementary hue (180 degrees opposite)
  const secondaryHue = (primaryHue + 180) % 360;

  // Use slightly different chroma values for variety
  const primaryChroma = 0.08 + Math.random() * 0.04; // 0.08-0.12
  const secondaryChroma = 0.08 + Math.random() * 0.04; // 0.08-0.12

  return {
    primary: generateColorScale(primaryHue, primaryChroma),
    secondary: generateColorScale(secondaryHue, secondaryChroma),
  };
};

/**
 * Generates a color palette with analogous colors (close on color wheel)
 * Creates a more harmonious, less contrasting palette
 */
export const generateAnalogousColorPalette = (): ColorPalette => {
  const primaryHue = getRandomHue();
  // Analogous: 30-60 degrees apart
  const offset = 30 + Math.random() * 30;
  const secondaryHue = (primaryHue + offset) % 360;

  const primaryChroma = 0.08 + Math.random() * 0.04;
  const secondaryChroma = 0.08 + Math.random() * 0.04;

  return {
    primary: generateColorScale(primaryHue, primaryChroma),
    secondary: generateColorScale(secondaryHue, secondaryChroma),
  };
};

/**
 * Generates a color palette with triadic colors (120 degrees apart)
 * Creates vibrant, balanced color schemes
 */
export const generateTriadicColorPalette = (): ColorPalette => {
  const primaryHue = getRandomHue();
  const secondaryHue = (primaryHue + 120) % 360;

  const primaryChroma = 0.08 + Math.random() * 0.04;
  const secondaryChroma = 0.08 + Math.random() * 0.04;

  return {
    primary: generateColorScale(primaryHue, primaryChroma),
    secondary: generateColorScale(secondaryHue, secondaryChroma),
  };
};

/**
 * Applies a color scale to CSS custom properties
 */
export const applyColorScale = (prefix: string, scale: ColorScale): void => {
  const root = document.documentElement;
  Object.entries(scale).forEach(([key, value]) => {
    root.style.setProperty(`--${prefix}-${key}`, value);
  });

  // Also set base colors for components that use them
  if (prefix === "primary") {
    root.style.setProperty(`--primary`, scale[500]);
    root.style.setProperty(`--primary-foreground`, scale[50]);
  }
  if (prefix === "secondary") {
    root.style.setProperty(`--secondary`, scale[100]);
    root.style.setProperty(`--secondary-foreground`, scale[800]);
  }
};

/**
 * Applies a complete color palette to the document
 */
export const applyColorPalette = (palette: ColorPalette): void => {
  applyColorScale("primary", palette.primary);
  applyColorScale("secondary", palette.secondary);
};
