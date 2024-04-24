import styled from '@emotion/styled';
import { Container, Paper as MUIPaper } from '@mui/material';
import AppLayout from '@/src/Layouts/AppLayout';
// import { PageProps } from '@/types';

export default function Dashboard(/* { auth }: PageProps */) {
  return (
    <AppLayout>
      <Container maxWidth="lg">
        <Paper>I love shion!!!</Paper>
      </Container>
    </AppLayout>
  );
}

const Paper = styled(MUIPaper)(({ theme }) => ({
  padding: theme.spacing(4),
}));
