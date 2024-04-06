import React, { useState } from 'react';
import { route } from 'ziggy-js';
import { useTranslation } from 'react-i18next';
import { Link, useForm } from '@inertiajs/react';
import {
  TextField,
  Typography,
  Box,
  Alert,
  Collapse,
  InputAdornment,
  Button,
} from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon } from '@mui/icons-material';
import {
  Spacing,
  FormPaper,
  SpaceBetween,
  ErrorsAlert,
  FormFooterStyled,
} from '@/src/auth/AuthComponents';
import Layout from '@/src/auth/Layout';

export interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPassword({ status }: { status: string }) {
  const { t } = useTranslation();
  const [openAlerts, setOpenAlerts] = useState(false);
  const { data, setData, post, processing, errors } =
    useForm<ForgotPasswordForm>({
      email: '',
    });
  const { email } = data;

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setData(ev.target.name as keyof ForgotPasswordForm, ev.target.value);
  };

  return (
    <Layout>
      <FormPaper label={t('Forgot Password?')}>
        {status && (
          <Collapse in={openAlerts} className="alert">
            <Alert onClose={() => setOpenAlerts(false)}>{status}</Alert>
          </Collapse>
        )}
        <ErrorsAlert
          openAlerts={openAlerts}
          errors={errors}
          onClose={() => setOpenAlerts(false)}
        />
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            post(route('password.email'), {
              onFinish: () => setOpenAlerts(true),
            });
          }}
        >
          <Typography variant="subtitle1">
            {t(
              'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.',
            )}
          </Typography>
          <Spacing />
          <TextField
            id="signin-user"
            name="email"
            label={t('Email')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            value={email || ''}
            onChange={handleChange}
            fullWidth
            color="secondary"
          />
          <Spacing />
          <SpaceBetween paddingTop={0}>
            <Box />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<EmailIcon />}
              disabled={processing}
            >
              {t('Send Reset Link')}
            </Button>
          </SpaceBetween>
        </form>
        <FormFooterStyled>
          <Typography variant="subtitle1">
            {t('Are you remember?')}
            &nbsp;
            <Link href={route('login')}>{t('Login now!')}</Link>
          </Typography>
        </FormFooterStyled>
      </FormPaper>
    </Layout>
  );
}
