import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Grid, InputAdornment, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';

export default function SectionCertification({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Certification.')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="email"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                fullWidth
                label={t('Email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
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
