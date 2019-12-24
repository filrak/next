import Vue from 'vue'
import VueCompositionAPI, { ref, computed } from '@vue/composition-api'

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI)

const state = ref({ 
  isCartSidebarOpen: false  
})

const isCartSidebarOpen = computed(() => state.value.isCartSidebarOpen )
const toggleCartSidebar = () => { state.value.isCartSidebarOpen = !state.value.isCartSidebarOpen }

export { isCartSidebarOpen, toggleCartSidebar }
