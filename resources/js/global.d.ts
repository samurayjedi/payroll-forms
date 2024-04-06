/* eslint-disable @typescript-eslint/no-empty-interface */
import type { Theme as MUITheme } from '@mui/material/styles';
// merge @mui theme type with @emotion theme type
declare module '@emotion/react' {
  export interface Theme extends MUITheme {}
}

declare global {
  export type Language = 'es-ES' | 'en-US';
}
