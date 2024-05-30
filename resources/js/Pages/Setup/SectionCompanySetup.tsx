import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Box, Typography, TextField } from '@mui/material';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import InputFileGroup from '@/src/lib/piwi/core/InputFileGroup';
import InputFile from '@/src/lib/piwi/core/InputFile';
import * as styles from './styles';

const companyTypes = [
  'Sole Proprietorship',
  'General Partnership',
  'Limited Liability C',
  'Limited Liability P',
  'Corporate',
  'Other',
] as const;

export default function SectionCompanySetup({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Company Setup')}>
      <Typography variant="subtitle1" gutterBottom>
        <span>1 -&nbsp;</span>
        {t('Your company name')}
      </Typography>
      <Field
        name="company_name"
        subscription={{ value: true }}
        render={({ input }) => (
          <TextField
            {...input}
            fullWidth
            variant="standard"
            color="secondary"
            disabled={submitting}
            onChange={onChangeDecorator(input.onChange)}
            error={Boolean(fuckErrors[input.name])}
            helperText={fuckErrors[input.name]}
          />
        )}
      />

      <Box sx={{ p: 2 }} />
      <Field
        name="company_type"
        subscription={{ value: true }}
        render={({ input }) => (
          <Options
            {...input}
            type="radio"
            css={styles.radios}
            label={`2 - ${t(
              "What is your company's federal tax classification?",
            )}`}
            disabled={submitting}
            options={companyTypes}
            onChange={onChangeDecorator(input.onChange)}
            error={Boolean(fuckErrors[input.name])}
            helperText={fuckErrors[input.name]}
          >
            {(radio) =>
              input.value === 'Other' &&
              radio === 'Other' && (
                <Field
                  name="company_type_other"
                  subscription={{ value: true }}
                  render={(superpollito) => (
                    <TextField
                      {...superpollito.input}
                      label={t('Specify your company type')}
                      variant="standard"
                      color="secondary"
                      disabled={submitting}
                      onChange={onChangeDecorator(input.onChange)}
                      error={Boolean(fuckErrors[input.name])}
                      helperText={fuckErrors[input.name]}
                    />
                  )}
                />
              )
            }
          </Options>
        )}
      />
      <Box sx={{ p: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        <span>3 -&nbsp;</span>
        {t(
          'Specify the type of company you have registered (construction, restaurant, etc)',
        )}
      </Typography>
      <Field
        name="taxes_company_type"
        subscription={{ value: true }}
        render={({ input }) => (
          <TextField
            {...input}
            fullWidth
            variant="standard"
            color="secondary"
            disabled={submitting}
            onChange={onChangeDecorator(input.onChange)}
            error={Boolean(fuckErrors[input.name])}
            helperText={fuckErrors[input.name]}
          />
        )}
      />
      <Box sx={{ p: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        <span>4 -&nbsp;</span>
        {t('What is the activity carried out by your company?')}
      </Typography>
      <Field
        name="taxes_company_activity"
        subscription={{ value: true }}
        render={({ input }) => (
          <TextField
            {...input}
            fullWidth
            variant="standard"
            color="secondary"
            disabled={submitting}
            onChange={onChangeDecorator(input.onChange)}
            error={Boolean(fuckErrors[input.name])}
            helperText={fuckErrors[input.name]}
          />
        )}
      />
      <Box sx={{ p: 2 }} />
      <InputFileGroup
        label={`5 - ${t('Please upload your EIN and state registration')}`}
        accept="application/pdf, image/png, image/gif, image/jpeg"
        multiple
        disabled={submitting}
      >
        <Field
          name="ein_file"
          subscription={{ value: true }}
          render={({ input }) => (
            <InputFile
              {...input}
              label={t('Select EIN document')}
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
          )}
        />
        <Field
          name="state_registration_file"
          subscription={{ value: true }}
          render={({ input }) => (
            <InputFile
              {...input}
              label={t('Select state registration document')}
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
          )}
        />
      </InputFileGroup>
    </Section>
  );
}
