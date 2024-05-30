/* eslint-disable @typescript-eslint/no-explicit-any */
import { format as datefnsFormat, parse as datefnsParse } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esESLocale from 'date-fns/locale/es';

export const language = 'en-US';

export const locales = {
  'en-US': enUSLocale,
  'es-ES': esESLocale,
} as const;

export const dateFormats = {
  'en-US': 'yyyy-MM-dd',
  'es-ES': 'dd-MM-yyyy',
};

export const dateTimeFormats = {
  'en-US': 'yyyy-MM-dd hh:mm aaaa',
  'es-ES': 'dd-MM-yyyy hh:mm aaaa',
};

export function format(date: Date, sf: string = dateFormats[language]) {
  return datefnsFormat(date, sf, {
    locale: locales[language],
  } as any);
}

export function parse(
  date: string,
  sf: string = dateFormats[language],
  ref: Date = new Date(),
) {
  return datefnsParse(date, sf, ref, {
    locale: locales[language],
  } as any);
}
