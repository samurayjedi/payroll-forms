import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Grid, TextField, InputAdornment } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';

export default function Signature({ submitting }: { submitting: boolean }) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Signature Information')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="customer_email"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Customer email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="customer_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Customer name')}
                fullWidth
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="sales_rep_email"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Sales rep email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="sales_rep_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Sales rep name')}
                fullWidth
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
      </Grid>
    </Section>
  );
}
