<template>
<div>
  <h1>API Client</h1>
  <Block type="tip" title="Installation">
    If you want to learn how to install the API Client check our <a href="/getting-started">getting Started guide</a>
  </Block>
  <p>
    API Client is a data layer of your eCommerce integration. It provides a friendly abstraction layer over network calls to your eComemrce platform.
    It expresses each network request as a declarative method like <code>getProduct</code> or <code>getCategory</code>.
  </p>
  <p>
    By having this additional layer we can hide implementation details of <b>how</b> we get the data which gives you freedom to introduce major changes in this layer without influencing other parts of the app.
    If you want to change the way you're getting certain types of data - for example switch from REST API to GraphQL or fetch product reviews from external service you can easily do that without introducing breaking changes in the UI layer and composition API functions <b>as long as your method will keep the same interface</b>.
  </p>
  <p>
    API Client is a Vanilla JavaScript application and it doesn't require any frontend framework to run.
  </p>
  <ul>
    <li><a href="#configuration">Configuration in Vue Storefront Theme</a></li>
    <li><a href="#methods">Methods</a></li>
    <li><a href="#overriding">Overriding API Client methods</a></li>
  </ul>
  <h2 id="configuration">Configuration</h2>
  <p>
    <Block type="danger" title="Storing credentials">
      <b>Never</b> pass fragile data like API Client secrets as plain strings. Use env variables instead!
    </Block>
    <code>Setup</code> method is responsible for configuring the API Client of your integration.
  </p>
  <Content slot-key="setup"/>
  <h2>Methods</h2>
    <Content slot-key="methods"/>
  <h2>Overriding API Client methods</h2>
</div>
</template>
