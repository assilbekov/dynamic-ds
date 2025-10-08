/**
 * Generates complete color CSS from hue values
 * Based on the premium violet color palette from globals.css
 */

type ColorHues = {
  primaryHue: number;
  secondaryHue: number;
};

/**
 * Generates all CSS custom properties for colors based on hue values
 */
export function generateColorCSS(hues: ColorHues): string {
  const { primaryHue, secondaryHue } = hues;

  return `
    :root {
      /* Primary color - Deep Violet */
      --primary: oklch(0.42 0.2 ${primaryHue});
      --primary-foreground: oklch(0.99 0.005 ${primaryHue});
      
      /* Primary color scale */
      --primary-50: oklch(0.985 0.01 ${primaryHue});
      --primary-100: oklch(0.97 0.022 ${primaryHue});
      --primary-200: oklch(0.94 0.045 ${primaryHue});
      --primary-300: oklch(0.88 0.09 ${primaryHue});
      --primary-400: oklch(0.72 0.15 ${primaryHue});
      --primary-500: oklch(0.58 0.19 ${primaryHue});
      --primary-600: oklch(0.42 0.2 ${primaryHue});
      --primary-700: oklch(0.35 0.17 ${primaryHue});
      --primary-800: oklch(0.28 0.13 ${primaryHue});
      --primary-900: oklch(0.21 0.09 ${primaryHue});
      --primary-950: oklch(0.15 0.055 ${primaryHue});
      
      /* Secondary color - Subtle Violet Accent */
      --secondary: oklch(0.97 0.01 ${secondaryHue});
      --secondary-foreground: oklch(0.35 0.15 ${secondaryHue});
      
      /* Secondary color scale */
      --secondary-50: oklch(0.985 0.008 ${secondaryHue});
      --secondary-100: oklch(0.97 0.015 ${secondaryHue});
      --secondary-200: oklch(0.94 0.03 ${secondaryHue});
      --secondary-300: oklch(0.88 0.06 ${secondaryHue});
      --secondary-400: oklch(0.75 0.1 ${secondaryHue});
      --secondary-500: oklch(0.65 0.13 ${secondaryHue});
      --secondary-600: oklch(0.52 0.15 ${secondaryHue});
      --secondary-700: oklch(0.42 0.14 ${secondaryHue});
      --secondary-800: oklch(0.32 0.11 ${secondaryHue});
      --secondary-900: oklch(0.24 0.08 ${secondaryHue});
      --secondary-950: oklch(0.18 0.055 ${secondaryHue});
      
      /* Supporting colors with hue tint */
      --muted: oklch(0.97 0.01 ${primaryHue});
      --muted-foreground: oklch(0.48 0.04 ${primaryHue});
      --accent: oklch(0.97 0.015 ${secondaryHue});
      --accent-foreground: oklch(0.35 0.15 ${primaryHue});
      --border: oklch(0.91 0.012 ${primaryHue});
      --input: oklch(0.91 0.012 ${primaryHue});
      --ring: oklch(0.58 0.19 ${primaryHue});
      
      /* Chart colors with hue variations */
      --chart-1: oklch(0.58 0.19 ${primaryHue});
      --chart-2: oklch(0.52 0.16 ${(primaryHue + 25) % 360});
      --chart-3: oklch(0.62 0.17 ${(primaryHue - 25) % 360});
      --chart-4: oklch(0.68 0.19 ${(primaryHue - 55) % 360});
      --chart-5: oklch(0.48 0.18 ${(primaryHue + 35) % 360});
      
      /* Sidebar colors */
      --sidebar: oklch(0.99 0.005 ${primaryHue});
      --sidebar-foreground: oklch(0.22 0.08 ${primaryHue});
      --sidebar-primary: oklch(0.42 0.2 ${primaryHue});
      --sidebar-primary-foreground: oklch(0.99 0.005 ${primaryHue});
      --sidebar-accent: oklch(0.97 0.01 ${primaryHue});
      --sidebar-accent-foreground: oklch(0.22 0.08 ${primaryHue});
      --sidebar-border: oklch(0.91 0.012 ${primaryHue});
      --sidebar-ring: oklch(0.58 0.19 ${primaryHue});
    }
    
    .dark {
      /* Primary color - Bright Violet */
      --primary: oklch(0.78 0.2 ${primaryHue});
      --primary-foreground: oklch(0.12 0.04 ${primaryHue});
      
      /* Primary color scale - Dark mode */
      --primary-50: oklch(0.15 0.055 ${primaryHue});
      --primary-100: oklch(0.21 0.09 ${primaryHue});
      --primary-200: oklch(0.28 0.13 ${primaryHue});
      --primary-300: oklch(0.35 0.17 ${primaryHue});
      --primary-400: oklch(0.48 0.2 ${primaryHue});
      --primary-500: oklch(0.58 0.21 ${primaryHue});
      --primary-600: oklch(0.68 0.21 ${primaryHue});
      --primary-700: oklch(0.78 0.2 ${primaryHue});
      --primary-800: oklch(0.86 0.14 ${primaryHue});
      --primary-900: oklch(0.92 0.08 ${primaryHue});
      --primary-950: oklch(0.96 0.04 ${primaryHue});
      
      /* Secondary color - Dark subtle Violet */
      --secondary: oklch(0.26 0.025 ${secondaryHue});
      --secondary-foreground: oklch(0.92 0.02 ${secondaryHue});
      
      /* Secondary color scale - Dark mode */
      --secondary-50: oklch(0.18 0.055 ${secondaryHue});
      --secondary-100: oklch(0.24 0.08 ${secondaryHue});
      --secondary-200: oklch(0.32 0.11 ${secondaryHue});
      --secondary-300: oklch(0.42 0.14 ${secondaryHue});
      --secondary-400: oklch(0.52 0.16 ${secondaryHue});
      --secondary-500: oklch(0.62 0.17 ${secondaryHue});
      --secondary-600: oklch(0.72 0.16 ${secondaryHue});
      --secondary-700: oklch(0.8 0.13 ${secondaryHue});
      --secondary-800: oklch(0.88 0.09 ${secondaryHue});
      --secondary-900: oklch(0.93 0.05 ${secondaryHue});
      --secondary-950: oklch(0.97 0.025 ${secondaryHue});
      
      /* Supporting colors - Dark mode */
      --muted: oklch(0.26 0.02 ${primaryHue});
      --muted-foreground: oklch(0.66 0.05 ${primaryHue});
      --accent: oklch(0.68 0.18 ${secondaryHue});
      --accent-foreground: oklch(0.12 0.04 ${primaryHue});
      --border: oklch(0.32 0.018 ${primaryHue});
      --input: oklch(0.25 0.02 ${primaryHue});
      --ring: oklch(0.78 0.2 ${primaryHue});
      
      /* Chart colors - Dark mode */
      --chart-1: oklch(0.78 0.2 ${primaryHue});
      --chart-2: oklch(0.7 0.18 ${(primaryHue + 25) % 360});
      --chart-3: oklch(0.72 0.19 ${(primaryHue - 25) % 360});
      --chart-4: oklch(0.75 0.2 ${(primaryHue - 55) % 360});
      --chart-5: oklch(0.68 0.2 ${(primaryHue + 35) % 360});
      
      /* Sidebar colors - Dark mode */
      --sidebar: oklch(0.19 0.015 ${primaryHue});
      --sidebar-foreground: oklch(0.95 0.015 ${primaryHue});
      --sidebar-primary: oklch(0.78 0.2 ${primaryHue});
      --sidebar-primary-foreground: oklch(0.12 0.04 ${primaryHue});
      --sidebar-accent: oklch(0.24 0.02 ${primaryHue});
      --sidebar-accent-foreground: oklch(0.95 0.015 ${primaryHue});
      --sidebar-border: oklch(0.29 0.018 ${primaryHue});
      --sidebar-ring: oklch(0.78 0.2 ${primaryHue});
      
      /* Dark mode background colors with subtle tint */
      --background: oklch(0.17 0.015 ${primaryHue});
      --foreground: oklch(0.98 0.008 ${primaryHue});
      --card: oklch(0.21 0.02 ${primaryHue});
      --card-foreground: oklch(0.98 0.008 ${primaryHue});
      --popover: oklch(0.22 0.022 ${primaryHue});
      --popover-foreground: oklch(0.98 0.008 ${primaryHue});
    }
  `;
}

/**
 * Applies color CSS to the DOM
 */
export function applyColorCSSToDOM(hues: ColorHues): void {
  const css = generateColorCSS(hues);

  // Remove existing custom color style if it exists
  const existingStyle = document.getElementById("custom-colors-dynamic");
  if (existingStyle) {
    existingStyle.remove();
  }

  // Create and inject new style
  const style = document.createElement("style");
  style.id = "custom-colors-dynamic";
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Default hue values matching globals.css
 */
export const DEFAULT_HUES: ColorHues = {
  primaryHue: 285,
  secondaryHue: 285,
};
