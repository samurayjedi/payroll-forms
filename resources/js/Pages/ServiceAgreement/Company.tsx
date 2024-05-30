import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import {
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Phone as PhoneIcon,
  LocationCity as LocationCityIcon,
  CropFree as CropFreeIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import SelectCountry from '@/src/lib/piwi/core/SelectCountry';
import TextFieldPhone from '@/src/lib/piwi/core/TextFieldPhone';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';

export default function Company({ submitting }: { submitting: boolean }) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Company info')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="company_email"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Email')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
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
        <Grid item xs={12} md={6}>
          <Field
            name="company_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t("Company's Legal name")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
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
            name="company_dba"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Company DBA (Doing Business As)')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceWalletIcon />
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
                  <SelectCountry
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
                    name="company_phone"
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
        <Grid item xs={12} md={6}>
          <FormControl color="secondary" fullWidth>
            <InputLabel
              id="company-select-state"
              sx={{ pl: 1, pr: 1, backgroundColor: 'white' }}
            >
              {t('State')}
            </InputLabel>
            <Field
              name="company_state"
              subscription={{ value: true }}
              render={({ input }) => (
                <>
                  <Select
                    {...input}
                    labelId="company-select-state"
                    disabled={submitting}
                    onChange={onChangeDecorator(input.onChange)}
                    error={Boolean(fuckErrors[input.name])}
                  >
                    <MenuItem value="MT">{t('Montana')}</MenuItem>
                    <MenuItem value="CA">{t('California')}</MenuItem>
                    <MenuItem value="CO">{t('Colorado')}</MenuItem>
                  </Select>
                  {Boolean(fuckErrors[input.name]) && (
                    <FormHelperText error={Boolean(fuckErrors[input.name])}>
                      {fuckErrors[input.name]}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <Field
            name="company_city"
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
        <Grid item xs={6} md={3}>
          <Field
            name="company_zip"
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
        <Grid item xs={12} md={8}>
          <Field
            name="company_address_1"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Street Address')}
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
        <Grid item xs={12} md={4}>
          <Field
            name="company_address_2"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Unit/Apt/Suite')}
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
      </Grid>
    </Section>
  );
}
