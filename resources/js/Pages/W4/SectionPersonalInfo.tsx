import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import {
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CropFreeIcon from '@mui/icons-material/CropFree';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import { useErrors } from '@/hooks';
import usStates from '@/src/states.json';
import Section from '@/src/Components/Section';
import Select from '@/src/lib/piwi/core/Select';
import SelectCountry from '@/src/lib/piwi/core/SelectCountry';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';
import TextFieldPhone from '@/src/lib/piwi/core/TextFieldPhone';
import Options from '@/src/lib/piwi/core/Options';
import DatePicker from '@/src/lib/piwi/core/DatePicker';
import { civilStates } from './vars';

export default function SectionPersonalInfo({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Personal Info.')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="first_name_and_middle_initial"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('First name and middle initial')}
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
            name="last_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Last name')}
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
          <FormControl color="secondary" fullWidth>
            <InputLabel
              id="personal-info-select-state"
              sx={{ pl: 1, pr: 1, backgroundColor: 'white' }}
            >
              {}
            </InputLabel>
            <Field
              name="state"
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
          </FormControl>
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
        <Grid item xs={12} md={6}>
          <Field
            name="social_security_number"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                mask="#########"
                definitions={{
                  '#': /[0-9]/,
                }}
                label={t('Social security number')}
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
        <Grid item xs={12} md={6}>
          <Field
            name="email"
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
        <Field
          name="country"
          subscription={{ value: true }}
          render={({ input }) => (
            <Grid item xs={12} md={8} container spacing={2}>
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
                  name="phone"
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
        <Grid item xs={12} md={4}>
          <Field
            name="bird_date"
            subscription={{ value: true }}
            render={({ input }) => (
              <DatePicker
                {...input}
                color="secondary"
                label={t('Bird Date')}
                fullWidth
                disabled={submitting}
                disableFuture
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="civil_state"
            subscription={{ value: true }}
            render={({ input }) => (
              <Options
                {...input}
                type="radio"
                label={t('Civil state')}
                disabled={submitting}
                options={civilStates}
                sx={{ flexDirection: { md: 'row' } }}
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
