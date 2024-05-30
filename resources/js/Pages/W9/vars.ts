import { format } from '@/src/lib/piwi/dateFnsFacade';

export const federalTaxClasifications = [
  'Individual/sole proprietor or single-member LLC',
  'C Corporation',
  'S Corporation',
  'Partnership',
  'Trust/estate',
  'Limited liability company',
  'Other',
] as const;
export const llcClasifications = {
  C: 'C corporation',
  S: 'S corporation',
  P: 'Partnership',
} as const;
export const paymentsMethods = ['Check', 'Direct Deposit', 'Payroll Card'];
export const ssnOrEIN = ['SSN', 'EIN'] as const;

export const initialState = {
  name: 'Krey Rico',
  business_name: 'Ricoco',
  federal_tax_classification: federalTaxClasifications[6],
  limited_liability_company_clasification: 'C',
  other_federal_classification: 'Supercow',
  exempt_payee_code: '100',
  exemption_from_fatca_reporting_code: '200',
  country: 'US',
  phone: '(+1) 414-6744444',
  address: 'El Amparo',
  unit_apt_suite: 'Casa 10',
  city_or_town: 'Valera',
  state: 'CA',
  zip: '31023',
  list_account_number: '100, 200, 300, 400',
  requesters_name: 'Jesus Daboin',
  requesters_address: 'Valencia Buena Aventura',
  ssn_or_ein: ssnOrEIN[0],
  ssn_ein: '534534534',
  bird_date: format(new Date()),
  payment_method: paymentsMethods[1],
  bank_name: 'Mercantil',
  routing: '123456789',
  account: '123456789012',
  email: 'kreyricodaboin.pp@gmail.com',
  sign_with_docusign: false,
};
