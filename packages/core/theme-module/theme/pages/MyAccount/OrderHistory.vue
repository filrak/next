<template>
  <SfTabs :openTab="1">
    <SfTab title="My orders">
      <div class="info-text">
        Check the details and status of your orders in the online store.
        You can also cancel your order or request a return.
      </div>

      <SfTable class="orders">
        <SfTableHeading>
          <SfTableHeader v-for="(header, i) in headers" :key="i">{{ header }}</SfTableHeader>
          <SfTableHeader>
            <SfButton class="download-all">Download all</SfButton>
          </SfTableHeader>
        </SfTableHeading>
        <SfTableRow v-for="order in orders" :key="order.id">
          <SfTableData>{{ order.id }}</SfTableData>
          <SfTableData>{{ order.paymentDate }}</SfTableData>
          <SfTableData>{{ order.paymentMethod }}</SfTableData>
          <SfTableData>{{ order.amount }}</SfTableData>
          <SfTableData>{{ order.status }}</SfTableData>
          <SfTableData>
            <SfButton class="sf-button--text download-button">
              View
            </SfButton>
          </SfTableData>
        </SfTableRow>
      </SfTable>

      <div class="no-orders">You currently have no orders</div>

      <SfButton class="submit-button ">Start shopping</SfButton>
    </SfTab>
  </SfTabs>
</template>

<script>
import { ref } from '@vue/composition-api'
import { SfTabs, SfButton, SfTable } from '@storefront-ui/vue'

export default {
  components: { SfTabs, SfButton, SfTable },
  setup() {
    const headers = ['Order ID', 'Payment date', 'Payment method', 'Amount', 'Status']
    const orders = ref([
      {
        id: '12345',
        paymentDate: '4th Nov, 2019',
        paymentMethod: 'Visa card',
        amount: '$12.00',
        status: 'In process'
      },
      {
        id: '43244',
        paymentDate: '4th Nov, 2019',
        paymentMethod: 'Paypal',
        amount: '$12.00',
        status: 'Finalised'
      },
      {
        id: '56465',
        paymentDate: '4th Nov, 2019',
        paymentMethod: 'Visa card',
        amount: '$12.00',
        status: 'Finalised'
      },
      {
        id: '12357',
        paymentDate: '4th Nov, 2019',
        paymentMethod: 'Mastercard',
        amount: '$12.00',
        status: 'Finalised'
      },
            {
        id: '67584',
        paymentDate: '4th Nov, 2019',
        paymentMethod: 'Visa card',
        amount: '$12.00',
        status: 'Finalised'
      }
    ])

    return { headers, orders }
  }
}
</script>

<style lang="scss" scoped>
@import "./profile.scss";

.no-orders {
  font-size: 16px;
  padding: 40px 0;
  font-weight: bold;
}

.download-all {
  padding: 10px;
}

.download-button {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-left: 5px;
  }
}

</style>
