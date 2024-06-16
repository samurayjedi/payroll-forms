import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Box, Typography, TextField } from '@mui/material';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import InputFile from '@/src/lib/piwi/core/InputFile';
import { yesNo } from './vars';
import * as styles from './styles';

export default function SectionTaxes({ submitting }: { submitting: boolean }) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Taxes')}>
      <Field
        name="did_taxes_payment_the_last_year"
        subscription={{ value: true }}
        render={({ input }) => (
          <>
            <Options
              {...input}
              type="radio"
              css={styles.radios}
              label={`1 - ${t(
                'Did you pay personal/business taxes last year?',
              )}`}
              disabled={submitting}
              options={yesNo}
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
            {input.value === yesNo[1] && (
              <>
                <Box sx={{ p: 2 }} />
                <div className="input-file-field">
                  <Typography variant="subtitle1" gutterBottom>
                    {t('Please upload your taxes files')}
                  </Typography>
                  <Field
                    name="taxes_files"
                    subscription={{ value: true }}
                    render={(pollito) => (
                      <InputFile
                        {...pollito.input}
                        multiple
                        accept="application/pdf, image/png, image/gif, image/jpeg"
                        disabled={submitting}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                    )}
                  />
                </div>
                <Box sx={{ p: 2 }} />
                <Field
                  name="has_taxes_problems"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <Options
                        {...pollito.input}
                        type="radio"
                        css={styles.radios}
                        label={`2 - ${t(
                          'Have you had problems with your taxes?',
                        )}`}
                        disabled={submitting}
                        options={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <>
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t('Please tell us a bit')}
                          </Typography>
                          <Field
                            name="has_taxes_problems_description"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <TextField
                                {...superpollito.input}
                                css={styles.textArea}
                                variant="standard"
                                color="secondary"
                                multiline
                                rows={2}
                                disabled={submitting}
                                onChange={onChangeDecorator(
                                  superpollito.input.onChange,
                                )}
                                error={Boolean(
                                  fuckErrors[superpollito.input.name],
                                )}
                                helperText={fuckErrors[superpollito.input.name]}
                              />
                            )}
                          />
                        </>
                      )}
                    </>
                  )}
                />
              </>
            )}
          </>
        )}
      />
    </Section>
  );
}
