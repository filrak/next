module.exports = {
  title: 'VSF Next',
  description: 'Vue Storefront 2 documentation',
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    'commercetools': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    }
  },
  themeConfig: {
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/overview', 'Overview'],
          ['/getting-started', 'Getting started'],
          ['/api-client', 'API Client'],
        ],
      }, {
        title: 'Contributing',
        collapsable: false,
        children: [
          ['/contributing/themes', 'Working with themes'],
        ],
      },
    ]
  }
}
