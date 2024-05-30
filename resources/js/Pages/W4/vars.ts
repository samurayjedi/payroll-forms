import { format } from '@/src/lib/piwi/dateFnsFacade';

export const paymentsMethods = [
  'Check',
  'Direct Deposit',
  'Payroll Card',
] as const;

export const yesNo = ['No', 'Yes'] as const;

export const jobsQuantity = ['No', 'Two', 'More'] as const;

export const civilStates = [
  'Single or Married filing separately',
  'Married filing jointly or Qualifying widow(er)',
  'Head of household',
] as const;

export const initialState = {
  first_name_and_middle_initial: 'Krey J.',
  last_name: 'Rico',
  address: 'El Amparo',
  unit_apt_suite: 'Casa 10',
  city_or_town: 'Valera',
  state: 'CA',
  zip: '31023',
  civil_state: civilStates[0],
  social_security_number: '843342343',
  email: 'kreyricodaboin.pp@gmail.com',
  country: 'US',
  phone: '4433422424',
  bird_date: format(new Date()),
  multiple_jobs: jobsQuantity[1],
  two_jobs_with_similar_pay: false,
  have_dependents: yesNo[1],
  number_of_children: '3',
  number_of_other_dependents: '5',
  payment_method: paymentsMethods[1],
  bank_name: 'Mercantil',
  routing: '123456789',
  account: '123456789012',
  other_income: '100',
  deductions: '200',
  extra_withholding: '300',
  sign_with_docusign: false,
  job_position: 'Programmer',
  company_name: 'Ricoco',
  hired_date: format(new Date()),
  rate_of_pay: '100',
  manager_email: 'ultimateethelwolf@gmail.com',
  manager_full_name: 'Rico Krey',
};
