<template>
  <div>
    <h1>Working with themes</h1>
    <p>
      For core development purposes we aim to have only one default theme. 
      Thanks to that we have <b>much</b> less code to maintain, can apply changes faster and maintain same quality across every platform themes.
    </p>
    <Block type="warning" title="Note on core VS project themes">
      Core Development Theme and Project Themes are looking different. Core development Theme is a <b>base</b> for a project (client) theme that is generated through CLI.
      CLI concatenates default theme from nuxt module with integration-specific files and outputs a regular Nuxt project conatining all of that files. For client projects there is no inheritance mechanism. 
    </Block>
    <p>
      Because of that it's very important to <b>keep the agnostic APIs in default themes</b>. Clients can do whatever they want in their projects but we should keep agnosticity for maintanance purposes.
    </p>
    <p>Default theme is located under 
    <h2>Overriding default theme files</h2>
  </div>
</template>