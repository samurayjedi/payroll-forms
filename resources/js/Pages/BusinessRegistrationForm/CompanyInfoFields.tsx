import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Grid, Box, TextField, InputAdornment } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SignpostIcon from '@mui/icons-material/Signpost';
import CropFreeIcon from '@mui/icons-material/CropFree';
import PhoneIcon from '@mui/icons-material/Phone';
import { useErrors } from '@/hooks';
import usStates from '@/src/states.json';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';
import Select from '@/src/lib/piwi/core/Select';
import SelectCountry from '@/src/lib/piwi/core/SelectCountry';
import TextFieldPhone from '@/src/lib/piwi/core/TextFieldPhone';
import Aggregator from '@/src/Components/Aggregator';
import {
  PaymentMethods,
  CompanyActivities,
  Packages,
  ProcessTimes,
  CompanyTypes,
  yesNo,
  Questions,
  Licenses,
} from './vars';

export default function CompanyInfoFields({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator, removeError] = useErrors();

  return (
    <Section title={t('Company info')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FieldArray
            name="company_name"
            subscription={{ value: true }}
            render={({ fields }) => (
              <Aggregator
                name={fields.name}
                value={fields.value}
                onAdd={(v) => {
                  fields.push(v);
                  removeError(fields.name);
                }}
                onRemove={(i) => {
                  fields.remove(i);
                  removeError(fields.name);
                }}
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
                error={Boolean(fuckErrors[fields.name])}
                helperText={fuckErrors[fields.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FieldArray
            name="company_dba"
            subscription={{ value: true }}
            render={({ fields }) => (
              <Aggregator
                name={fields.name}
                value={fields.value}
                onAdd={(v) => {
                  fields.push(v);
                  removeError(fields.name);
                }}
                onRemove={(i) => {
                  fields.remove(i);
                  removeError(fields.name);
                }}
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
                error={Boolean(fuckErrors[fields.name])}
                helperText={fuckErrors[fields.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="company_address"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Company Address')}
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
            name="company_state"
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
        <Grid item xs={12} md={6}>
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
        <Field
          name="company_country"
          subscription={{ value: true }}
          render={({ input }) => (
            <Grid item xs={12} md={6} container spacing={2}>
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
            </Grid>
          )}
        />
        <Grid item xs={6} md={6}>
          <Field
            name="company_county"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('County')}
                fullWidth
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceIcon />
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
        <Grid item xs={6} md={6}>
          <Field
            name="state_of_incorporation_or_formation"
            subscription={{ value: true }}
            render={({ input }) => (
              <Select
                {...input}
                items={usStates}
                label={t('State of incorporation or formation')}
                disabled={submitting}
                fullWidth
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Field
            name="company_activity"
            subscription={{ value: true }}
            render={({ input }) => (
              <>
                <Options
                  {...input}
                  type="radio"
                  label={t(
                    'Check one box that best describes the principal activity of your business',
                  )}
                  options={CompanyActivities}
                  disabled={submitting}
                  onChange={onChangeDecorator(input.onChange)}
                  error={Boolean(fuckErrors[input.name])}
                  helperText={fuckErrors[input.name]}
                />
                {input.value === 'Other' && (
                  <Field
                    name="company_activity_other"
                    subscription={{ value: true }}
                    render={(pollito) => (
                      <TextField
                        {...pollito.input}
                        label={t('Specify company activity')}
                        variant="standard"
                        disabled={submitting}
                        color="secondary"
                        onChange={onChangeDecorator(input.onChange)}
                        error={Boolean(fuckErrors[input.name])}
                        helperText={fuckErrors[input.name]}
                      />
                    )}
                  />
                )}
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Field
            name="company_type"
            subscription={{ value: true }}
            render={({ input }) => (
              <Options
                {...input}
                type="radio"
                label={t('Type of entity')}
                options={CompanyTypes}
                disabled={submitting}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              >
                {(radio) => (
                  <>
                    {radio === 'Corporation' &&
                      input.value === 'Corporation' && (
                        <Box sx={{ pl: 2, pb: 2 }}>
                          <Field
                            name="company_corporation_more_one_member"
                            subscription={{ value: true }}
                            render={(pollito) => (
                              <Options
                                {...pollito.input}
                                type="radio"
                                label={t(
                                  'Does the corporation have more than one member?',
                                )}
                                disabled={submitting}
                                options={yesNo}
                                sx={{ flexDirection: 'row' }}
                                onChange={onChangeDecorator(
                                  pollito.input.onChange,
                                )}
                                error={Boolean(fuckErrors[pollito.input.name])}
                                helperText={fuckErrors[pollito.input.name]}
                              />
                            )}
                          />
                        </Box>
                      )}
                    {radio === 'Partnership' &&
                      input.value === 'Partnership' && (
                        <Box sx={{ pl: 2, pb: 2 }}>
                          <Field
                            name="company_partnership_more_one_member"
                            subscription={{ value: true }}
                            render={(pollito) => (
                              <Options
                                {...pollito.input}
                                type="radio"
                                label={t(
                                  'Does the partnership have more than one member?',
                                )}
                                disabled={submitting}
                                options={yesNo}
                                sx={{ flexDirection: 'row' }}
                                onChange={onChangeDecorator(
                                  pollito.input.onChange,
                                )}
                                error={Boolean(fuckErrors[pollito.input.name])}
                                helperText={fuckErrors[pollito.input.name]}
                              />
                            )}
                          />
                        </Box>
                      )}
                    {radio === 'Limited Liability Company' &&
                      input.value === 'Limited Liability Company' && (
                        <Box sx={{ pl: 2, pb: 2 }}>
                          <Field
                            name="company_more_of_one_member"
                            subscription={{ value: true }}
                            render={(pollito) => (
                              <Options
                                {...pollito.input}
                                type="radio"
                                label={t(
                                  'Does the LLC have more than one member?',
                                )}
                                disabled={submitting}
                                options={yesNo}
                                sx={{ flexDirection: 'row' }}
                                onChange={onChangeDecorator(
                                  pollito.input.onChange,
                                )}
                                error={Boolean(fuckErrors[pollito.input.name])}
                                helperText={fuckErrors[pollito.input.name]}
                              />
                            )}
                          />
                        </Box>
                      )}
                    {radio === 'Other' && input.value === 'Other' && (
                      <Box sx={{ pb: 2 }}>
                        <Field
                          name="company_type_other"
                          subscription={{ value: true }}
                          render={(pollito) => (
                            <TextField
                              {...pollito}
                              label={t('Specify company type')}
                              variant="standard"
                              disabled={submitting}
                              color="secondary"
                              onChange={onChangeDecorator(
                                pollito.input.onChange,
                              )}
                              error={Boolean(fuckErrors[pollito.input.name])}
                              helperText={fuckErrors[pollito.input.name]}
                            />
                          )}
                        />
                      </Box>
                    )}
                  </>
                )}
              </Options>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ paddingBottom: 2 }}>
          <Grid container sx={{ mb: 1 }}>
            <Grid item>
              <Field
                name="package"
                subscription={{ value: true }}
                render={({ input }) => (
                  <Options
                    {...input}
                    type="radio"
                    label={t('Package')}
                    disabled={submitting}
                    options={Packages}
                    onChange={onChangeDecorator(input.onChange)}
                    error={Boolean(fuckErrors[input.name])}
                    helperText={fuckErrors[input.name]}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Field
                    name="process_time"
                    subscription={{ value: true }}
                    render={({ input }) => (
                      <Options
                        {...input}
                        type="radio"
                        label={t('Process Time')}
                        disabled={submitting}
                        options={ProcessTimes}
                        onChange={onChangeDecorator(input.onChange)}
                        error={Boolean(fuckErrors[input.name])}
                        helperText={fuckErrors[input.name]}
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <FieldArray
                    name="licenses"
                    subscription={{ value: true }}
                    render={({ fields }) => (
                      <Options
                        type="check"
                        name={fields.name}
                        value={fields.value}
                        label={t('Additional Licenses')}
                        options={Licenses}
                        disabled={submitting}
                        onChange={(ev) => {
                          removeError(fields.name);
                          const checked = _.get(
                            ev,
                            'target.checked',
                            false,
                          ) as boolean;
                          const value = _.get(ev, 'target.value', '') as string;
                          if (checked) {
                            fields.push(value);
                          } else {
                            fields.remove(fields.value.indexOf(value));
                          }
                        }}
                        error={Boolean(fuckErrors[fields.name])}
                        helperText={fuckErrors[fields.name]}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Field
            name="line_of_merchandise"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                variant="standard"
                label={t(
                  'Line of merchandise sold, construction work done, products produced, or services provided',
                )}
                fullWidth
                color="secondary"
                disabled={submitting}
                multiline
                rows={2}
                sx={{
                  mb: 2,
                }}
                onChange={onChangeDecorator(input.onChange)}
                error={Boolean(fuckErrors[input.name])}
                helperText={fuckErrors[input.name]}
              />
            )}
          />
          <FieldArray
            name="questions"
            subscription={{ value: true }}
            render={({ fields }) => (
              <Options
                type="check"
                name={fields.name}
                value={fields.value}
                label={t('Some questions about your commercial activity')}
                options={Questions}
                disabled={submitting}
                onChange={(ev) => {
                  removeError(fields.name);
                  const checked = _.get(ev, 'target.checked', false) as boolean;
                  const value = _.get(ev, 'target.value', '') as string;
                  if (checked) {
                    fields.push(value);
                  } else {
                    fields.remove(fields.value.indexOf(value));
                  }
                }}
                error={Boolean(fuckErrors[fields.name])}
                helperText={fuckErrors[fields.name]}
              >
                {(check) => {
                  if (check === Questions[1] && fields.value.includes(check)) {
                    return (
                      <Field
                        name="which_license"
                        subscription={{ value: true }}
                        render={(pollito) => (
                          <TextField
                            {...pollito.input}
                            label={t('Which?')}
                            variant="standard"
                            disabled={submitting}
                            color="secondary"
                            onChange={onChangeDecorator(pollito.input.onChange)}
                            error={Boolean(fuckErrors[pollito.input.name])}
                            helperText={fuckErrors[pollito.input.name]}
                          />
                        )}
                      />
                    );
                  }

                  if (check === Questions[2] && fields.value.includes(check)) {
                    return (
                      <Grid container spacing={2}>
                        <Grid item>
                          <Field
                            name="employees"
                            subscription={{ value: true }}
                            render={(pollito) => (
                              <TextField
                                {...pollito.input}
                                label={t('How many employees')}
                                variant="standard"
                                disabled={submitting}
                                color="secondary"
                                onChange={onChangeDecorator(
                                  pollito.input.onChange,
                                )}
                                error={Boolean(fuckErrors[pollito.input.name])}
                                helperText={fuckErrors[pollito.input.name]}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item>
                          <Field
                            name="payment_method"
                            subscription={{ value: true }}
                            render={(pollito) => (
                              <Options
                                {...pollito.input}
                                type="radio"
                                label={t('Do you plan to pay with')}
                                disabled={submitting}
                                options={PaymentMethods}
                                sx={{ flexFlow: 'row nowrap' }}
                                onChange={onChangeDecorator(
                                  pollito.input.onChange,
                                )}
                                error={Boolean(fuckErrors[pollito.input.name])}
                                helperText={fuckErrors[pollito.input.name]}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    );
                  }

                  return null;
                }}
              </Options>
            )}
          />
        </Grid>
      </Grid>
    </Section>
  );
}
