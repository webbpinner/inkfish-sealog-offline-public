/**
 * Shared theme preset data and lookups. Pure data/logic only, no DOM access,
 * so it can be imported by both index.html's and landing.html's inline boot
 * scripts. The corresponding CSS variable definitions live in theme.css.
 * @module
 */

/** localStorage key for the active preset id. */
export const PRESET_KEY = 'sealog.preset';

/** Theme presets: id (stored preference + CSS `data-preset` value), display name, and meta theme-color. */
export const PRESETS = Object.freeze([
  Object.freeze({ id: 'light', name: 'Light', bg: '#f5f3f0', accent: '#4a6fa5' }),
  Object.freeze({ id: 'honey', name: 'Honey', bg: '#0a0a0a', accent: '#d4a574' }),
  Object.freeze({ id: 'ocean', name: 'Ocean', bg: '#0a0e14', accent: '#5ba4cf' })
]);

/**
 * Look up a preset by id, falling back to the first preset (light) if unknown.
 * @param {string} id - Preset id to look up.
 * @returns {{id: string, name: string, bg: string, accent: string}} The matching preset, or the default.
 */
export function getPreset(id) {
  return PRESETS.find((p) => p.id === id) || PRESETS[0];
}

/**
 * Read the saved preset id from localStorage, if it names a known preset.
 * @returns {string|null} The stored preset id, or null if absent/unrecognized.
 */
export function storedPresetId() {
  try {
    const id = localStorage.getItem(PRESET_KEY);
    return PRESETS.some((p) => p.id === id) ? id : null;
  } catch {
    return null;
  }
}

/**
 * Resolve the OS-preferred preset when the user hasn't chosen one yet.
 * System dark maps to ocean, system light maps to light.
 * @returns {string} The preferred preset id.
 */
export function systemPreferredPresetId() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'ocean' : 'light';
}
