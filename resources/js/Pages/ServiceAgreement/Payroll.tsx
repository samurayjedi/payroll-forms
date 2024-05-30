import _ from 'lodash';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { useErrors } from '@/hooks';
import Section from '@/src/Components/Section';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';
import TextFieldCurrency from '@/src/lib/piwi/core/TextFieldCurrency';
import Options from '@/src/lib/piwi/core/Options';
import { CompanyTypes, Services } from '.';

export default function Payroll({ submitting }: { submitting: boolean }) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator, removeError] = useErrors();

  return (
    <Section title={t('Payroll Information')}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Field
            name="state_id"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                mask="##########"
                definitions={{
                  '#': /[0-9]/,
                }}
                label={t('State ID (EAN)')}
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
            name="tin"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                mask="9########"
                definitions={{
                  '#': /[0-9]/,
                }}
                label={t('TIN')}
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
            name="bank_name"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextField
                {...input}
                label={t('Bank/Financial Institution')}
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
            name="routing"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                mask="#########"
                definitions={{
                  '#': /[0-9]/,
                }}
                label={t('ABA Routing Number')}
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
            name="account"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                mask="############"
                definitions={{
                  '#': /[0-9]/,
                }}
                label={t('Account Number')}
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
            name="ein"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                mask="#########"
                definitions={{
                  '#': /[0-9]/,
                }}
                label={t('Federal Employer ID (EIN)')}
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
        <Grid item xs={6} md={3}>
          <Field
            name="fee"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldCurrency
                {...input}
                label={t('Fee')}
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
        <Grid item xs={6} md={3}>
          <Field
            name="fee_date"
            subscription={{ value: true }}
            render={({ input }) => (
              <TextFieldMasked
                {...input}
                mask="##"
                definitions={{
                  '#': /[0-9]/,
                }}
                label={t('Concurring fee date')}
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
        <Grid item xs={6} md={2}>
          <FieldArray
            name="services"
            subscription={{ value: true }}
            render={({ fields }) => (
              <Options
                type="check"
                name={fields.name}
                value={fields.value}
                label={t('Services')}
                options={Services}
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
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <Field
            name="company_type"
            subscription={{ value: true }}
            render={({ input }) => (
              <>
                <Options
                  {...input}
                  type="radio"
                  label={t('Type of entity')}
                  disabled={submitting}
                  options={CompanyTypes}
                  sx={{ flexDirection: 'row' }}
                  onChange={onChangeDecorator(input.onChange)}
                  error={Boolean(fuckErrors[input.name])}
                  helperText={fuckErrors[input.name]}
                />
                {input.value === 'Other' && (
                  <Field
                    name="company_type_other"
                    subscription={{ value: true }}
                    render={(pollito) => (
                      <TextField
                        {...pollito.input}
                        label={t('Specify company type')}
                        variant="standard"
                        disabled={submitting}
                        color="secondary"
                        fullWidth
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                    )}
                  />
                )}
              </>
            )}
          />
        </Grid>
      </Grid>
    </Section>
  );
}
