import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CropFreeIcon from '@mui/icons-material/CropFree';
import SignpostIcon from '@mui/icons-material/Signpost';
import PhoneIcon from '@mui/icons-material/Phone';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import { useErrors } from '@/hooks';
import usStates from '@/src/states.json';
import Section from '@/src/Components/Section';
import SelectCountry from '@/src/lib/piwi/core/SelectCountry';
import TextFieldPhone from '@/src/lib/piwi/core/TextFieldPhone';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';
import Select from '@/src/lib/piwi/core/Select';

export default function OwnerFields({ submitting }: { submitting: boolean }) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Owner info')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="owner_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Owner name')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
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
            name="ssn_tin_or_ein"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                mask="#########"
                definitions={{
                  '#': /[0-9]/,
                }}
                label={t('SSN, ITIN or EIN')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Grid3x3Icon />
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
            name="owner_address"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Street Address')}
                fullWidth
                color="secondary"
                disabled={submitting}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SignpostIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Field
            name="owner_city"
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
            name="owner_state"
            subscription={{ value: true }}
            render={({ input }) => (
              <Select
                {...input}
                items={usStates}
                label={t('State')}
                disabled={submitting}
                fullWidth
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Field
            name="owner_zip"
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
        <Field
          name="owner_country"
          subscription={{ value: true }}
          render={({ input }) => (
            <Grid item xs={12} md={6} container spacing={2}>
              <Grid item xs={4}>
                <SelectCountry
                  name={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  hideName
                  textFieldProps={{
                    label: t('Choose a country'),
                    color: 'secondary',
                  }}
                  disabled={submitting}
                  error={Boolean(fuckErrors[input.name])}
                  helperText={fuckErrors[input.name]}
                />
              </Grid>
              <Grid item xs={8}>
                <Field
                  name="owner_phone"
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
            </Grid>
          )}
        />
        <Grid item xs={12} md={6}>
          <Field
            name="owner_email"
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
      </Grid>
    </Section>
  );
}
