import { ref, Ref } from '@vue/composition-api'
import { Cart } from './../types/GraphQL'

const cart: Ref<Cart> = ref<Cart>(null)
const loading: Ref<boolean> = ref<boolean>(false)

export { cart, loading }
