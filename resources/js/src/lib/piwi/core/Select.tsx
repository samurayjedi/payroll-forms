import { useMemo } from 'react';
import _ from 'lodash';
import {
  Select as MUISelect,
  SelectProps as MUISelectProps,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

export default function Select({
  label,
  items,
  helperText,
  sx,
  ...props
}: SelectProps) {
  const labelId = useMemo(() => _.uniqueId('select_label_'), []);

  return (
    <FormControl error={props.error} fullWidth={props.fullWidth} sx={sx}>
      <InputLabel id={labelId} sx={{ pl: 1, pr: 1, backgroundColor: 'white' }}>
        {label}
      </InputLabel>
      <MUISelect {...props} labelId={labelId}>
        {_.map(items, (value, key) => {
          const v = Array.isArray(items) ? (value as string) : (key as string);
          const l = value as string;

          return (
            <MenuItem key={_.snakeCase(v)} value={v}>
              {l}
            </MenuItem>
          );
        })}
      </MUISelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export type SelectProps = Omit<MUISelectProps, 'labelId'> & {
  items: string[] | readonly string[] | Record<string, string>;
  label?: string;
  helperText?: string;
};
