import arrayMutators from 'final-form-arrays';
import { Container, Paper } from '@mui/material';
import { useSubmitHandler } from '@/hooks';
import AppLayout from '@/src/Layouts/AppLayout';
import DocusingForm from '@/src/Components/DocusignForm';
import SectionInfo from './SectionInfo';
import SectionTaxpayerIdentification from './SectionTaxpayerIdentification';
import SectionCertification from './SectionCertification';
import { initialState } from './vars';

export default function Contact() {
  const onSubmit = useSubmitHandler('w9');

  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Paper>
          <DocusingForm
            initialValues={initialState}
            mutators={{
              ...arrayMutators,
            }}
            subscription={{ submitting: true, pristine: true }}
            onSubmit={onSubmit}
            render={({ /** pristine, */ submitting, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <SectionInfo submitting={submitting} />
                <SectionTaxpayerIdentification submitting={submitting} />
                <SectionCertification submitting={submitting} />
              </form>
            )}
          />
        </Paper>
      </Container>
    </AppLayout>
  );
}
