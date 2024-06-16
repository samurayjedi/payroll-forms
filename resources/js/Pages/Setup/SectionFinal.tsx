import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Box, Typography, TextField } from '@mui/material';
import { useErrors } from '@/hooks';
import InputFile from '@/src/lib/piwi/core/InputFile';
import Section from '@/src/Components/Section';
import * as styles from './styles';

export default function SectionFinal({ submitting }: { submitting: boolean }) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title="Final step">
      <div className="input-file-field">
        <Typography variant="subtitle1" gutterBottom>
          {t('Please upload any additional requisite (w2, 1099, etc)')}
        </Typography>
        <Field
          name="additional_requisites_file"
          subscription={{ value: true }}
          render={({ input }) => (
            <InputFile
              {...input}
              multiple
              accept="application/pdf, image/png, image/gif, image/jpeg"
              disabled={submitting}
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
          )}
        />
      </div>
      <Box sx={{ p: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        {t('Sales rep. notes')}
      </Typography>
      <Field
        name="sales_rep_note"
        subscription={{ value: true }}
        render={({ input }) => (
          <TextField
            {...input}
            css={styles.textArea}
            variant="standard"
            color="secondary"
            multiline
            rows={2}
            disabled={submitting}
            onChange={onChangeDecorator(input.onChange)}
            error={Boolean(fuckErrors[input.name])}
            helperText={fuckErrors[input.name]}
          />
        )}
      />
    </Section>
  );
}
