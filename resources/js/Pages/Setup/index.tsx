import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';
import {
  Box,
  Button,
  Container,
  Paper,
  Alert,
  AlertTitle,
  Typography,
} from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import { useErrors } from '@/hooks';
import AppLayout from '@/src/Layouts/AppLayout';
import SectionCompanySetup from './SectionCompanySetup';
import SectionPayrollSetup from './SectionPayrollSetup';
import SectionPreviousPayroll from './SectionPreviousPayroll';
import SectionSalesTax from './SectionSalesTax';
import SectionTaxes from './SectionTaxes';
import SectionFinal from './SectionFinal';
import * as styles from './styles';

export default function Contact() {
  const { t } = useTranslation();
  const [fuckErrors] = useErrors();

  const goToField = (fieldName: string) => () => {
    const fields = document.getElementsByName(fieldName);

    if (fields && fields[0]) {
      const field = fields[0];

      if (field.getAttribute('type') === 'file') {
        if (field.parentElement) {
          field.parentElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        field.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Paper>
          {Object.keys(fuckErrors).length && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <AlertTitle>{t('Error')}</AlertTitle>
              {_.map(fuckErrors, (msg, field) => (
                <Typography key={field} variant="subtitle2">
                  {msg}
                  <Button
                    type="button"
                    variant="text"
                    onClick={goToField(field)}
                  >
                    {t('Go')}
                  </Button>
                </Typography>
              ))}
            </Alert>
          )}
          <Form
            mutators={{
              ...arrayMutators,
            }}
            subscription={{ submitting: true, pristine: true }}
            onSubmit={() => console.log('holaaa')}
            render={({ /** pristine, */ submitting, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <SectionCompanySetup submitting={submitting} />
                <SectionPayrollSetup submitting={submitting} />
                <SectionPreviousPayroll submitting={submitting} />
                <SectionSalesTax submitting={submitting} />
                <SectionTaxes submitting={submitting} />
                <SectionFinal submitting={submitting} />
                <Box sx={{ p: 2 }} />
                <div css={styles.submit}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    startIcon={<MemoryIcon />}
                    disabled={submitting}
                  >
                    {t('Process')}
                  </Button>
                </div>
              </form>
            )}
          />
        </Paper>
      </Container>
    </AppLayout>
  );
}
