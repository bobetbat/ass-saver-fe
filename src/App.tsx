// import logo from './logo.svg';
import { Typography } from '@mui/material';
import { Layout } from './components/Layout';
import { AddressForm } from './components/AddressForm';

const App = () => {
  return <Layout header footer>
    <Typography variant='h5'>Add address to subscribe</Typography>
    <AddressForm />
  </Layout>
}

export default App;
