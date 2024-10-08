import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Link } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

export default function Logo({ size = 80 }: { size?: number }) {
  const { t } = useTranslation();

  return (
    <LogoLink href="/">
      <Tooltip title={t('Home')}>
        <img
          src="/storage/images/logo.png"
          alt="logo.png"
          height={size}
          width={size}
          style={{ objectFit: 'cover' }}
        />
      </Tooltip>
    </LogoLink>
  );
}

const LogoLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
});
