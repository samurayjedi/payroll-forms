import { css } from '@emotion/react';

export const taxClasificationsRadios = (theme) =>
  css({
    '& .MuiFormControlLabel-root': {
      padding: `${theme.spacing(1)} 0 !important`,
    },
    '& .MuiFormControl-root': {
      marginTop: `-${theme.spacing(1)}`,
    },
  });

export const radios = (theme) =>
  css({
    flexDirection: 'row',
    paddingTop: theme.spacing(1),
  });
