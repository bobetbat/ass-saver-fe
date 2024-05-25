import logo from './logo.svg';
import { Stack, Typography, Paper } from '@mui/material';
import { Layout } from './components/Layout';
import { AddressForm } from './components/AddressForm';

const App = () => {
  return <Layout header footer>
    <Typography variant='h3'>Offers</Typography>
    <AddressForm />
  </Layout>
}

export default App;
