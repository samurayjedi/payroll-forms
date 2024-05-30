import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Form, FormProps, Field } from 'react-final-form';
import { FormControlLabel, Button, Checkbox } from '@mui/material';
import { Memory as MemoryIcon } from '@mui/icons-material';

export default function DocusingForm({
  children,
  render,
  ...props
}: FormProps) {
  const { t } = useTranslation();

  return (
    <Form
      {...props}
      render={(piwi) => (
        <>
          {render ? render(piwi) : children}
          <SubmitArea>
            <Field
              name="sign_with_docusign"
              subscription={{ value: true }}
              render={(pollito) => (
                <FormControlLabel
                  {...pollito.input}
                  label={t('Sign with docusign?')}
                  control={<Checkbox color="secondary" />}
                  checked={pollito.input.values}
                  disabled={piwi.submitting}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<MemoryIcon />}
              disabled={piwi.submitting}
              onClick={piwi.form.submit}
            >
              {t('Process')}
            </Button>
          </SubmitArea>
        </>
      )}
    />
  );
}

const SubmitArea = styled.div(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  justifyContent: 'flex-end',
}));
