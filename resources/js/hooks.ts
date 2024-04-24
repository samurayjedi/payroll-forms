import { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { createTheme } from '@mui/material/styles';
import { esES, enUS } from '@mui/material/locale';

const MaterialLocales = {
  'es-ES': esES,
  'en-US': enUS,
} as const;

export function usePiwiTheme() {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const themeWithLocale = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: 'light',
            primary: {
              main: '#6F42C1',
              light: '#9F7AED',
              dark: '#4B2995',
            },
            secondary: {
              main: '#FF9933',
              light: '#FFCC99',
              dark: '#CC6600',
            },
          },
          components: {
            MuiButton: {
              styleOverrides: {
                contained: {
                  color: 'white',
                },
                // root: {},
              },
            },
          },
        },
        MaterialLocales[language as keyof typeof MaterialLocales],
      ),
    [language],
  );

  return themeWithLocale;
}

export function useErrors() {
  const { errors } = usePage().props;
  const [fuckErrors, setFuckErrors] = useState(errors);

  useEffect(() => {
    setFuckErrors(errors);
  }, [errors]);

  const removeError = (key: string) =>
    setFuckErrors((prev) => _.omit(prev, key));

  const onChangeDecorator =
    (onChange: (vacaEv: unknown, ...vacaArgs: unknown[]) => void) =>
    (ev: unknown, ...args: unknown[]) => {
      onChange(ev, ...args);
      const name = _.get(ev, 'target.name', null) as string | null;
      if (name) {
        if (_.has(fuckErrors, name)) {
          removeError(name);
        }
      }
    };

  return [fuckErrors, onChangeDecorator, removeError] as const;
}
