import * as radix from './radix.js'

/**
 * @type {import('./types').presetRadixColors} options
 */
export function presetRadixColors(options) {
  const {
    colors: colorNames,
    prefix = 'radix-',
    lightSelector = '.light, .light-theme',
    darkSelector = '.dark, .dark-theme',
    extend = false,
    alpha = true,
    dark = true,
    prefersColorScheme = true,
    p3 = true,
    foregrounds: _foregrounds,
    aliases = {},
  } = options

  const validatedColorNames = [...new Set(colorNames)].filter((colorName) =>
    radix.colors.includes(colorName),
  )

  const fgPrefix = 'fg-'

  const foregrounds = {
    white: '#fff',
    black: '#000',
    ...(_foregrounds ?? {}),
  }

  /**
   * @param {string} colorName
   */
  const getFg = (colorName) =>
    ['sky', 'mint', 'lime', 'yellow', 'amber'].includes(colorName) ? 'black' : 'white'

  /**
   * @param {string} colorName
   */
  const getScaleToVarMappings = (colorName) => {
    const oneTo12 = Array.from({length: 12}, (_, i) => i + 1)
    const alpha = colorName.endsWith('A') ? 'a' : ''
    return Object.fromEntries(
      oneTo12.map((n) => [`${n}${alpha}`, `var(--${prefix}${colorName}${n})`]),
    )
  }

  /**
   * @param {[string, string][]} entries
   */
  const makeCSSVarsFromEntries = (entries) =>
    entries.map(([key, value]) => `--${prefix}${key}: ${value};`).join('')

  /**
   * @param {typeof radix.palette.colors} colors
   * @param {'light' | 'dark'} theme
   */
  const getCSSVarsFromColors = (colors, theme) =>
    makeCSSVarsFromEntries(
      colors
        .map((color) => color[theme])
        .flatMap((color) => Object.entries({...color.solid, ...(alpha ? color.alpha : {})})),
    )

  /**
   * @param {typeof radix.palette} palette
   */
  const getStylesFromPalette = (palette) => {
    const colors = palette.colors.filter((color) => colorNames.includes(color.name))

    const lightVars = getCSSVarsFromColors(colors, 'light')
    const overlayVars = makeCSSVarsFromEntries(
      Object.values(palette.overlays).flatMap(Object.entries),
    )

    const styles = [
      `:root { ${overlayVars} }`,
      `${lightSelector}, :root:not(${darkSelector}) { ${lightVars} }`,
    ]

    if (dark) {
      const darkVars = getCSSVarsFromColors(colors, 'dark')
      if (prefersColorScheme) {
        styles.push(
          `@media only screen and (prefers-color-scheme: dark) { 
            :root:not(${lightSelector}) {
              ${darkVars} 
            }
          }`,
        )
      }
      styles.push(`${darkSelector} { ${darkVars} }`)
    }
    return styles.join('')
  }

  /**
   * @param {string} color
   */
  const getAllVarMappings = (color) => ({
    ...getScaleToVarMappings(color),
    fg: `var(--${prefix}${fgPrefix}${getFg(color)})`,
    ...(alpha ? getScaleToVarMappings(`${color}A`) : {}),
  })

  const colorMappings = Object.fromEntries(
    validatedColorNames
      .map((color) => [/** @type {string} */ (color), color])
      .concat(Object.entries(aliases))
      .map(([name, color]) => [name, getAllVarMappings(color)]),
  )

  return {
    name: 'unocss-preset-radix-colors',
    extendTheme: (theme) => ({
      ...theme,
      colors: {
        inherit: 'inherit',
        current: 'currentColor',
        transparent: 'transparent',
        ...(extend ? /** @type {{colors: unknown}} */ (theme)?.colors ?? {} : {}),
        ...colorMappings,
        black: {DEFAULT: '#000', ...getScaleToVarMappings('blackA')},
        white: {DEFAULT: '#fff', ...getScaleToVarMappings('whiteA')},
      },
    }),
    preflights: [
      {
        getCSS: () => {
          // biome-ignore format: Single line reads better.
          const fgVars = makeCSSVarsFromEntries(Object.entries(foregrounds).map(([k, v]) => [`${fgPrefix}${k}`, v]))
          const styles = [`:root { ${fgVars} }`, getStylesFromPalette(radix.palette)]

          if (p3) {
            styles.push(
              `@supports (color: color(display-p3 1 1 1)) { 
                @media (color-gamut: p3) { 
                  ${getStylesFromPalette(radix.p3Palette)} 
                }
              }`,
            )
          }

          return styles.join('')
        },
      },
    ],
  }
}
