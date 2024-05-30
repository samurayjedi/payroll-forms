import { css } from '@emotion/react';

export const dependents = (theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    '& span': {
      padding: `0 ${theme.spacing(2)}`,
    },
  });

export const radios = (theme) =>
  css({
    flexDirection: 'row',
    paddingTop: theme.spacing(1),
  });
