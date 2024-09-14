import * as radix from '@radix-ui/colors'

/**
 * @type {import('./types').Color[]}
 */
export const colors = [
  'gray',
  'mauve',
  'slate',
  'sage',
  'olive',
  'sand',
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'bronze',
  'gold',
  'brown',
  'orange',
  'amber',
  'yellow',
  'lime',
  'mint',
  'sky',
]

export const palette = {
  overlays: {
    black: radix.blackA,
    white: radix.whiteA,
  },
  colors: colors.map((color) => ({
    name: color,
    light: {
      solid: radix[color],
      alpha: radix[`${color}A`],
    },
    dark: {
      solid: radix[`${color}Dark`],
      alpha: radix[`${color}DarkA`],
    },
  })),
}

export const p3Palette = {
  overlays: {
    black: radix.blackP3A,
    white: radix.whiteP3A,
  },
  colors: colors.map((color) => ({
    name: color,
    light: {
      solid: radix[`${color}P3`],
      alpha: radix[`${color}P3A`],
    },
    dark: {
      solid: radix[`${color}DarkP3`],
      alpha: radix[`${color}DarkP3A`],
    },
  })),
}
