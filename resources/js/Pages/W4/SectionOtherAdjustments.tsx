import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Typography, Grid, Tooltip, IconButton } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import TextFieldCurrency from '@/src/lib/piwi/core/TextFieldCurrency';

export default function SectionOtherAdjustments({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Other Adjustments.')}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            {t('Other income (not from jobs)')}
          </Typography>
          <Field
            name="other_income"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldCurrency
                {...input}
                variant="standard"
                color="secondary"
                disabled={submitting}
                InputProps={{
                  endAdornment: (
                    <Tooltip
                      title={t(
                        'Enter any additional tax you want withheld each pay period.',
                      )}
                    >
                      <IconButton>
                        <QuestionMarkIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            {t('Deductions')}
          </Typography>
          <Field
            name="deductions"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldCurrency
                {...input}
                variant="standard"
                color="secondary"
                disabled={submitting}
                InputProps={{
                  endAdornment: (
                    <Tooltip
                      title={t(
                        'If you expect to claim deductions other than the standard deduction and want to reduce your withholding, use the Deductions Worksheet on page 3 of the W4 document and enter the result here.',
                      )}
                    >
                      <IconButton>
                        <QuestionMarkIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            {t('Extra withholding')}
          </Typography>
          <Field
            name="extra_withholding"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldCurrency
                {...input}
                variant="standard"
                color="secondary"
                disabled={submitting}
                InputProps={{
                  endAdornment: (
                    <Tooltip
                      title={t(
                        'If you want tax withheld for other income you expect this year that won’t have withholding, enter the amount of other income here. This may include interest, dividends, and retirement income.',
                      )}
                    >
                      <IconButton>
                        <QuestionMarkIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
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
