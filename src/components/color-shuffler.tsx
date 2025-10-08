"use client";

import * as React from "react";
import { Palette, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  generateRandomColorPalette,
  applyColorPalette,
} from "@/lib/color-generator";

export function ColorShuffler() {
  const [mounted, setMounted] = React.useState(false);
  const [primaryHue, setPrimaryHue] = React.useState(265);
  const [secondaryHue, setSecondaryHue] = React.useState(85);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const shuffleColors = () => {
    const palette = generateRandomColorPalette();
    applyColorPalette(palette);

    // Extract hue values from generated colors for the sliders
    // This is approximate since we can't easily reverse OKLCH
    setPrimaryHue(Math.floor(Math.random() * 360));
    setSecondaryHue((primaryHue + 180) % 360);
  };

  const applyCustomColors = (
    newPrimaryHue: number,
    newSecondaryHue: number
  ) => {
    const root = document.documentElement;

    // Generate color scales for custom hues
    const generateScale = (hue: number, prefix: string) => {
      const baseChroma = 0.1;
      const scale = {
        50: `oklch(0.98 ${(baseChroma * 0.1).toFixed(3)} ${hue})`,
        100: `oklch(0.95 ${(baseChroma * 0.2).toFixed(3)} ${hue})`,
        200: `oklch(0.9 ${(baseChroma * 0.4).toFixed(3)} ${hue})`,
        300: `oklch(0.8 ${(baseChroma * 0.6).toFixed(3)} ${hue})`,
        400: `oklch(0.7 ${(baseChroma * 0.8).toFixed(3)} ${hue})`,
        500: `oklch(0.6 ${baseChroma.toFixed(3)} ${hue})`,
        600: `oklch(0.5 ${(baseChroma * 0.9).toFixed(3)} ${hue})`,
        700: `oklch(0.4 ${(baseChroma * 0.7).toFixed(3)} ${hue})`,
        800: `oklch(0.3 ${(baseChroma * 0.5).toFixed(3)} ${hue})`,
        900: `oklch(0.2 ${(baseChroma * 0.4).toFixed(3)} ${hue})`,
        950: `oklch(0.15 ${(baseChroma * 0.3).toFixed(3)} ${hue})`,
      };

      Object.entries(scale).forEach(([key, value]) => {
        root.style.setProperty(`--${prefix}-${key}`, value);
      });

      // Also set base colors for sidebar and other components
      if (prefix === "primary") {
        root.style.setProperty(`--primary`, `oklch(0.208 0.042 ${hue})`);
        root.style.setProperty(
          `--primary-foreground`,
          `oklch(0.984 0.003 ${hue})`
        );
      }
      if (prefix === "secondary") {
        root.style.setProperty(`--secondary`, `oklch(0.968 0.007 ${hue})`);
        root.style.setProperty(
          `--secondary-foreground`,
          `oklch(0.208 0.042 ${hue})`
        );
      }
    };

    generateScale(newPrimaryHue, "primary");
    generateScale(newSecondaryHue, "secondary");
  };

  const handlePrimaryChange = (value: number) => {
    setPrimaryHue(value);
    applyCustomColors(value, secondaryHue);
  };

  const handleSecondaryChange = (value: number) => {
    setSecondaryHue(value);
    applyCustomColors(primaryHue, value);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Palette className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Change colors</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            shuffleColors();
          }}
          className="cursor-pointer"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Shuffle Random Colors
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Custom Colors
        </DropdownMenuLabel>

        <div className="space-y-4 p-2">
          {/* Primary Color Picker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="primary-hue" className="text-sm font-medium">
                Primary Color
              </Label>
              <div
                className="h-6 w-6 rounded-md border"
                style={{
                  backgroundColor: `oklch(0.6 0.1 ${primaryHue})`,
                }}
              />
            </div>
            <input
              id="primary-hue"
              type="range"
              min="0"
              max="360"
              value={primaryHue}
              onChange={(e) => handlePrimaryChange(Number(e.target.value))}
              className="w-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  oklch(0.6 0.1 0),
                  oklch(0.6 0.1 60),
                  oklch(0.6 0.1 120),
                  oklch(0.6 0.1 180),
                  oklch(0.6 0.1 240),
                  oklch(0.6 0.1 300),
                  oklch(0.6 0.1 360)
                )`,
              }}
            />
            <div className="text-xs text-muted-foreground">
              Hue: {primaryHue}°
            </div>
          </div>

          {/* Secondary Color Picker */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="secondary-hue" className="text-sm font-medium">
                Secondary Color
              </Label>
              <div
                className="h-6 w-6 rounded-md border"
                style={{
                  backgroundColor: `oklch(0.6 0.1 ${secondaryHue})`,
                }}
              />
            </div>
            <input
              id="secondary-hue"
              type="range"
              min="0"
              max="360"
              value={secondaryHue}
              onChange={(e) => handleSecondaryChange(Number(e.target.value))}
              className="w-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  oklch(0.6 0.1 0),
                  oklch(0.6 0.1 60),
                  oklch(0.6 0.1 120),
                  oklch(0.6 0.1 180),
                  oklch(0.6 0.1 240),
                  oklch(0.6 0.1 300),
                  oklch(0.6 0.1 360)
                )`,
              }}
            />
            <div className="text-xs text-muted-foreground">
              Hue: {secondaryHue}°
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
