import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import { Box, Typography, TextField } from '@mui/material';
import { useErrors } from '@/hooks';
import InputFileGroup from '@/src/lib/piwi/core/InputFileGroup';
import InputFile from '@/src/lib/piwi/core/InputFile';
import Section from '@/src/Components/Section';
import Options from '@/src/lib/piwi/core/Options';
import TextFieldPassword from '@/src/lib/piwi/core/TextFieldPassword';
import { yesNo } from './vars';
import * as styles from './styles';

export default function SectionPreviousPayroll({
  submitting,
}: {
  submitting: boolean;
}) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();

  return (
    <Section title={t('Previous Payroll')}>
      <Field
        name="payroll_done_last_six_month"
        subscription={{ value: true }}
        render={({ input }) => (
          <>
            <Options
              {...input}
              type="radio"
              css={styles.radios}
              label={`1 - ${t("You've done payroll in the last six months?")}`}
              disabled={submitting}
              options={yesNo}
              onChange={onChangeDecorator(input.onChange)}
              error={Boolean(fuckErrors[input.name])}
              helperText={fuckErrors[input.name]}
            />
            {input.value === 'Yes' && (
              <>
                <Box sx={{ p: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <span>2 -&nbsp;</span>
                  {t('Specify company name')}
                </Typography>
                <Field
                  name="last_company_name_used"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <TextField
                      {...pollito.input}
                      variant="standard"
                      color="secondary"
                      disabled={submitting}
                      onChange={onChangeDecorator(pollito.input.onChange)}
                      error={Boolean(fuckErrors[pollito.input.name])}
                      helperText={fuckErrors[pollito.input.name]}
                    />
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Field
                  name="system_access"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <Options
                        {...pollito.input}
                        type="radio"
                        css={styles.radios}
                        label={`3 - ${t('Do you have system access?')}`}
                        disabled={submitting}
                        options={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t('Specify the user/email and password')}
                          </Typography>
                          <div
                            className="system_access"
                            css={styles.systemAccess}
                          >
                            <Field
                              name="system_access_user"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <TextField
                                  {...superpollito.input}
                                  label={t('User/Email')}
                                  variant="standard"
                                  color="secondary"
                                  disabled={submitting}
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
                            <span>{t('and')}</span>
                            <Field
                              name="system_access_password"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <TextFieldPassword
                                  {...superpollito.input}
                                  label={t('Password')}
                                  variant="standard"
                                  color="secondary"
                                  disabled={submitting}
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
                        </div>
                      )}
                    </>
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Field
                  name="did_collect_reports"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <Options
                        {...pollito.input}
                        type="radio"
                        css={styles.radios}
                        label={`4 - ${t(
                          'Did you collect the payroll reports?',
                        )}`}
                        disabled={submitting}
                        options={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <InputFileGroup
                            label={t(
                              'Please upload your payroll summary report (for each employee), pay stub copy (for each employee), and 941 report (for the applicable quarter)',
                            )}
                            accept="application/pdf, image/png, image/gif, image/jpeg"
                            multiple
                          >
                            <Field
                              name="payroll_summary_report_file"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <InputFile
                                  {...superpollito.input}
                                  label={t(
                                    'Select the payroll summary report documents',
                                  )}
                                  disabled={submitting}
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
                            <Field
                              name="pay_stub_copy_file"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <InputFile
                                  {...superpollito.input}
                                  label={t('Select Pay stub copy document')}
                                  disabled={submitting}
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
                            <Field
                              name="report_941_file"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <InputFile
                                  {...superpollito.input}
                                  label={t('Select 941 report document')}
                                  disabled={submitting}
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
                          </InputFileGroup>
                        </div>
                      )}
                    </>
                  )}
                />
                <Box sx={{ p: 2 }} />
                <Field
                  name="has_unemployment_id_license"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <Options
                        {...pollito.input}
                        type="radio"
                        css={styles.radios}
                        label={`5 - ${t(
                          'Are you aware of having a "Unemployment ID" license?',
                        )}`}
                        disabled={submitting}
                        options={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <InputFileGroup
                            label={t(
                              'Please upload your license and the "Unemployment Report" (for the applicable quarter)',
                            )}
                            accept="application/pdf, image/png, image/gif, image/jpeg"
                            multiple
                          >
                            <Field
                              name="unemployment_license_file"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <InputFile
                                  {...superpollito.input}
                                  label={t('Select license')}
                                  disabled={submitting}
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
                            <Field
                              name="unemployment_report_file"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <InputFile
                                  {...superpollito.input}
                                  label={t(
                                    'Select "Unemployment Report" document',
                                  )}
                                  disabled={submitting}
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
                          </InputFileGroup>
                          <Box sx={{ p: 2 }} />
                          <Field
                            name="has_unemployment_id_access"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <>
                                <Options
                                  {...superpollito.input}
                                  type="radio"
                                  css={styles.radios}
                                  label={t('Do you have system access?')}
                                  disabled={submitting}
                                  options={yesNo}
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
                                        name="unemployment_id_user"
                                        subscription={{ value: true }}
                                        render={(megapollito) => (
                                          <TextField
                                            {...megapollito.input}
                                            label={t('User/Email')}
                                            variant="standard"
                                            color="secondary"
                                            disabled={submitting}
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
                                        name="unemployment_id_password"
                                        subscription={{ value: true }}
                                        render={(megapollito) => (
                                          <TextFieldPassword
                                            {...megapollito.input}
                                            label={t('Password')}
                                            variant="standard"
                                            color="secondary"
                                            disabled={submitting}
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
                  name="has_withholding_id"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <Options
                        {...pollito.input}
                        type="radio"
                        css={styles.radios}
                        label={`6 - ${t(
                          'Are you aware of having a "Withholding ID" license?',
                        )}`}
                        disabled={submitting}
                        options={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <InputFileGroup
                            label={t(
                              'Please upload your license and the "Wage Withholding Report" (for the applicable quarter)',
                            )}
                            accept="application/pdf, image/png, image/gif, image/jpeg"
                            multiple
                          >
                            <Field
                              name="withholding_id_license_file"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <InputFile
                                  {...superpollito.input}
                                  label={t('Select license')}
                                  disabled={submitting}
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
                            <Field
                              name="withholding_report_file"
                              subscription={{ value: true }}
                              render={(superpollito) => (
                                <InputFile
                                  {...superpollito.input}
                                  label={t(
                                    'Select "Wage Withholding Report" document',
                                  )}
                                  disabled={submitting}
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
                          </InputFileGroup>
                          <Box sx={{ p: 2 }} />
                          <Field
                            name="has_withholding_id_access"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <>
                                <Options
                                  {...superpollito.input}
                                  type="radio"
                                  css={styles.radios}
                                  label={t('Do you have system access?')}
                                  disabled={submitting}
                                  options={yesNo}
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
                                        name="withholding_id_user"
                                        subscription={{ value: true }}
                                        render={(megapollito) => (
                                          <TextField
                                            {...megapollito.input}
                                            label={t('User/Email')}
                                            variant="standard"
                                            color="secondary"
                                            disabled={submitting}
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
                                        name="withholding_id_password"
                                        subscription={{ value: true }}
                                        render={(megapollito) => (
                                          <TextFieldPassword
                                            {...megapollito.input}
                                            label={t('Password')}
                                            variant="standard"
                                            color="secondary"
                                            disabled={submitting}
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
                  name="has_had_problems_with_payroll"
                  subscription={{ value: true }}
                  render={(pollito) => (
                    <>
                      <Options
                        {...pollito.input}
                        type="radio"
                        css={styles.radios}
                        label={`7 - ${t(
                          'Have you had problems with your payroll?',
                        )}`}
                        disabled={submitting}
                        options={yesNo}
                        onChange={onChangeDecorator(pollito.input.onChange)}
                        error={Boolean(fuckErrors[pollito.input.name])}
                        helperText={fuckErrors[pollito.input.name]}
                      />
                      {pollito.input.value === yesNo[1] && (
                        <div className="subquestions">
                          <Box sx={{ p: 2 }} />
                          <Typography variant="subtitle1" gutterBottom>
                            {t('Please tell us a bit')}
                          </Typography>
                          <Field
                            name="problem_with_payroll"
                            subscription={{ value: true }}
                            render={(superpollito) => (
                              <TextField
                                {...superpollito.input}
                                css={styles.textArea}
                                variant="standard"
                                color="secondary"
                                multiline
                                rows={2}
                                disabled={submitting}
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
