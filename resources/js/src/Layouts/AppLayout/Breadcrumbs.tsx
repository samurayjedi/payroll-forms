import _ from 'lodash';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { route } from 'ziggy-js';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

export default function Breadcrumbs() {
  const { t } = useTranslation();
  const { pathname } = window.location;
  const paths = pathname
    .split('/')
    // eslint-disable-next-line no-restricted-globals
    .filter((path) => path !== 'id' && isNaN(parseInt(path, 10)));

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {paths.map((path, index) => [
        (() => {
          switch (path) {
            case '':
              return (
                <Link href="/">
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  {t('Home')}
                </Link>
              );
            default:
              return index < paths.length - 1 ? (
                <Link href={route(path)}>{t(_.startCase(path))}</Link>
              ) : (
                <span>{t(_.startCase(path))}</span>
              );
          }
        })(),
      ])}
    </MuiBreadcrumbs>
  );
}
