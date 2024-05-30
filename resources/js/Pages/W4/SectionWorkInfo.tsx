import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { TextField, Grid, InputAdornment } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import TextFieldCurrency from '@/src/lib/piwi/core/TextFieldCurrency';
import DatePicker from '@/src/lib/piwi/core/DatePicker';

export default function SectionWorkInfo({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Work info.')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Field
            name="company_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Company name')}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Field
            name="job_position"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Job position')}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon />
                    </InputAdornment>
                  ),
                }}
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Field
            name="hired_date"
            subscription={{ value: true }}
            render={({ input }) => (
              <DatePicker
                {...input}
                label={t('Hired date')}
                fullWidth
                disableFuture
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Field
            name="rate_of_pay"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldCurrency
                {...input}
                label={t('Rate of pay')}
                fullWidth
                color="secondary"
                disabled={submitting}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TrendingUpIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Field
            name="manager_email"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Manager email')}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactMailIcon />
                    </InputAdornment>
                  ),
                }}
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Field
            name="manager_full_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Manager full name')}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon />
                    </InputAdornment>
                  ),
                }}
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
