import { ref, Ref, watch, computed } from '@vue/composition-api'
import { UseUser } from '@vue-storefront/interfaces'
import {
  CustomerSignMeInDraft,
  CustomerSignMeUpDraft,
  Customer
} from '@vue-storefront/commercetools-api/lib/src/types/GraphQL'
import {
  customerSignMeUp,
  customerSignMeIn,
  customerSignOut,
  getMe
} from '@vue-storefront/commercetools-api'
import { cart } from './../useCart'
import { enhanceUser } from './../helpers/internals'

type UserRef = Ref<Customer>
type RegisterFn = (userData: CustomerSignMeInDraft) => Promise<void>
type LoginFn = (userData: CustomerSignMeInDraft) => Promise<void>
type LogoutFn = () => Promise<void>
type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft

const user: UserRef = ref({})
const loading = ref(false)
const error = ref(null)
const isAuthenticated = computed(() => user.value && Object.keys(user.value).length > 0)

const authenticate = async (userData: UserData, fn) => {
  loading.value = true
  error.value = null
  try {
    const userResponse = await fn(userData)
    const enhancedUserResponse = enhanceUser(userResponse)
    user.value = enhancedUserResponse.data.user.customer
    cart.value = enhancedUserResponse.data.user.cart
  } catch (err) {
    error.value = err.graphQLErrors ? err.graphQLErrors[0].message : err
  }
  loading.value = false
}

export default function useUser(): UseUser<UserRef, RegisterFn, LoginFn, LogoutFn> {
  watch(user, async () => {
    if (isAuthenticated.value) {
      return
    }

    loading.value = true

    try {
      const profile = await getMe({ customer: true })
      user.value = profile.data.me.customer
    } catch (err) {}

    loading.value = false
  })

  const register = async (userData: CustomerSignMeUpDraft) => {
    await authenticate(userData, customerSignMeUp)
  }

  const login = async (userData: CustomerSignMeInDraft) => {
    await authenticate(userData, customerSignMeIn)
  }

  const logout = async () => {
    customerSignOut()
    user.value = {} as Customer
    cart.value = null
  }

  return {
    user,
    register,
    login,
    logout,
    isAuthenticated,
    loading,
    error
  }
}
