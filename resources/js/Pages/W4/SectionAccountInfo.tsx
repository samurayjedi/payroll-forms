import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Grid, Box, TextField } from '@mui/material';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';
import { paymentsMethods } from './vars';
import * as styles from './styles';

export default function SectionAccountInfo({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Payment info.')}>
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
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
            {input.value === 'Direct Deposit' && (
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
                          mask="#########"
                          definitions={{
                            '#': /[0-9]/,
                          }}
                          variant="standard"
                          label={t('ABA Routing Number')}
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
                          mask="############"
                          definitions={{
                            '#': /[0-9]/,
                          }}
                          variant="standard"
                          label={t('Account Number')}
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
