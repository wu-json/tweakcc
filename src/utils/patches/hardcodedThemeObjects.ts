// Patch to fix hardcoded theme object variables that contain orange rainbow colors
// These variables (wf9, $f9, qf9, Nf9, Lf9, Mf9) are used as fallbacks/defaults
// and cause orange to appear in the monochrome theme spinner

import { Theme } from '../types.js';

/**
 * Replace hardcoded rainbow colors in theme object variables with monochrome values
 */
export const writeHardcodedThemeObjects = (
  oldFile: string,
  activeTheme: Theme
): string | null => {
  // Only apply this patch if using monochrome theme
  if (activeTheme.id !== 'monochrome') {
    return oldFile;
  }

  // Find the hardcoded theme variables section
  // Pattern: var wf9,$f9,qf9,Nf9,Lf9,Mf9;var AP0=R(()=>{wf9={...
  const pattern = /var (wf9),(\$f9),(qf9),(Nf9),(Lf9),(Mf9);var ([$\w]+)=R\(\(\)=>\{/;
  const match = oldFile.match(pattern);

  if (!match || match.index === undefined) {
    console.log('patch: hardcodedThemeObjects: failed to find theme variables');
    return null;
  }

  // Find the end of this section (look for the next occurrence of "});")
  const startIndex = match.index;
  const searchStart = startIndex + match[0].length;
  const endPattern = /\}\);function (LB)\(/;
  const endMatch = oldFile.substring(searchStart).match(endPattern);

  if (!endMatch || endMatch.index === undefined) {
    console.log(
      'patch: hardcodedThemeObjects: failed to find end of theme variables section'
    );
    return null;
  }

  const endIndex = searchStart + endMatch.index;

  // Get monochrome rainbow colors from the active theme
  const monoColors = {
    rainbow_red: activeTheme.colors.rainbow_red,
    rainbow_orange: activeTheme.colors.rainbow_orange,
    rainbow_yellow: activeTheme.colors.rainbow_yellow,
    rainbow_green: activeTheme.colors.rainbow_green,
    rainbow_blue: activeTheme.colors.rainbow_blue,
    rainbow_indigo: activeTheme.colors.rainbow_indigo,
    rainbow_violet: activeTheme.colors.rainbow_violet,
    rainbow_red_shimmer: activeTheme.colors.rainbow_red_shimmer,
    rainbow_orange_shimmer: activeTheme.colors.rainbow_orange_shimmer,
    rainbow_yellow_shimmer: activeTheme.colors.rainbow_yellow_shimmer,
    rainbow_green_shimmer: activeTheme.colors.rainbow_green_shimmer,
    rainbow_blue_shimmer: activeTheme.colors.rainbow_blue_shimmer,
    rainbow_indigo_shimmer: activeTheme.colors.rainbow_indigo_shimmer,
    rainbow_violet_shimmer: activeTheme.colors.rainbow_violet_shimmer,
  };

  // Extract the section containing all theme objects
  let themeSection = oldFile.substring(
    startIndex + match[0].length,
    endIndex
  );

  // Replace all orange rainbow colors with monochrome equivalents
  // Standard rainbow colors
  themeSection = themeSection.replace(
    /rainbow_red:"rgb\(235,95,87\)"/g,
    `rainbow_red:"${monoColors.rainbow_red}"`
  );
  themeSection = themeSection.replace(
    /rainbow_orange:"rgb\(245,139,87\)"/g,
    `rainbow_orange:"${monoColors.rainbow_orange}"`
  );
  themeSection = themeSection.replace(
    /rainbow_yellow:"rgb\(250,195,95\)"/g,
    `rainbow_yellow:"${monoColors.rainbow_yellow}"`
  );
  themeSection = themeSection.replace(
    /rainbow_green:"rgb\(145,200,130\)"/g,
    `rainbow_green:"${monoColors.rainbow_green}"`
  );
  themeSection = themeSection.replace(
    /rainbow_blue:"rgb\(130,170,220\)"/g,
    `rainbow_blue:"${monoColors.rainbow_blue}"`
  );
  themeSection = themeSection.replace(
    /rainbow_indigo:"rgb\(155,130,200\)"/g,
    `rainbow_indigo:"${monoColors.rainbow_indigo}"`
  );
  themeSection = themeSection.replace(
    /rainbow_violet:"rgb\(200,130,180\)"/g,
    `rainbow_violet:"${monoColors.rainbow_violet}"`
  );

  // Shimmer rainbow colors
  themeSection = themeSection.replace(
    /rainbow_red_shimmer:"rgb\(250,155,147\)"/g,
    `rainbow_red_shimmer:"${monoColors.rainbow_red_shimmer}"`
  );
  themeSection = themeSection.replace(
    /rainbow_orange_shimmer:"rgb\(255,185,137\)"/g,
    `rainbow_orange_shimmer:"${monoColors.rainbow_orange_shimmer}"`
  );
  themeSection = themeSection.replace(
    /rainbow_yellow_shimmer:"rgb\(255,225,155\)"/g,
    `rainbow_yellow_shimmer:"${monoColors.rainbow_yellow_shimmer}"`
  );
  themeSection = themeSection.replace(
    /rainbow_green_shimmer:"rgb\(185,230,180\)"/g,
    `rainbow_green_shimmer:"${monoColors.rainbow_green_shimmer}"`
  );
  themeSection = themeSection.replace(
    /rainbow_blue_shimmer:"rgb\(180,205,240\)"/g,
    `rainbow_blue_shimmer:"${monoColors.rainbow_blue_shimmer}"`
  );
  themeSection = themeSection.replace(
    /rainbow_indigo_shimmer:"rgb\(195,180,230\)"/g,
    `rainbow_indigo_shimmer:"${monoColors.rainbow_indigo_shimmer}"`
  );
  themeSection = themeSection.replace(
    /rainbow_violet_shimmer:"rgb\(230,180,210\)"/g,
    `rainbow_violet_shimmer:"${monoColors.rainbow_violet_shimmer}"`
  );

  // Reconstruct the file
  const newFile =
    oldFile.substring(0, startIndex + match[0].length) +
    themeSection +
    oldFile.substring(endIndex);

  console.log(
    'patch: hardcodedThemeObjects: replaced rainbow colors with monochrome values'
  );
  return newFile;
};
