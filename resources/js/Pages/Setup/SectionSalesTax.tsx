import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Box, Typography, TextField } from '@mui/material';
import {
  yesNo,
  salexTaxManagementMethods,
  salesTaxPaymentMethod,
} from '../../store/formSetup';
import { useErrors } from '../../hooks';
import { Section } from '../../components/FormLayout';
import RadiosCollection from '../../lib/material/RadiosCollection';
import InputFile from '../../lib/material/InputFile';
import TextFieldPassword from '../../lib/material/TextFieldPassword';
import TextFieldMasked from '../../lib/material/TextFieldMasked';
import * as styles from './styles';

export default function SectionSalesTax({
  processing,
}: {
  processing: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Sales Tax')}>
      <Field
        name="need_sales_tax"
        subscription={{ value: true }}
        render={({ input }) => (
          <>
            <RadiosCollection
              {...input}
              css={styles.radios}
              label={`1 - ${t(
                'Do you sell products that require the payment of "Sales Tax"?',
              )}`}
              disabled={processing}
              radios={yesNo}
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
            {input.value === yesNo[1] && (
              <>
                <Box sx={{ p: 2 }} />
                <Field
                  name="has_sales_tax_license"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <RadiosCollection
                        {...pollito.input}
                        css={styles.radios}
                        label={`2 - ${t(
                          'Do you have an active sales tax license?',
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
                          <div className="input-file-field">
                            <Typography variant="subtitle1" gutterBottom>
                              {t('Please upload the license')}
                            </Typography>
                            <Field
                              name="salex_tax_license_file"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <InputFile
                                  {...superpollito.input}
                                  multiple
                                  accept="application/pdf, image/png, image/gif, image/jpeg"
                                  disabled={processing}
                                  onChange={onChangeDecorator(
                                    superpollito.input.onChange,
                                  )}
                                  error={Boolean(
                                    fuckErrors[superpollito.input.name],
                                  )}
                                  helperText={
                                    fuckErrors[superpollito.input.name]
                                  }
                                />
                              )}
                            />
                          </div>
                          <Box sx={{ p: 2 }} />
                          <Field
                            name="has_sales_tax_license_access"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <>
                                <RadiosCollection
                                  {...superpollito.input}
                                  css={styles.radios}
                                  label={t('Do you have access to it?')}
                                  disabled={processing}
                                  radios={yesNo}
                                  onChange={onChangeDecorator(
                                    superpollito.input.onChange,
                                  )}
                                  error={Boolean(
                                    fuckErrors[superpollito.input.name],
                                  )}
                                  helperText={
                                    fuckErrors[superpollito.input.name]
                                  }
                                />
                                {superpollito.input.value === yesNo[1] && (
                                  <>
                                    <Box sx={{ p: 2 }} />
                                    <Typography
                                      variant="subtitle1"
                                      gutterBottom
                                    >
                                      {t('Specify the user/email and password')}
                                    </Typography>
                                    <div
                                      className="system_access"
                                      css={styles.systemAccess}
                                    >
                                      <Field
                                        name="sales_tax_license_user"
                                        subscription={{ value: true }}
                                        render={(megapollito) => (
                                          <TextField
                                            {...megapollito.input}
                                            label={t('User/Email')}
                                            variant="standard"
                                            color="secondary"
                                            disabled={processing}
                                            onChange={onChangeDecorator(
                                              megapollito.input.onChange,
                                            )}
                                            error={Boolean(
                                              fuckErrors[
                                                megapollito.input.name
                                              ],
                                            )}
                                            helperText={
                                              fuckErrors[megapollito.input.name]
                                            }
                                          />
                                        )}
                                      />
                                      <span>{t('and')}</span>
                                      <Field
                                        name="salex_tax_license_password"
                                        subscription={{ value: true }}
                                        render={(megapollito) => (
                                          <TextFieldPassword
                                            {...megapollito.input}
                                            label={t('Password')}
                                            variant="standard"
                                            color="secondary"
                                            disabled={processing}
                                            onChange={onChangeDecorator(
                                              megapollito.input.onChange,
                                            )}
                                            error={Boolean(
                                              fuckErrors[
                                                megapollito.input.name
                                              ],
                                            )}
                                            helperText={
                                              fuckErrors[megapollito.input.name]
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          />
                        </div>
                      )}
                    </>
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Field
                  name="has_previous_sales_tax_reports"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <RadiosCollection
                        {...pollito.input}
                        css={styles.radios}
                        label={`3 - ${t(
                          'Did you recopile the previous reports?',
                        )}`}
                        disabled={processing}
                        radios={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="input-file-field">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t('Please upload the reports')}
                          </Typography>
                          <Field
                            name="salex_tax_reports_file"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <InputFile
                                {...superpollito.input}
                                multiple
                                accept="application/pdf, image/png, image/gif, image/jpeg"
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
                  name="is_salex_tax_up_date"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <RadiosCollection
                        {...pollito.input}
                        css={styles.radios}
                        label={`4 - ${t(
                          'Is the sales tax payment up to date?',
                        )}`}
                        disabled={processing}
                        radios={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[0] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t('What kind of problem do you have?')}
                          </Typography>
                          <Field
                            name="sales_tax_problems_description"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <TextField
                                {...superpollito.input}
                                css={styles.textArea}
                                variant="standard"
                                color="secondary"
                                multiline
                                rows={2}
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
                  name="sales_tax_management_method"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <RadiosCollection
                        {...pollito.input}
                        css={styles.radios}
                        label={`5 - ${t(
                          'How would you prefer us to handle sales tax?',
                        )}`}
                        disabled={processing}
                        radios={salexTaxManagementMethods}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === salexTaxManagementMethods[0] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t(
                              'What day of the month do you want ask to submit the payment?',
                            )}
                          </Typography>
                          <Field
                            name="sales_tax_day_of_month_to_emit_payment"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <TextFieldMasked
                                {...superpollito.input}
                                mask="##"
                                definitions={{
                                  '#': /[0-9]/,
                                }}
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
                          <Box sx={{ p: 2 }} />
                          <Field
                            name="salex_tax_payment_method"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <RadiosCollection
                                {...superpollito.input}
                                css={styles.radios}
                                label={t('How do you want to pay?')}
                                disabled={processing}
                                radios={salesTaxPaymentMethod}
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
              </>
            )}
          </>
        )}
      />
    </Section>
  );
}
