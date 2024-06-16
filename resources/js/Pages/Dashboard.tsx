import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { Container, Paper as MUIPaper, Button } from '@mui/material';
import {
  Handshake as HandshakeIcon,
  Business as BusinessIcon,
  ContactPage as ContactPageIcon,
  ChecklistRtl as ChecklistRtlIcon,
  DynamicForm as DynamicFormIcon,
} from '@mui/icons-material';
import AppLayout from '@/src/Layouts/AppLayout';
import Section from '@/src/Components/Section';
import StatusAlert from '@/src/Components/StatusAlert';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Paper>
          <StatusAlert />
          <Section title={t('Docusign')} direction="row">
            <CardButton
              LinkComponent={Link}
              href={route('service-agreement')}
              variant="contained"
              startIcon={<HandshakeIcon />}
            >
              {t('Service Agreement')}
            </CardButton>
            <CardButton
              LinkComponent={Link}
              href={route('business-registration-form')}
              variant="contained"
              startIcon={<BusinessIcon />}
            >
              {t('Business Registration Form')}
            </CardButton>
            <CardButton
              LinkComponent={Link}
              href={route('w4')}
              variant="contained"
              startIcon={<ContactPageIcon />}
            >
              {t('W4')}
            </CardButton>
            <CardButton
              LinkComponent={Link}
              href={route('w9')}
              variant="contained"
              startIcon={<ContactPageIcon />}
            >
              {t('W9')}
            </CardButton>
          </Section>
          <Section title={t('Misc')} direction="row">
            <CardButton
              LinkComponent={Link}
              href={route('form-setup')}
              variant="contained"
              startIcon={<ChecklistRtlIcon />}
            >
              {t('Form Setup')}
            </CardButton>
            <CardButton
              LinkComponent={Link}
              href={route('form-builder')}
              variant="contained"
              startIcon={<DynamicFormIcon />}
            >
              {t('Form Builder')}
            </CardButton>
          </Section>
        </Paper>
      </Container>
    </AppLayout>
  );
}

const Paper = styled(MUIPaper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
}));

const CardButton = styled(Button)(({ theme }) => ({
  width: 155,
  height: 140,
  display: 'flex',
  flexFlow: 'column',
  borderRadius: 0,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.grey[50],
  boxShadow:
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  textTransform: 'none',
  transition: 'transform .3s ease-in, color .3s ease-in',
  textAlign: 'center',
  marginRight: theme.spacing(3),
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
    color: theme.palette.text.primary,
    transform: 'scale(1.1)',
  },
  '& .MuiButton-startIcon': {
    margin: 0,
    marginBottom: theme.spacing(2),
    '& svg': {
      fontSize: 48,
    },
  },
}));
