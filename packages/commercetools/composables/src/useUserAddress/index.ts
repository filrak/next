import { UseUserAddress } from '@vue-storefront/interfaces';
import { Address } from '../types/GraphQL';
import { useUserAddressFactory } from '@vue-storefront/factories';
import { Customer } from '@vue-storefront/commercetools-api/lib//types/GraphQL';
import { params } from './factoryParams';

const useUserAddress: () => UseUserAddress<Address> = useUserAddressFactory<Customer, Address>(params);

export default useUserAddress;
