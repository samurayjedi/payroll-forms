import React, { ElementType } from 'react';
import _ from 'lodash';
import { NumericFormat } from 'react-number-format';
import {
  TextField,
  TextFieldProps,
  InputBaseComponentProps,
} from '@mui/material';

export default function TextFieldCurrency({
  InputProps,
  prefix = '$',
  ...rest
}: TextFieldCurrencyProps) {
  const miuInputProps = _.defaultTo(InputProps, {});
  const inputProps = _.defaultTo(miuInputProps.inputProps, {});

  return (
    <TextField
      {...rest}
      InputProps={{
        ...miuInputProps,
        inputComponent: MyNumberFormat as unknown as ElementType<
          InputBaseComponentProps,
          keyof JSX.IntrinsicElements
        >,
        inputProps: {
          ...inputProps,
          prefix,
        },
      }}
    />
  );
}

const MyNumberFormat = React.forwardRef<HTMLInputElement, MyNumberFormatProps>(
  (props, ref) => {
    const { prefix, onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix={prefix}
      />
    );
  },
);

interface MyNumberFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  prefix: string;
}
export type TextFieldCurrencyProps = TextFieldProps & {
  prefix?: string;
};
