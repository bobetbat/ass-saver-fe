// import logo from './logo.svg';
import { Layout } from './components/Layout';
import { AddressForm } from './components/AddressForm';
import { PwaInstructions } from './components/PwaInstructions';

const App = () => {
  return <Layout header footer>
    <AddressForm />
    <PwaInstructions />
  </Layout>
}

export default App;
