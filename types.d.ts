export type Color =
  | 'gray'
  | 'mauve'
  | 'slate'
  | 'sage'
  | 'olive'
  | 'sand'
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'bronze'
  | 'gold'
  | 'brown'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'mint'
  | 'sky'

export type PresetRadixColorOptions = {
  /**
   * Name of the colors to generate CSS variables.
   */
  colors: Color[]
  /**
   * Prefix appended to generated variable names.
   * @default 'radix-'
   */
  prefix?: string | undefined
  /**
   * CSS selector for light mode palette.
   * @default '.light, .light-theme'
   */
  lightSelector?: string | undefined
  /**
   * CSS selector for dark mode palette.
   * @default '.dark, .dark-theme'
   */
  darkSelector?: string | undefined
  /**
   * Extend colors from previous presets.
   * @default false
   */
  extend?: boolean | undefined
  /**
   * Generate alpha variants.
   * @default true
   */
  alpha?: boolean | undefined
  /**
   * Generate dark mode variants.
   * @default true
   */
  dark?: boolean | undefined
  /**
   * Support `prefers-color-scheme: dark`. Only works if `dark` is also enabled.
   * @default true
   */
  prefersColorScheme?: boolean | undefined
  /**
   * Generate P3 color gamut variants.
   * @default true
   */
  p3?: boolean | undefined
  /**
   * Foreground colors to generate. Some colors need white foreground text and some colors need black foreground text.
   * @default { black: "#000", white: "#fff" }
   */
  foregrounds?: {black?: string; white?: string}
  /**
   * Aliases to generate.
   */
  aliases?: Record<string, Color>
  /**
   * Generate `prose-radix-[color]` rules for `@unocss/preset-typography`.
   * @default false
   */
  typography?: boolean | undefined
  /**
   * Use custom selector for `@unocss/preset-typography`. Only works if `typography` is also enabled.
   * @default 'prose'
   */
  typographySelector?: string
}

export function presetRadixColors(options: PresetRadixColorOptions): import('unocss').Preset<object>
