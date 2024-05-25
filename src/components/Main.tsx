import { Layout } from './Layout';
import { AddressForm } from './AddressForm';
import { PwaInstructions } from './PwaInstructions';

export const Main = () => {
  return <Layout header footer>
    <AddressForm />
    <PwaInstructions />
  </Layout>
}

