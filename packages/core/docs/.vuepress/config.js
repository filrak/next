module.exports = {
  title: 'VSF Next',
  description: 'Vue Storefront 2 documentation',
  locales: {
    '/': {
      title: 'Vue Storefront Next',
      description: '',
      lang: 'en-US',
    },
    '/commercetools/': {
      title: 'Vue Storefront Commercetools',
      description: '',
      lang: 'en-US'
    }
  },
  themeConfig: {
    locales: {
      '/' : {
        selectText: 'eCommerce platform',
        label: 'Overview',
        sidebar: [
          {
            title: 'Contributing',
            collapsable: false,
            children: [
              ['/contributing/themes', 'Working with themes'],
            ],
          },
        ]
      },
      '/commercetools/' : {
        // text for the language dropdown
        selectText: 'eCommerce platform',
        // label for this locale in the language dropdown
        label: 'Commercetools',
        platformName: 'Commercetools',
        sidebar: [
          ['/commercetools/', 'Introduction'],
          {
            title: 'Essentials',
            collapsable: false,
            children: [
              ['/commercetools/getting-started', 'Getting Started'],
              ['/commercetools/api-client', 'API Client'],
            ],
          }
        ]
      }
    }
  }
}
