import * as React from 'react'
import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h1: React.CSSProperties
    h2: React.CSSProperties
    subtitle1: React.CSSProperties
    subtitle2: React.CSSProperties
    subtitle3: React.CSSProperties
    body1: React.CSSProperties
    body2: React.CSSProperties
    body3: React.CSSProperties
    caption1: React.CSSProperties
    caption2: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    h1?: React.CSSProperties
    h2?: React.CSSProperties
    subtitle1?: React.CSSProperties
    subtitle2?: React.CSSProperties
    subtitle3?: React.CSSProperties
    body1?: React.CSSProperties
    body2?: React.CSSProperties
    body3?: React.CSSProperties
    caption1?: React.CSSProperties
    caption2?: React.CSSProperties
  }

  interface Palette {
    Text: Palette['primary']
    Accent: Palette['primary']
    Structural: Palette['primary']
  }

  interface PaletteOptions {
    Text?: PaletteOptions['primary']
    Accent?: PaletteOptions['primary']
    Structural?: PaletteOptions['primary']
  }

  interface Color {
    primary300?: string
    primary500?: string
    primary700?: string
    lowEmphasis?: string
    mediumEmphasis?: string
    highEmphasis?: string
    accent100?: string
    accentRed100?: string
    accentGreen100?: string
    accentGreen50?: string
    structural100?: string
    structural50?: string
    icon?: string
    stroke100?: string
    stroke50?: string
    warning?: string
  }

  interface PaletteColor extends Color {}
  interface SimplePaletteColorOptions extends Color {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true
    h2: true
    subtitle1: true
    subtitle2: true
    subtitle3: true
    body1: true
    body2: true
    body3: true
    caption1: true
    caption2: true
  }
}
const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: ['Segoe UI', 'sans-serif'].join(','),

    h1: {
      fontSize: '28px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '40px',
    },

    h2: {
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '40px',
    },

    subtitle1: {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
    },

    subtitle2: {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 'normal',
    },

    subtitle3: {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '20px',
      letterSpacing: '0.16px',
    },

    body1: {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
    },

    body2: {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '24px',
    },

    body3: {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 'normal',
    },

    caption1: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 'normal',
    },

    caption2: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 'normal',
    },
  },
  palette: {
    primary: {
      main: '#FAFAFA',
      primary300: '#CFF5F6',
      primary500: '#625AFA',
      primary700: '#0055BC',
    },

    Text: {
      main: '#FAFAFA',
      lowEmphasis: '#687385',
      mediumEmphasis: '#404452',
      highEmphasis: '#1A1B25',
      warning: '#FF0000',
    },

    Accent: {
      main: '#FAFAFA',
      accent100: '#0196ED',
      accentRed100: '#ED6704',
      accentGreen100: '#006908',
      accentGreen50: '#006908',
    },

    Structural: {
      main: '#FAFAFA',
      structural100: '#EBEEF1',
      structural50: '#F6F8FA',
      icon: '#545969',
      stroke100: '#C0C8D2',
      stroke50: '#EBEEF1',
    },
  },
})
export default theme
