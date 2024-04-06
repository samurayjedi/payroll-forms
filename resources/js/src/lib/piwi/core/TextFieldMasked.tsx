import React, { ElementType } from 'react';
import _ from 'lodash';
import { IMaskInput } from 'react-imask';
import {
  TextField,
  TextFieldProps,
  InputBaseComponentProps,
} from '@mui/material';

export default function TextFieldMasked({
  mask,
  definitions,
  InputProps,
  ...rest
}: TextFieldMaskedProps) {
  const muiInputProps = _.defaultTo(InputProps, {});
  const inputProps = _.defaultTo(muiInputProps.inputProps, {});

  return (
    <TextField
      {...rest}
      InputProps={{
        ...muiInputProps,
        inputComponent: MaskedZipInput as unknown as ElementType<
          InputBaseComponentProps,
          keyof JSX.IntrinsicElements
        >,
        inputProps: {
          ...inputProps,
          mask,
          definitions,
        },
      }}
    />
  );
}

const MaskedZipInput = React.forwardRef<HTMLInputElement, MaskInputProps>(
  (props, ref) => {
    const { onChange, ...rest } = props;
    return (
      <IMaskInput
        {...rest}
        inputRef={ref}
        onAccept={(value) => {
          if (onChange) {
            onChange({ target: { name: props.name, value } });
          }
        }}
        overwrite
      />
    );
  },
);

export interface MaskInputProps {
  name: string;
  onChange?: (ev: { target: { name: string; value: unknown } }) => void;
  mask: string;
  definitions: Record<string, RegExp>;
}

export type TextFieldMaskedProps = TextFieldProps & {
  mask: string;
  definitions: Record<string, RegExp>;
};
