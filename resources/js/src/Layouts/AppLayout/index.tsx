import React, { useState, useCallback, useRef, useMemo } from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';
import { route } from 'ziggy-js';
import clsx from 'clsx';
import { usePage, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
  AppBar as MUIAppBar,
  Toolbar,
  Container,
  Button,
  Box,
  Popper as MuiPopper,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
} from '@mui/material';
import {
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import Dropdown from '@/src/lib/piwi/animated/Dropdown';
import Logo from '@/src/Logo';
import TrailBorder from '@/src/lib/piwi/animated/TrailBorder';
import Breadcrumbs from './Breadcrumbs';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { component } = usePage();
  const { t } = useTranslation();
  const activeLink = `link-${component}`;
  const [hoverLink, setHoverLink] = useState<string | null>(null);

  const onMouseOver = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      setHoverLink(_.get(ev, 'target.id', '')),
    [],
  );

  const onMouseLeave = useCallback(() => setHoverLink(null), []);

  return (
    <>
      <AppBar color="default">
        <Container maxWidth="lg">
          <Toolbar variant="dense" className="first-toolbar">
            <Logo size={46} />
            <div className="spacing" />
            <LinkButton
              id="link-Dashboard"
              className={clsx({ active: component === 'Dashboard' })}
              variant="text"
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
            >
              {t('Dashboard')}
            </LinkButton>
            <LinkButton
              id="link-test"
              variant="text"
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
            >
              {t('Test')}
            </LinkButton>
            <LinkButton
              id="link-test2"
              variant="text"
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
            >
              {t('Test 2')}
            </LinkButton>
            <Box sx={{ flex: 1 }} />
            <LoginDropdown />
          </Toolbar>
        </Container>
        <TrailBorder anchorId={hoverLink ?? activeLink} />
      </AppBar>
      <SecondaryAppBar color="default">
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <Breadcrumbs />
          </Toolbar>
        </Container>
      </SecondaryAppBar>
      {children}
    </>
  );
}

function LoginDropdown() {
  const { t } = useTranslation();
  const ref = useRef<HTMLButtonElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  const { props } = usePage();
  const email = _.get(props, 'auth.user.email', '') as string;

  const onClick = useCallback(() => setOn((prev) => !prev), []);
  const onClickAway = useCallback(() => setOn(false), []);

  return (
    <>
      <LoginButton
        onClick={onClick}
        variant="text"
        endIcon={<Dropdown on={on} />}
        ref={ref}
      >
        {email}
      </LoginButton>
      <Popper
        open={on}
        anchorEl={ref.current}
        placement="bottom"
        modifiers={useMemo(
          () => [
            ...(arrowRef.current !== null
              ? [
                  {
                    name: 'arrow',
                    enabled: true,
                    options: {
                      element: arrowRef,
                    },
                  },
                ]
              : []),
          ],
          [],
        )}
      >
        <ClickAwayListener onClickAway={onClickAway}>
          <div className="popper-wrapper">
            <div ref={arrowRef} className="arrow" />
            <Paper>
              <List disablePadding dense>
                <ListItem disablePadding>
                  <ListItemButton
                    LinkComponent={Link}
                    href={route('profile.edit')}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t('Profile')}</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    LinkComponent={Link}
                    href={route('logout')}
                    {...{ method: 'post' }}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t('Logout')}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </div>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

const AppBar = styled(MUIAppBar)(({ theme }) => ({
  position: 'relative',
  boxShadow: 'none',
  borderBottom: `2px solid ${theme.palette.divider}`,
  '& .MuiToolbar-root.first-toolbar': {
    position: 'relative',
    top: 2,
  },
}));

const SecondaryAppBar = styled(MUIAppBar)(({ theme }) => ({
  position: 'relative',
  boxShadow: 'none',
  marginBottom: theme.spacing(4),
}));

const LinkButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[600],
  '&:hover, &.active': {
    color: theme.palette.common.black,
  },
  paddingBottom: 12,
  paddingTop: 12,
  borderRadius: 0,
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.black,
  textTransform: 'lowercase',
  fontWeight: 'normal',
}));

const Popper = styled(MuiPopper)(({ theme, anchorEl }) => {
  const paperWidth = _.get(anchorEl, 'offsetWidth', 0);
  const paperHeight = _.get(anchorEl, 'offsetHeight', 0);

  return {
    zIndex: 99999,
    '&[data-popper-placement*="bottom"] .arrow': {
      top: 0,
      left: `calc(${paperWidth}px / 2 - calc(3em / 2))`,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
    '&[data-popper-placement*="top"] .arrow': {
      bottom: 0,
      left: `calc(${paperWidth}px / 2 - calc(3em / 2))`,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
      },
    },
    '&[data-popper-placement*="right"] .arrow': {
      top: `calc(${paperHeight}px / 2 - calc(1em / 2))`,
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
    '&[data-popper-placement*="left"] .arrow': {
      top: `calc(${paperHeight}px / 2 - calc(1em / 2))`,
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
      },
    },
    '& .arrow': {
      position: 'absolute',
      fontSize: 7,
      width: '3em',
      height: '3em',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
    '& .MuiPaper-root': {
      width: paperWidth,
    },
  };
});
