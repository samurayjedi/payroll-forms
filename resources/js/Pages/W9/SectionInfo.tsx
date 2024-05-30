import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Grid, InputAdornment, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DataArrayIcon from '@mui/icons-material/DataArray';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CropFreeIcon from '@mui/icons-material/CropFree';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import SelectCountries from '@/src/lib/piwi/core/SelectCountry';
import TextFieldPhone from '@/src/lib/piwi/core/TextFieldPhone';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';
import Select from '@/src/lib/piwi/core/Select';
import usStates from '@/src/states.json';
import * as styles from './styles';
import { federalTaxClasifications, llcClasifications } from './vars';

export default function SectionInfo({ submitting }: { submitting: boolean }) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Basic Info.')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Name (as shown on your income tax return).')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="business_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t(
                  'Business name/disregarded entity name, if different from above.',
                )}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="federal_tax_classification"
            subscription={{ value: true }}
            render={({ input }) => (
              <Options
                {...input}
                type="radio"
                css={styles.taxClasificationsRadios}
                label={t(
                  'Check appropriate box for federal tax classification of the person whose name is entered.',
                )}
                disabled={submitting}
                options={federalTaxClasifications}
                sx={{ flexDirection: { md: 'row' } }}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              >
                {(current) => {
                  switch (current) {
                    case federalTaxClasifications[5]:
                      if (input.value === federalTaxClasifications[5]) {
                        return (
                          <Field
                            name="limited_liability_company_clasification"
                            subscription={{ value: true }}
                            render={(pollito) => (
                              <Select
                                {...pollito.input}
                                label={t('LLC Type')}
                                items={llcClasifications}
                                disabled={submitting}
                                sx={{ mr: 2, width: 120 }}
                                error={Boolean(fuckErrors[input.name])}
                                helperText={fuckErrors[input.name]}
                              />
                            )}
                          />
                        );
                      }
                      break;
                    case federalTaxClasifications[6]:
                      if (input.value === federalTaxClasifications[6]) {
                        return (
                          <Field
                            name="other_federal_classification"
                            subscription={{ value: true }}
                            render={(pollito) => (
                              <TextField
                                {...pollito.input}
                                variant="standard"
                                label={t('Specify')}
                                color="secondary"
                                disabled={submitting}
                                onChange={onChangeDecorator(
                                  pollito.input.onChange,
                                )}
                                error={Boolean(fuckErrors[pollito.input.name])}
                                helperText={fuckErrors[pollito.input.name]}
                              />
                            )}
                          />
                        );
                      }
                      break;
                  }

                  return null;
                }}
              </Options>
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Field
            name="exempt_payee_code"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Exempt payee code (if any).')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DataObjectIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Field
            name="exemption_from_fatca_reporting_code"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Exemption from FATCA reporting code (if any).')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DataArrayIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                color="secondary"
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} container spacing={2}>
          <Field
            name="country"
            subscription={{ value: true }}
            render={({ input }) => (
              <>
                <Grid item xs={4}>
                  <SelectCountries
                    name={input.name}
                    value={input.value}
                    hideName
                    textFieldProps={{
                      label: t('Choose a country'),
                      color: 'secondary',
                    }}
                    disabled={submitting}
                    onChange={onChangeDecorator(input.onChange)}
                    error={Boolean(fuckErrors[input.name])}
                    helperText={fuckErrors[input.name]}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Field
                    name="phone"
                    subscription={{ value: true }}
                    render={(pollito) => (
                      <TextFieldPhone
                        {...pollito.input}
                        label={t('Phone')}
                        fullWidth
                        color="secondary"
                        InputProps={{
                          inputProps: {
                            code: input.value,
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                        disabled={submitting}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Field
            name="address"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Street Address')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Field
            name="unit_apt_suite"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Unit/Apt/Suite')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MyLocationIcon />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Field
            name="city_or_town"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('City/Town')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityIcon />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Field
            name="state"
            subscription={{ value: true }}
            render={({ input }) => (
              <Select
                {...input}
                label={t('State')}
                disabled={submitting}
                items={usStates}
                fullWidth
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Field
            name="zip"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                mask="#####"
                definitions={{
                  '#': /[0-9]/,
                }}
                label={t('Zip')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CropFreeIcon />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="list_account_number"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('List account number(s) here (optional)')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FormatListNumberedIcon />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Field
            name="requesters_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Requester’s name (optional)')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Field
            name="requesters_address"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Requester’s address (optional)')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
      </Grid>
    </Section>
  );
}
