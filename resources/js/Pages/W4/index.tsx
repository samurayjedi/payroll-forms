import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Container, Paper } from '@mui/material';
import AppLayout from '@/src/Layouts/AppLayout';
import DocusignForm from '@/src/Components/DocusignForm';
import { initialState } from './vars';
import SectionPersonalInfo from './SectionPersonalInfo';
import SectionWorkInfo from './SectionWorkInfo';
import SectionAccountInfo from './SectionAccountInfo';
import SectionMultipleJobs from './SectionMultipleJobs';
import SectionDependents from './SectionDependents';
import SectionOtherAdjustments from './SectionOtherAdjustments';

export default function ServiceAgreement() {
  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Paper>
          <DocusignForm
            initialValues={initialState}
            subscription={{ submitting: true, pristine: true }}
            onSubmit={(data) =>
              new Promise<void>((resolve) =>
                router.post(route('w4'), data, {
                  onFinish: () => resolve(),
                }),
              )
            }
            render={({ /** pristine, */ submitting, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <SectionPersonalInfo submitting={submitting} />
                <SectionWorkInfo submitting={submitting} />
                <SectionAccountInfo submitting={submitting} />
                <SectionMultipleJobs submitting={submitting} />
                <SectionDependents submitting={submitting} />
                <SectionOtherAdjustments submitting={submitting} />
              </form>
            )}
          />
        </Paper>
      </Container>
    </AppLayout>
  );
}
