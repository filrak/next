import { UseUser } from '@vue-storefront/interfaces';
import { params } from './factoryParams';
import {
  Customer,
  Cart
} from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';
import { useUserFactory } from '@vue-storefront/factories';

const useUser: () => UseUser<Customer, any> = useUserFactory<Customer, Cart, any>(params);

export default useUser;
