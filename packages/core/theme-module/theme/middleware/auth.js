import { useUser } from '@vue-storefront/commercetools-composables';

export default ({ redirect }) => {
  const { isAuthenticated } = useUser();
  if (isAuthenticated && !isAuthenticated.value) {
    return redirect('/');
  }
};
