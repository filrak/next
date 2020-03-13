<template>
<div>
  <h1>Getting started</h1>
  <p>
    <!-- put cli installation once we have cli -->
    To start working with Vue Storefront for {{ platformName }} you need two core packages to be installed. They will be used to integrate the eCommerce platform with your Vue Storefront application.
    <ul>
      <li><b>{{ platformName }} API Client</b> - A data layer of your application. It provides a friendly abstraction layer over network calls with some additional overriding capabilities. It can be used as it is in any JavaScript application but doesn't provide much value by itself. API Client is usually used in the combination with Composition Functions package and is not used directly in the UI layer.</li>
      <li><b>{{ platformName }} Composition Functions</b> - A set of composition functions allowing to interact with eCommerce logic in your Vue application that provides additional functionalities like Vue reactivity, SSR support, client-side request caching etc. This is the main integration package. It uses API Client under the hood.</li>
    </ul>
  <h2>Installation</h2>
  <h3>With Vue Storefront CLI (recommended)</h3>
  <Block type="tip" title="Best for new projects">
    If you're starting a new Vue Storefront project and you're ok with using Nuxt using CLI its the best option for you.
  </Block>
  <p>
    This is the easiest and fastest way of bootstrapping new Vue Storefront project.
    With Vue Storefront CLI you can generate preconfigured, working boilerplate shop in one minute!
  </p>
  <p>During the installation process you will be asked questions about:
    <ul>
      <li>eCommerce platform you want to use</li>
      <li>CMS platform</li>
      <li>Whether you want or doesn't want to generate a working UI layer based on Storefront UI</li>
    </ul>
  </p>
  <p>Based on provided answers Vue Storefront CLI will generate a project already integrated with the services that you have choosen.</p>
  <h3>Manual installation</h3>
  <Block type="tip" title="Best for already existing or non-Nuxt projects">
    If you want to incorporate certain Vue Storefront features into already existing Vue.js application or for some reason doesn't want to use Nuxt this is the right option for you.
  </Block>
  <p>First install the packages:</p>
  <Content slot-key="installation" />
  <p>
    Once it's installed you just need to invoke the <code>setup</code> method <b>before using any other method from API Client</b>. You can read how to configure it <router-link to="/api-client.html">here</router-link>.
  </p>
  <Content slot-key="setup" />
</div>
</template>

<script>
export default {
  props: ['platform-plugin-file', 'platform-name']
};
</script>
