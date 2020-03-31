<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      title="My Account"
      :active="activePage"
      class="my-account"
      @click:change="changeActivePage"
    >
      <SfContentCategory title="Personal Details">
        <SfContentPage title="My profile">
          <MyProfile :account="account" />
        </SfContentPage>
        <SfContentPage title="Shipping details">
          <ShippingDetails :account="account" />
        </SfContentPage>
        <SfContentPage title="Loyalty card">
          <LoyaltyCard />
        </SfContentPage>
        <SfContentPage title="My newsletter">
          <MyNewsletter />
        </SfContentPage>
      </SfContentCategory>
      <SfContentCategory title="Order details">
        <SfContentPage title="Order history">
          <OrderHistory />
        </SfContentPage>
        <SfContentPage title="My reviews">
          <MyReviews />
        </SfContentPage>
      </SfContentCategory>
      <SfContentPage title="Log out" />
    </SfContentPages>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import { useUser, useUserAddress } from '<%= options.composables %>';
import { computed } from '@vue/composition-api';
import MyProfile from './MyAccount/MyProfile';
import ShippingDetails from './MyAccount/ShippingDetails';
import LoyaltyCard from './MyAccount/LoyaltyCard';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import MyReviews from './MyAccount/MyReviews';
import auth from '../middleware/auth';

export default {
  name: 'MyAccount',
  middleware: auth,
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    ShippingDetails,
    LoyaltyCard,
    MyNewsletter,
    OrderHistory,
    MyReviews
  },
  setup(props, { root }) {
    const { user } = useUser();
    const { getShippingAddresses, searchAddresses } = useUserAddress();

    const breadcrumbs = [
      {
        text: 'Home',
        route: {
          link: '#'
        }
      },
      {
        text: 'My Account',
        route: {
          link: '#'
        }
      }
    ];

    const activePage = computed(() => {
      const { pageName } = root.$route.params;

      return pageName
        ? (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ')
        : 'My profile';
    });

    searchAddresses();

    const changeActivePage = (title) => {
      if (title === 'Log out') {
        return;
      }

      root.$router.push(`/my-account/${title.toLowerCase().replace(' ', '-')}`);
    };

    const account = computed(() => ({
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      email: user.value.email,
      getShippingAddresses,
      // TODO: User orders list
      orders: [
        ['#35765', '4th Nov, 2019', 'Visa card', '$12.00', 'In process'],
        ['#35766', '4th Nov, 2019', 'Paypal', '$12.00', 'Finalised'],
        ['#35768', '4th Nov, 2019', 'Mastercard', '$12.00', 'Finalised'],
        ['#35769', '4th Nov, 2019', 'Paypal', '$12.00', 'Finalised']
      ]
    }));

    return {
      user,
      account,
      breadcrumbs,
      changeActivePage,
      activePage
    };
  }
};
</script>
<style lang='scss' scoped>
@import "~@storefront-ui/vue/styles";

#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.breadcrumbs {
  padding: var(--spacer-big) var(--spacer-extra-big) var(--spacer-extra-big)
    var(--spacer-extra-big);
}
</style>
