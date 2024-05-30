import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Box, FormControlLabel, Checkbox } from '@mui/material';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import { jobsQuantity } from './vars';

export default function SectionMultipleJobs({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Multiple Jobs or Spouse Works.')}>
      <Field
        name="multiple_jobs"
        subscription={{ value: true }}
        render={({ input }) => (
          <>
            <Options
              {...input}
              type="radio"
              label={t('Do you have multiple jobs?')}
              name="multiple_jobs"
              disabled={submitting}
              options={jobsQuantity}
              sx={{ flexDirection: { md: 'row' } }}
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
            {input.value === jobsQuantity[1] && (
              <>
                <Box sx={{ p: 1 }} />
                <Field
                  name="two_jobs_with_similar_pay"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <FormControlLabel
                      {...pollito.input}
                      label={t(
                        'If there are only two jobs total, you may check this box. This option is accurate for jobs with similar pay; otherwise, more tax than necessary may be withheld.',
                      )}
                      control={<Checkbox color="secondary" />}
                      checked={pollito.input.values}
                      disabled={submitting}
                    />
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
