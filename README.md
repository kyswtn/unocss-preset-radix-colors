[UnoCSS](https://unocss.dev) preset for using [Radix Colors](https://www.radix-ui.com/colors). This preset works by injecting CSS variables and supports **autmatic dark mode** (class/attribute based, media-query based, or both), **alpha variants**, **P3 gamut color spaces**, and **aliases**. All of these features can be turned-off or configured to fit your use case.

This approach of generating CSS variables can add to your CSS file size as you need to retain different variants. That means for one color you might have CSS variables generated for base color palette, dark mode, `media-query` based dark mode, alpha colors, P3 colors and aliases. Therefore it's recommended to configure only the colors you use and use [purgecss](https://purgecss.com) to purge away unused variables.

Here's an example use of the preset.

```js
import {defineConfig, presetIcons, presetWind} from 'unocss'
import {presetRadixColors} from 'unocss-preset-radix-colors'

export default defineConfig({
  presets: [
    presetRadixColors({
      colors: ['red', 'gray'],
      aliases: {
        primary: 'red',
        secondary: 'gray'
      },
      // Remove `radix-` prefix on CSS variables.
      prefix: '',
      // Remove `.light-theme` & `.dark-theme` selectors included by Radix.
      lightSelector: '.light',
      darkSelector: '.dark',
      // Use dark-gray & off-white colors for text-[color]-fg variants.
      foregrounds: {
        black: '#343231',
        white: '#FAF9F6',
      },
    }),
  ],
})
```
