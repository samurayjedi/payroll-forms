import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Grid, TextField, Box } from '@mui/material';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';
import DatePicker from '@/src/lib/piwi/core/DatePicker';
import Select from '@/src/lib/piwi/core/Select';
import * as styles from './styles';
import { ssnOrEIN, paymentsMethods } from './vars';

export default function SectionTaxpayerIdentification({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Personal info.')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Field
            name="ssn_or_ein"
            subscription={{ value: true }}
            render={({ input }) => (
              <Select
                {...input}
                label={t('SSN/EIN')}
                items={ssnOrEIN}
                disabled={submitting}
                fullWidth
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Field
            name="ssn_ein"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                label={t('Identification number')}
                mask="#########"
                definitions={{
                  '#': /[0-9]/,
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
            name="bird_date"
            subscription={{ value: true }}
            render={({ input }) => (
              <DatePicker
                {...input}
                disablePast
                color="secondary"
                label={t('Bird Date')}
                fullWidth
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ p: 2 }} />
      <Field
        name="payment_method"
        subscription={{ value: true }}
        render={({ input }) => (
          <>
            <Options
              {...input}
              type="radio"
              css={styles.radios}
              label={t('How do you receive your payment?')}
              disabled={submitting}
              options={paymentsMethods}
            />
            {input.value === paymentsMethods[1] && (
              <>
                <Box sx={{ p: 1 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Field
                      name="bank_name"
                      subscription={{ value: true }}
                      render={(pollito) => (
                        <TextField
                          {...pollito.input}
                          variant="standard"
                          label={t('Bank/Financial Institution')}
                          fullWidth
                          color="secondary"
                          disabled={submitting}
                          onChange={onChangeDecorator(pollito.input.onChange)}
                          error={Boolean(fuckErrors[pollito.input.name])}
                          helperText={fuckErrors[pollito.input.name]}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Field
                      name="routing"
                      subscription={{ value: true }}
                      render={(pollito) => (
                        <TextFieldMasked
                          {...pollito.input}
                          variant="standard"
                          label={t('ABA Routing Number')}
                          mask="#########"
                          definitions={{
                            '#': /[0-9]/,
                          }}
                          fullWidth
                          color="secondary"
                          disabled={submitting}
                          onChange={onChangeDecorator(pollito.input.onChange)}
                          error={Boolean(fuckErrors[pollito.input.name])}
                          helperText={fuckErrors[pollito.input.name]}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Field
                      name="account"
                      subscription={{ value: true }}
                      render={(pollito) => (
                        <TextFieldMasked
                          {...pollito.input}
                          variant="standard"
                          label={t('Account Number')}
                          mask="############"
                          definitions={{
                            '#': /[0-9]/,
                          }}
                          fullWidth
                          color="secondary"
                          disabled={submitting}
                          onChange={onChangeDecorator(pollito.input.onChange)}
                          error={Boolean(fuckErrors[pollito.input.name])}
                          helperText={fuckErrors[pollito.input.name]}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ p: 1 }} />
              </>
            )}
          </>
        )}
      />
    </Section>
  );
}
