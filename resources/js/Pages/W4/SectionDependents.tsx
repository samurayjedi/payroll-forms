import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Typography, Box, TextField } from '@mui/material';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import { yesNo } from './vars';
import * as styles from './styles';

export default function SectionMultipleJobs({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Claim Dependents.')}>
      <Field
        name="have_dependents"
        subscription={{ value: true }}
        render={({ input }) => (
          <>
            <Options
              {...input}
              type="radio"
              label={t('Do you have dependents?')}
              name="have_dependents"
              disabled={submitting}
              options={yesNo}
              sx={{ flexDirection: { md: 'row' } }}
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
            {input.value === yesNo[1] && (
              <>
                <Box sx={{ p: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  {t('Specify the number of dependents')}
                </Typography>
                <div css={styles.dependents}>
                  <Field
                    name="number_of_children"
                    subscription={{ value: true }}
                    render={(pollito) => (
                      <TextField
                        {...pollito.input}
                        label={t('Number of qualifying children under age 17')}
                        variant="standard"
                        color="secondary"
                        sx={{ minWidth: '326px' }}
                        disabled={submitting}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                    )}
                  />

                  <span>{t('and')}</span>
                  <Field
                    name="number_of_other_dependents"
                    subscription={{ value: true }}
                    render={(pollito) => (
                      <TextField
                        {...pollito.input}
                        label={t('Other dependents')}
                        variant="standard"
                        color="secondary"
                        disabled={submitting}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                    )}
                  />
                </div>
              </>
            )}
          </>
        )}
      />
    </Section>
  );
}
