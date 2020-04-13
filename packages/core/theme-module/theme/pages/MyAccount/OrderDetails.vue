<template>
  <section v-if="orderId" class="order-details">
      <h2>Order #{{orderGetters.getId(order)}}</h2>
      <p>Status: <strong>{{orderGetters.getStatus(order)}}</strong></p>
      <p>Date: <strong>{{orderGetters.getDate(order)}}</strong></p>

      <h3 class="title">Items</h3>
      <SfCollectedProduct
        v-for="product in orderGetters.getItems(order)"
        :key="cartGetters.getItemSku(product)"
        :image="cartGetters.getItemImage(product)"
        :title="cartGetters.getItemName(product)"
        :regular-price="'$' + cartGetters.getItemPrice(product).regular"
        :qty="cartGetters.getItemQty(product)"
        class="ordered-product"
      />

      <h3 class="title">Summary</h3>
      <div class="order-details__summary">
        <div class="order-details__summary__item">
          <span class="property">Total price</span>
          <span class="value">${{orderGetters.getPrice(order).regular}}</span>
        </div>
      </div>

      <h3 class="title">Order addresses</h3>
      <div class="order-details__addresses">
        <div class="order-details__addresses__item">
          <p class="order-details__addresses__item__title">Billing Address</p>
          <div v-html="orderGetters.getBillingAddress(order)" />
        </div>
        <div class="order-details__addresses__item">
          <p class="order-details__addresses__item__title">Shipping Address</p>
          <div v-html="orderGetters.getShippingAddress(order)" />
        </div>
      </div>
  </section>
  <p v-else>Order not found</p>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
import { SfCollectedProduct } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/utils';
import { useUserOrders, orderGetters, cartGetters } from '<%= options.composables %>';

export default {
  name: 'OrderDetails',
  components: {
    SfCollectedProduct
  },
  setup(props, { root }) {
    const { searchOrders, orders } = useUserOrders();
    const orderId = ref(root.$route.params.id || null);

    onSSR(async () => {
      await searchOrders({ id: orderId.value });
    });

    return {
      orderId,
      // TODO: cartGetters is a temporary getter to provide product information. It's been proposed to extend orderGetters functionality here: https://github.com/DivanteLtd/next/issues/363
      cartGetters,
      orderGetters,
      order: computed(() => orders.value[0] || {})
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.order-details {
  .title {
    margin-top: var(--spacer-extra-big);
    font-size: var(--font-size-big);
    font-weight: 500;
  }

  .property {
    min-width: 10rem;
  }

  &__summary {
    &__tax-title {
      font-weight: 500;
    }

    &__item {
      display: flex;
      flex-direction: row;

      .value {
        font-weight: 500;
      }
    }
  }

  &__addresses__item {
    &__title {
      font-weight: 500;
    }

    &__field {
      display: flex;
    }
  }

}
</style>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

.order-details {
  .ordered-product {
    input {
      pointer-events: none;
    }

    .sf-collected-product__remove {
      display: none;
    }
  }

  @include for-desktop {
    &__addresses {
      display: flex;
      justify-content: space-between;

      &__item {
        flex: 1;

        &__field {
          display: flex;

          .property {
            min-width: 10rem;
          }
        }
      }
    }
  }
}
</style>
