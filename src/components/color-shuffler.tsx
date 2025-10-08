"use client";

import * as React from "react";
import { Palette, Shuffle, RotateCcw, Save, Trash2 } from "lucide-react";
import Cookies from "js-cookie";

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
import { Input } from "@/components/ui/input";
import { applyColorCSSToDOM, DEFAULT_HUES } from "@/lib/color-css-generator";
import { usePersistentGlobalStoreHook } from "@/hooks/use-persistent-global-store";

// Default color values from globals.css
const DEFAULT_PRIMARY_HUE = DEFAULT_HUES.primaryHue;
const DEFAULT_SECONDARY_HUE = DEFAULT_HUES.secondaryHue;

export function ColorShuffler() {
  const [mounted, setMounted] = React.useState(false);
  const [primaryHue, setPrimaryHue] = React.useState(DEFAULT_PRIMARY_HUE);
  const [secondaryHue, setSecondaryHue] = React.useState(DEFAULT_SECONDARY_HUE);
  const [open, setOpen] = React.useState(false);
  const [presetName, setPresetName] = React.useState("");
  const [showSaveInput, setShowSaveInput] = React.useState(false);

  const { colorPresets, saveColorPreset, deleteColorPreset } =
    usePersistentGlobalStoreHook();

  React.useEffect(() => {
    setMounted(true);

    // Sync state with cookie on mount
    const colorHuesCookie = Cookies.get("color-hues");
    if (colorHuesCookie) {
      try {
        const hues = JSON.parse(colorHuesCookie);
        setPrimaryHue(hues.primaryHue);
        setSecondaryHue(hues.secondaryHue);
        // Colors already applied by server, just sync state
      } catch (error) {
        console.error("Failed to parse color hues from cookie:", error);
      }
    }
  }, []);

  const shuffleColors = () => {
    // Generate random hues
    const newPrimaryHue = Math.floor(Math.random() * 360);
    const newSecondaryHue = (newPrimaryHue + 180) % 360;

    // Update state
    setPrimaryHue(newPrimaryHue);
    setSecondaryHue(newSecondaryHue);

    // Apply colors and save to cookie
    applyCustomColors(newPrimaryHue, newSecondaryHue);
  };

  const resetToDefault = () => {
    // Remove custom color styles
    const serverStyle = document.getElementById("custom-colors-server");
    const dynamicStyle = document.getElementById("custom-colors-dynamic");
    if (serverStyle) serverStyle.remove();
    if (dynamicStyle) dynamicStyle.remove();

    // Reset slider values
    setPrimaryHue(DEFAULT_PRIMARY_HUE);
    setSecondaryHue(DEFAULT_SECONDARY_HUE);

    // Remove cookie
    Cookies.remove("color-hues");
  };

  const applyCustomColors = (
    newPrimaryHue: number,
    newSecondaryHue: number
  ) => {
    // Apply colors to DOM immediately
    applyColorCSSToDOM({
      primaryHue: newPrimaryHue,
      secondaryHue: newSecondaryHue,
    });

    // Save to cookie for persistence
    Cookies.set(
      "color-hues",
      JSON.stringify({
        primaryHue: newPrimaryHue,
        secondaryHue: newSecondaryHue,
      }),
      {
        expires: 365, // 1 year
        sameSite: "lax",
      }
    );
  };

  const handlePrimaryChange = (value: number) => {
    setPrimaryHue(value);
    applyCustomColors(value, secondaryHue);
  };

  const handleSecondaryChange = (value: number) => {
    setSecondaryHue(value);
    applyCustomColors(primaryHue, value);
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) return;

    saveColorPreset(presetName.trim(), primaryHue, secondaryHue);
    setPresetName("");
    setShowSaveInput(false);
  };

  const handleApplyPreset = (
    presetPrimaryHue: number,
    presetSecondaryHue: number
  ) => {
    setPrimaryHue(presetPrimaryHue);
    setSecondaryHue(presetSecondaryHue);
    applyCustomColors(presetPrimaryHue, presetSecondaryHue);
  };

  const handleDeletePreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteColorPreset(id);
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

        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            resetToDefault();
          }}
          className="cursor-pointer"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Default
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Saved Presets Section */}
        {colorPresets.length > 0 && (
          <>
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Saved Presets
            </DropdownMenuLabel>
            <div className="max-h-48 overflow-y-auto">
              {colorPresets.map((preset) => (
                <DropdownMenuItem
                  key={preset.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleApplyPreset(preset.primaryHue, preset.secondaryHue);
                  }}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      <div
                        className="h-4 w-4 rounded-sm border"
                        style={{
                          backgroundColor: `oklch(0.6 0.15 ${preset.primaryHue})`,
                        }}
                      />
                      <div
                        className="h-4 w-4 rounded-sm border"
                        style={{
                          backgroundColor: `oklch(0.6 0.15 ${preset.secondaryHue})`,
                        }}
                      />
                    </div>
                    <span className="text-sm">{preset.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={(e) => handleDeletePreset(preset.id, e)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Save Current Colors */}
        {!showSaveInput ? (
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setShowSaveInput(true);
            }}
            className="cursor-pointer"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Current Colors
          </DropdownMenuItem>
        ) : (
          <div className="p-2 space-y-2">
            <Input
              placeholder="Preset name..."
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSavePreset();
                } else if (e.key === "Escape") {
                  setShowSaveInput(false);
                  setPresetName("");
                }
              }}
              autoFocus
              className="h-8"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSavePreset}
                disabled={!presetName.trim()}
                className="flex-1"
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowSaveInput(false);
                  setPresetName("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

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
