import { useTranslation } from 'react-i18next';
import { add } from 'date-fns';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Box, Typography } from '@mui/material';
import {
  useErrors,
  useRffAggregatorOnChange,
  useRffCheckOnChange,
} from '@/hooks';
import { parse } from '@/src/lib/piwi/dateFnsFacade';
import days from '@/assets/days.json';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';
import DatePicker from '@/src/lib/piwi/core/DatePicker';
import Aggregator from '@/src/Components/Aggregator';
import Select from '@/src/lib/piwi/core/Select';
import {
  payrollFrequencies,
  kindOfPayments,
  reportMethods,
  pickupMethods,
  reportsDeliveryMethod,
  taxImpoundIntervals,
  yesNo,
  kindOfDocuments,
} from './vars';
import * as styles from './styles';

export default function SectionPayrollSetup({
  processing,
}: {
  processing: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator, removeError] = useErrors();
  const aggregatorOnChange = useRffAggregatorOnChange();
  const checksOnChange = useRffCheckOnChange();

  return (
    <Section title={t('Payroll Setup')}>
      <Field
        name="want_payroll"
        subscription={{ value: true }}
        render={({ input }) => (
          <>
            <Options
              {...input}
              type="radio"
              css={styles.radios}
              label={`1 - ${t('Are you interested in the payroll service?')}`}
              disabled={processing}
              options={yesNo}
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
            {input.value === 'Yes' && (
              <>
                <Box sx={{ p: 2 }} />
                <Field
                  name="kind_of_document"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <Options
                      {...pollito.input}
                      type="radio"
                      css={styles.radios}
                      label={`2 - ${t(
                        'What type of payment does your company use?',
                      )}`}
                      options={kindOfDocuments}
                      disabled={processing}
                      onChange={onChangeDecorator(pollito.input.onChange)}
                      error={Boolean(fuckErrors[pollito.input.name])}
                      helperText={fuckErrors[pollito.input.name]}
                    />
                  )}
                />
                <Box sx={{ p: 2 }} />
                <FieldArray
                  name="payroll_frequencies"
                  subscription={{ value: true }}
                  render={({ fields }) => (
                    <Options
                      css={styles.checkboxes}
                      type="check"
                      name={fields.name}
                      value={fields.value}
                      label={`3 - ${t(
                        'What is the frequency of your payroll?',
                      )}`}
                      options={payrollFrequencies}
                      disabled={processing}
                      onChange={checksOnChange(fields)}
                      error={Boolean(fuckErrors[fields.name])}
                      helperText={fuckErrors[fields.name]}
                    />
                  )}
                />
                <Box sx={{ p: 2 }} />
                <FieldArray
                  name="report_methods"
                  subscription={{ value: true }}
                  render={({ fields }) => (
                    <Options
                      css={styles.checkboxes}
                      type="check"
                      name={fields.name}
                      value={fields.value}
                      label={`4 -${t(
                        'Check the reporting methods you prefer?',
                      )}`}
                      options={reportMethods}
                      disabled={processing}
                      onChange={checksOnChange(fields)}
                      error={Boolean(fuckErrors[fields.name])}
                      helperText={fuckErrors[fields.name]}
                    />
                  )}
                />
                <Box sx={{ p: 2 }} />
                <FieldArray
                  name="kind_of_payments"
                  subscription={{ value: true }}
                  render={({ fields }) => (
                    <Options
                      css={styles.checkboxes}
                      type="check"
                      name={fields.name}
                      value={fields.value}
                      label={`5 - ${t(
                        'How do you want to pay your employees?',
                      )}`}
                      options={kindOfPayments}
                      disabled={processing}
                      onChange={checksOnChange(fields)}
                      error={Boolean(fuckErrors[fields.name])}
                      helperText={fuckErrors[fields.name]}
                    />
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <span>6 -&nbsp;</span>
                  {t('Date to issue the first check?')}
                </Typography>
                <Field
                  name="first_check_date"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <DatePicker
                      {...pollito.input}
                      disablePast
                      color="secondary"
                      variant="standard"
                      disabled={processing}
                      onChange={onChangeDecorator(pollito.input.onChange)}
                      error={Boolean(fuckErrors[pollito.input.name])}
                      helperText={fuckErrors[pollito.input.name]}
                    />
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <span>7 -&nbsp;</span>
                  {t('What is the payment period of your company?')}
                </Typography>
                <div className="date_period" css={styles.period}>
                  <Field
                    name="period_start_date"
                    subscription={{ value: true }}
                    render={(pollito) => (
                      <>
                        <DatePicker
                          {...pollito.input}
                          color="secondary"
                          variant="standard"
                          disabled={processing}
                          onChange={onChangeDecorator(pollito.input.onChange)}
                          error={Boolean(fuckErrors[pollito.input.name])}
                          helperText={fuckErrors[pollito.input.name]}
                        />
                        <span>{t('to')}</span>
                        <Field
                          name="period_end_date"
                          subscription={{ value: true }}
                          render={(superpollito) => (
                            <DatePicker
                              {...superpollito.input}
                              color="secondary"
                              minDate={add(parse(pollito.input.value), {
                                days: 1,
                              })}
                              variant="standard"
                              disabled={processing}
                              onChange={onChangeDecorator(
                                superpollito.input.onChange,
                              )}
                              error={Boolean(
                                fuckErrors[superpollito.input.name],
                              )}
                              helperText={fuckErrors[superpollito.input.name]}
                            />
                          )}
                        />
                      </>
                    )}
                  />
                </div>
                <Box sx={{ p: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <span>8 -&nbsp;</span>
                  {t(
                    'What day of the week do you prefer to process your payroll?',
                  )}
                </Typography>
                <Field
                  name="preferred_day_to_process"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <Select
                      {...pollito.input}
                      items={days}
                      variant="standard"
                      color="secondary"
                      disabled={processing}
                      onChange={onChangeDecorator(pollito.input.onChange)}
                      error={Boolean(fuckErrors[pollito.input.name])}
                      helperText={fuckErrors[pollito.input.name]}
                    />
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Field
                  name="preferred_pickup_method"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <RadiosCollection
                        {...pollito.input}
                        css={styles.radios}
                        label={`9 - ${t(
                          'How do you prefer to pick up your checks?',
                        )}`}
                        disabled={processing}
                        radios={pickupMethods}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === pickupMethods[2] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t(
                              'What day of the week do you want to pick up your checks?',
                            )}
                          </Typography>
                          <Field
                            name="pickup_day"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <SelectDays
                                {...superpollito.input}
                                variant="standard"
                                color="secondary"
                                disabled={processing}
                                onChange={onChangeDecorator(
                                  superpollito.input.onChange,
                                )}
                                error={Boolean(
                                  fuckErrors[superpollito.input.name],
                                )}
                                helperText={fuckErrors[superpollito.input.name]}
                              />
                            )}
                          />
                        </div>
                      )}
                    </>
                  )}
                />
                <Box sx={{ p: 2 }} />
                <FieldArray
                  name="report_delivery_method"
                  subscription={{ value: true }}
                  render={({ fields }) => (
                    <ChecksCollection
                      name={fields.name}
                      value={fields.value}
                      label={`10 - ${t(
                        'How do you want to receive your reports?',
                      )}`}
                      checks={reportsDeliveryMethod}
                      formGroupProps={{
                        css: styles.checkboxes,
                      }}
                      disabled={processing}
                      onChange={(ev) => {
                        removeError(fields.name);
                        if (ev.target.checked) {
                          fields.push(ev.target.value);
                        } else {
                          fields.remove(fields.value.indexOf(ev.target.value));
                        }
                      }}
                      error={Boolean(fuckErrors[fields.name])}
                      helperText={fuckErrors[fields.name]}
                    />
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <span>11 -&nbsp;</span>
                  {t('How many employees do you have?')}
                </Typography>
                <Field
                  name="employees"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <TextFieldMasked
                      {...pollito.input}
                      mask="#####"
                      definitions={{
                        '#': /[0-9]/,
                      }}
                      variant="standard"
                      color="secondary"
                      disabled={processing}
                      onChange={onChangeDecorator(pollito.input.onChange)}
                      error={Boolean(fuckErrors[pollito.input.name])}
                      helperText={fuckErrors[pollito.input.name]}
                    />
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Field
                  name="employees_has_deductions"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <RadiosCollection
                        {...pollito.input}
                        css={styles.radios}
                        label={`12 - ${t(
                          'You make additional deductions to your employees?',
                        )}`}
                        disabled={processing}
                        radios={yesNo}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t('Specify the deductions made')}
                          </Typography>
                          <FieldArray
                            name="employess_deductions"
                            subscription={{ value: true }}
                            render={({ fields }) => (
                              <Aggregator
                                name={fields.name}
                                value={fields.value}
                                color="secondary"
                                variant="standard"
                                renderMode="input"
                                disabled={processing}
                                onAdd={(v) => {
                                  fields.push(v);
                                  removeError(fields.name);
                                }}
                                onRemove={(i) => {
                                  fields.remove(i);
                                  removeError(fields.name);
                                }}
                                error={Boolean(fuckErrors[fields.name])}
                                helperText={fuckErrors[fields.name]}
                              />
                            )}
                          />
                          <Box sx={{ p: 2 }} />
                          <Field
                            name="tax_impound_interval"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <RadiosCollection
                                {...superpollito.input}
                                css={styles.radios}
                                label={t(
                                  'For tax withholding payment (state unemployment 941), how do you want to make deductions to these payments?',
                                )}
                                disabled={processing}
                                radios={taxImpoundIntervals}
                                onChange={onChangeDecorator(
                                  superpollito.input.onChange,
                                )}
                                error={Boolean(
                                  fuckErrors[superpollito.input.name],
                                )}
                                helperText={fuckErrors[superpollito.input.name]}
                              />
                            )}
                          />

                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t(
                              'Day of the week on which payments are made from your account?',
                            )}
                          </Typography>
                          <Field
                            name="prefer_day_to_be_charged_from_bank"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <SelectDays
                                {...superpollito.input}
                                variant="standard"
                                color="secondary"
                                showOnly={[DaysOfWeek[0], DaysOfWeek[4]]}
                                disabled={processing}
                                onChange={onChangeDecorator(
                                  superpollito.input.onChange,
                                )}
                                error={Boolean(
                                  fuckErrors[superpollito.input.name],
                                )}
                                helperText={fuckErrors[superpollito.input.name]}
                              />
                            )}
                          />
                        </div>
                      )}
                    </>
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Field
                  name="has_divisions"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <RadiosCollection
                        {...pollito.input}
                        css={styles.radios}
                        label={`13 - ${t('Your company has divisions?')}`}
                        disabled={processing}
                        radios={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t('Specify the divisions that your company has?')}
                          </Typography>
                          <FieldArray
                            name="divisions"
                            subscription={{ value: true }}
                            render={({ fields }) => (
                              <Aggregator
                                name={fields.name}
                                value={fields.value}
                                color="secondary"
                                variant="standard"
                                disabled={processing}
                                onAdd={(v) => {
                                  fields.push(v);
                                  removeError(fields.name);
                                }}
                                onRemove={(i) => {
                                  fields.remove(i);
                                  removeError(fields.name);
                                }}
                                error={Boolean(fuckErrors[fields.name])}
                                helperText={fuckErrors[fields.name]}
                              />
                            )}
                          />
                          <Box sx={{ p: 2 }} />
                          <Field
                            name="payments_separated_by_divisions"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <RadiosCollection
                                {...superpollito.input}
                                css={styles.radios}
                                label={t(
                                  'Will employee payments be separated by branch?',
                                )}
                                disabled={processing}
                                radios={yesNo}
                                onChange={onChangeDecorator(
                                  superpollito.input.onChange,
                                )}
                                error={Boolean(
                                  fuckErrors[superpollito.input.name],
                                )}
                                helperText={fuckErrors[superpollito.input.name]}
                              />
                            )}
                          />
                        </div>
                      )}
                    </>
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Field
                  name="has_departaments"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <RadiosCollection
                        {...pollito.input}
                        css={styles.radios}
                        label={`14 - ${t('Your company has departaments?')}`}
                        disabled={processing}
                        radios={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t(
                              'Specify the departaments that your company has?',
                            )}
                          </Typography>
                          <FieldArray
                            name="departaments"
                            subscription={{ value: true }}
                            render={({ fields }) => (
                              <Aggregator
                                name={fields.name}
                                value={fields.value}
                                color="secondary"
                                variant="standard"
                                disabled={processing}
                                onAdd={(v) => {
                                  fields.push(v);
                                  removeError(fields.name);
                                }}
                                onRemove={(i) => {
                                  fields.remove(i);
                                  removeError(fields.name);
                                }}
                                error={Boolean(fuckErrors[fields.name])}
                                helperText={fuckErrors[fields.name]}
                              />
                            )}
                          />
                        </div>
                      )}
                    </>
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Field
                  name="employees_by_charges"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <RadiosCollection
                        {...pollito.input}
                        css={styles.radios}
                        label={`15 - ${t(
                          'What types of positions does your company have (Manager, Corporate Communications Manager, etc.)?',
                        )}`}
                        disabled={processing}
                        radios={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t('Specify')}
                          </Typography>
                          <FieldArray
                            name="employees_charges"
                            subscription={{ value: true }}
                            render={({ fields }) => (
                              <Aggregator
                                name={fields.name}
                                value={fields.value}
                                color="secondary"
                                variant="standard"
                                disabled={processing}
                                onAdd={(v) => {
                                  fields.push(v);
                                  removeError(fields.name);
                                }}
                                onRemove={(i) => {
                                  fields.remove(i);
                                  removeError(fields.name);
                                }}
                                error={Boolean(fuckErrors[fields.name])}
                                helperText={fuckErrors[fields.name]}
                              />
                            )}
                          />
                        </div>
                      )}
                    </>
                  )}
                />
              </>
            )}
          </>
        )}
      />
    </Section>
  );
}
