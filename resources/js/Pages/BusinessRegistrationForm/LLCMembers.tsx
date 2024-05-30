import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Field, useField } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  TextField,
  Box,
  Button,
  Grid,
  InputAdornment,
  Divider,
  IconButton,
} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useErrors } from '@/hooks';
import { pathToLaravelPath } from '@/src/lib/miscUtils';
import Section from '@/src/Components/Section';
import Counter from '@/src/Components/Counter';
import TextFieldMasked from '@/src/lib/piwi/core/TextFieldMasked';
import { memberInitialState } from './vars';

export default function LLCMembers({ submitting }: { submitting: boolean }) {
  const { t } = useTranslation();
  const [fuckErrors, onChangeDecorator] = useErrors();
  const company_type = useField('company_type');
  const company_corporation_more_one_member = useField(
    'company_corporation_more_one_member',
  );
  const company_more_of_one_member = useField('company_more_of_one_member');
  const company_partnership_more_one_member = useField(
    'company_partnership_more_one_member',
  );
  const [moreOneMember, fieldName] = (() => {
    switch (company_type.input.value) {
      case 'Corporation':
        return [
          company_corporation_more_one_member.input.value,
          'company_corporation_members',
        ];
      case 'Limited Liability Company':
        return [company_more_of_one_member.input.value, 'company_llc_members'];
      case 'Partnership':
        return [
          company_partnership_more_one_member.input.value,
          'company_partnership_members',
        ];
    }

    return [null, null];
  })();

  if (moreOneMember === 'Yes') {
    return (
      <Section title={t('Additional Members/Owners.')}>
        <FieldArray
          name={fieldName as string}
          render={({ fields }) => (
            <>
              {fields.map((name, index) => {
                return (
                  <MembersContainer key={name}>
                    {index !== 0 && (
                      <div className="divider">
                        <Counter
                          sx={{ mr: 1 }}
                          number={index + 1}
                          color="disabled"
                          fontSize="medium"
                        />
                        <Divider flexItem />
                        <IconButton
                          className="delete-button"
                          disabled={submitting}
                          onClick={() => fields.remove(index)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </div>
                    )}
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Field
                          name={`${name}.name`}
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
                              error={Boolean(
                                fuckErrors[pathToLaravelPath(input.name)],
                              )}
                              helperText={
                                fuckErrors[pathToLaravelPath(input.name)]
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          name={`${name}.ssn_tin_or_ein`}
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
                              error={Boolean(
                                fuckErrors[pathToLaravelPath(input.name)],
                              )}
                              helperText={
                                fuckErrors[pathToLaravelPath(input.name)]
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </MembersContainer>
                );
              })}
              <Box sx={{ p: 2 }} />
              <AddButton
                variant="text"
                fullWidth
                color="inherit"
                onClick={() => fields.push({ ...memberInitialState })}
              >
                {t('Add Member')}
              </AddButton>
            </>
          )}
        />
      </Section>
    );
  }

  return null;
}

const MembersContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .divider': {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: `${theme.spacing(2)} 0`,
    marginLeft: `-${theme.spacing(2)}`,
    marginRight: `-${theme.spacing(2)}`,
    '& .MuiDivider-root': {
      alignSelf: 'center',
      flex: 1,
    },
  },
  '& .delete-button': {
    alignSelf: 'flex-end',
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  border: `2px dotted ${theme.palette.divider}`,
  borderRadius: 0,
}));
