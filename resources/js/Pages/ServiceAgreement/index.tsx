import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import arrayMutators from 'final-form-arrays';
import { Container, Paper } from '@mui/material';
import AppLayout from '@/src/Layouts/AppLayout';
import DocusingForm from '@/src/Components/DocusignForm';
import Company from './Company';
import Payroll from './Payroll';
import Signature from './Signature';

export const CompanyTypes = [
  'Sole Proprietorship',
  'Corporation',
  'General Partnership',
  'Limited Partnership',
  'Non-Profit',
  'Limited Liability Company',
  'Other',
] as const;

export const Services = ['Payroll', 'Bookkeeping', 'Basic HR'] as const;

const initialState = {
  company_email: 'kreyricodaboin.pp@gmail.com',
  company_name: 'Ricoco',
  company_address_1: 'El Amparo',
  company_address_2: 'Casa 10',
  company_state: 'CA',
  company_city: 'Valera',
  company_dba: 'Ricoco DBA',
  company_zip: '31025',
  country: 'US',
  company_phone: '414-6744162',
  company_type: 'Other',
  company_type_other: 'Supercow',
  ein: '333333333',
  state_id: '1234567890',
  tin: '909876543',
  bank_name: 'Mercantil',
  routing: '564738291',
  account: '10502217402',
  customer_email: 'kreyricodaboin.pp@gmail.com',
  customer_name: 'Krey Rico',
  sales_rep_email: 'ultimateethelwolf@gmail.com',
  sales_rep_name: 'Jesus Daboin',
  services: [...Services],
  fee: '250',
  fee_date: '25',
  sign_with_docusign: false,
};

export default function ServiceAgreement() {
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
            onSubmit={(data) =>
              new Promise<void>((resolve) =>
                router.post(route('service-agreement'), data, {
                  onFinish: () => resolve(),
                }),
              )
            }
            render={({ /** pristine, */ submitting, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Company submitting={submitting} />
                <Payroll submitting={submitting} />
                <Signature submitting={submitting} />
              </form>
            )}
          />
        </Paper>
      </Container>
    </AppLayout>
  );
}
