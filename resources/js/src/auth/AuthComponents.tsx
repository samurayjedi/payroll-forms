import styled from '@emotion/styled';
import _ from 'lodash';
import {
  Box,
  BoxProps,
  Paper,
  Alert,
  Stack,
  Collapse,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const headerSize = 60;
const triangleSize = 32;

export const FormPaper = styled(Paper)<FormPaperProps>(({ theme, label }) => ({
  position: 'relative',
  width: 500,
  '&::before': {
    content: `"${label}"`,
    color: theme.palette.common.white,
    fontSize: theme.typography.h6.fontSize,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: headerSize,
    backgroundColor: theme.palette.secondary.main,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: theme.spacing(6),
  },
  '& .alert': {
    padding: `0 ${theme.spacing(2)}`,
    margin: `-${theme.spacing(2)} 0 ${theme.spacing(3)}`,
  },
  '& form': {
    padding: `0 ${theme.spacing(4)} ${theme.spacing(3)}`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    fontSize: `calc(${triangleSize}px / 2)`,
    margin: '0 auto',
    width: 0,
    height: 0,
    top: headerSize, // ::before height
    left: `calc(50% - calc(${triangleSize}px / 2))`,
    borderLeft: '1em solid transparent',
    borderRight: '1em solid transparent',
    borderTop: `1em solid ${theme.palette.secondary.main}`,
  },
}));

export const Spacing = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0`,
}));

export const SpaceBetween = styled(Box)<SpaceBetweenProps>(
  ({ theme, paddingTop, paddingBottom }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: paddingTop ?? theme.spacing(2),
    paddingBottom: paddingBottom ?? theme.spacing(2),
  }),
);

export function ErrorsAlert({
  openAlerts,
  errors,
  onClose = undefined,
  ...rest
}: BoxProps & {
  openAlerts: boolean;
  errors: Record<string, string>;
  onClose?: () => void;
}) {
  const errorsArr = Object.keys(errors) as Array<string>;
  if (errorsArr.length > 0) {
    return (
      <Box {...rest}>
        <Collapse in={openAlerts} className="alert">
          <Stack spacing={2}>
            <Alert
              severity="error"
              action={
                onClose && (
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={onClose}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                )
              }
            >
              Whoops! Something went wrong.
              <ul style={{ padding: 0 }}>
                {errorsArr.map((key) => (
                  <li key={_.kebabCase(key)}>{errors[key]}</li>
                ))}
              </ul>
            </Alert>
          </Stack>
        </Collapse>
      </Box>
    );
  }
  return null;
}

export const FormFooterStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  color: theme.palette.common.white,
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.main,
  borderbottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  '& a': {
    color: 'currentColor',
  },
}));

type FormPaperProps = {
  label: string;
};

type SpaceBetweenProps = {
  paddingTop?: number;
  paddingBottom?: number;
};
