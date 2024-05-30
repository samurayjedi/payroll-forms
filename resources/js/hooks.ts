/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { FieldArrayRenderProps } from 'react-final-form-arrays';
import _ from 'lodash';
import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { createTheme } from '@mui/material/styles';
import { esES, enUS } from '@mui/material/locale';
import { route } from 'ziggy-js';

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
              main: '#1a1a1a',
              light: '#333333',
              dark: '#000000',
            },
            secondary: {
              main: '#fdfd1f',
              light: '#00ffa2',
              dark: '#ff00f0',
            },
          },
          components: {
            MuiButton: {
              styleOverrides: {
                contained: {
                  color: '#4b4b4d',
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

export function useSubmitHandler(link: string) {
  const callback = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: Record<string, any>) =>
      new Promise<void>((resolve) =>
        router.post(route(link), data, {
          onFinish: () => resolve(),
        }),
      ),
    [link],
  );

  return callback;
}

export function useRffCheckOnChange() {
  const [, , removeError] = useErrors();

  return (fields: RffFields) => (ev: unknown) => {
    removeError(fields.name);
    const checked = _.get(ev, 'target.checked', false) as boolean;
    const value = _.get(ev, 'target.value', '') as string;
    if (checked) {
      fields.push(value);
    } else {
      fields.remove(fields.value.indexOf(value));
    }
  };
}

export function useRffAggregatorOnChange() {
  const [, , removeError] = useErrors();

  return (fields: RffFields) => (v: string) => {
    fields.push(v);
    removeError(fields.name);
  };
}

type RffFields = FieldArrayRenderProps<any, HTMLElement>['fields'];
