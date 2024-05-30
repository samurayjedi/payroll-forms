import { useTranslation } from 'react-i18next';
import arrayMutators from 'final-form-arrays';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import { Form, Field } from 'react-final-form';
import {
  Container,
  Paper,
  Button,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Memory as MemoryIcon } from '@mui/icons-material';
import { useErrors } from '@/hooks';
import AppLayout from '@/src/Layouts/AppLayout';
import CompanyInfoFields from './CompanyInfoFields';
import OwnerFields from './OwnerFields';
import LLCMembers from './LLCMembers';
import { initialState } from './vars';

export default function BusinessRegistrationForm() {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Paper>
          <Form
            initialValues={initialState}
            mutators={{
              ...arrayMutators,
            }}
            subscription={{ submitting: true, pristine: true }}
            onSubmit={(data) =>
              new Promise<void>((resolve) =>
                router.post(route('business-registration-form'), data, {
                  onFinish: () => resolve(),
                }),
              )
            }
            render={({ /** pristine, */ submitting, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <OwnerFields submitting={submitting} />
                <CompanyInfoFields submitting={submitting} />
                <LLCMembers submitting={submitting} />
                <Box
                  sx={{
                    p: 4,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Field
                    name="sign_with_docusign"
                    subscription={{ value: true }}
                    render={({ input }) => (
                      <FormControlLabel
                        {...input}
                        label={t('Sign with docusign?')}
                        control={<Checkbox color="secondary" />}
                        checked={input.value}
                        disabled={submitting}
                      />
                    )}
                  />
                  <Field
                    name="completed_by"
                    subscription={{ value: true }}
                    render={({ input }) => (
                      <TextField
                        {...input}
                        label={t('Completed by')}
                        variant="standard"
                        disabled={submitting}
                        color="secondary"
                        onChange={onChangeDecorator(input.onChange)}
                        error={Boolean(fuckErrors[input.name])}
                        helperText={fuckErrors[input.name]}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    startIcon={<MemoryIcon />}
                    disabled={submitting}
                  >
                    {t('Process')}
                  </Button>
                </Box>
              </form>
            )}
          />
        </Paper>
      </Container>
    </AppLayout>
  );
}
