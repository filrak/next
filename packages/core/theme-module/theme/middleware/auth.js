import { useUser } from '@vue-storefront/commercetools-composables';

const auth = ({ redirect }) => {
  const { isAuthenticated } = useUser();
  if (isAuthenticated && !isAuthenticated.value) {
    return redirect('/');
  }
};

export default auth;
