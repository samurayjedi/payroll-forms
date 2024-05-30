export const PaymentMethods = ['W2 form', '1099 form'] as const;
export const CompanyTypes = [
  'Sole Proprietorship',
  'Corporation',
  'Partnership',
  'Non-Profit',
  'Limited Liability Company',
  'Other',
] as const;
export const Packages = ['Basic', 'Corporate'] as const;
export const ProcessTimes = ['Normal', '24 hours'] as const;
export const CompanyActivities = [
  'Construction',
  'Retail',
  'Rental & leasing',
  'Cleaning services',
  'Transportation',
  'Restaurant or food service',
  'Wholesale',
  'Other',
] as const;
export const Questions = [
  'Does the company sale any products online or retail?',
  'Does the company need a especial license?',
  'Do you have or plan to have any employee?',
] as const;
export const Licenses = ['Wholesale License', 'City License'] as const;
export const yesNo = ['No', 'Yes'] as const;

export const memberInitialState = {
  name: '',
  ssn_tin_or_ein: '',
};
/* const initialState = {
    company_corporation_members: [{ ...memberInitialState }],
    company_partnership_members: [{ ...memberInitialState }],
    company_llc_members: [{ ...memberInitialState }],
  }; */
export const initialState = {
  // owner
  owner_email: 'kreyricodaboin.pp@gmail.com',
  owner_name: 'Krey Rico',
  owner_address: 'El Amparo casa 10',
  owner_state: 'CO',
  owner_city: 'Valera',
  owner_zip: '31023',
  owner_country: 'US',
  owner_phone: '2440943',
  // company
  company_name: ['Ricoco', 'SuperRicoco'],
  company_address: 'Buenaventura',
  company_state: 'IN',
  company_city: 'Valencia',
  company_zip: '21345',
  company_dba: ['Ricoco DBA', 'SuperRicoco DBA'],
  company_country: 'US',
  company_phone: '2444881',
  company_type: 'Limited Liability Company',
  company_corporation_more_one_member: yesNo[1],
  company_corporation_members: [
    {
      name: 'ayaka',
      ssn_tin_or_ein: '0000000',
    },
    {
      name: 'hu tao',
      ssn_tin_or_ein: '0000111',
    },
    {
      name: 'shogun',
      ssn_tin_or_ein: '0011223',
    },
  ],
  company_partnership_more_one_member: yesNo[1],
  company_partnership_members: [
    {
      name: 'emilia',
      ssn_tin_or_ein: '1234567',
    },
    {
      name: 'kokomi',
      ssn_tin_or_ein: '22222222',
    },
    {
      name: 'teruhashi',
      ssn_tin_or_ein: '11111111',
    },
  ],
  company_more_of_one_member: yesNo[1],
  company_llc_members: [
    {
      name: 'superpollito',
      ssn_tin_or_ein: '1234567',
    },
    {
      name: 'supervaca',
      ssn_tin_or_ein: '22222222',
    },
  ],
  company_type_other: 'Vaca company',
  company_county: 'Carabobo',
  payment_method: 'W2 form',
  questions: [...Questions],
  company_activity: 'Other',
  company_activity_other: 'Pollito activity',
  employees: 32,
  ssn_tin_or_ein: '123456789',
  package: 'Basic',
  process_time: 'Normal',
  line_of_merchandise: 'No se',
  licenses: [...Licenses],
  state_of_incorporation_or_formation: 'CA',
  which_license: 'Licor',
  completed_by: 'samurayjedi',
  sign_with_docusign: false,
};
