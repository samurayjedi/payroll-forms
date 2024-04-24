import { useState } from 'react';
import {
  InputAdornment,
  IconButton,
  TextFieldProps,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function TextFieldPassword(props: TextFieldProps) {
  const { InputProps, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...rest}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              onMouseDown={(ev) => {
                ev.preventDefault();
              }}
              // eslint-disable-next-line react/destructuring-assignment
              disabled={props.disabled}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
