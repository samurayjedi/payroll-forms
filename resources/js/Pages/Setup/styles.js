import { css } from '@emotion/react';

export const sectionHeader = (theme) =>
  css({
    width: 'fit-content',
    overflow: 'hidden',
    position: 'relative',
    padding: '4px 0',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(3),
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: -7,
      zIndex: 1,
      width: '100%',
      height: 31,
      backgroundColor: theme.palette.secondary.main,
      transform: 'skew(-20deg)',
    },
    '& .section-header-title': {
      position: 'relative',
      zIndex: 2,
      color: theme.palette.common.white,
    },
  });

export const section = (theme) =>
  css({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: 'rgba(0, 0, 0, 0.6)',
    '& .MuiInput-root': {
      minWidth: 150,
    },
  });

export const radios = (theme) =>
  css({
    flexDirection: 'row',
    paddingTop: theme.spacing(1),
  });

export const checkboxes = (theme) =>
  css({
    flexDirection: 'row',
    paddingTop: theme.spacing(1),
  });

export const period = (theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& span': {
      padding: `0 ${theme.spacing(2)}`,
    },
  });

export const systemAccess = (theme) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    '& span': {
      padding: `0 ${theme.spacing(2)}`,
    },
  });

export const textArea = css({
  width: '100%',
});

export const submit = (theme) =>
  css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
  });

export const hidden = css({
  display: 'none',
});
