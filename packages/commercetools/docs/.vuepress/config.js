module.exports = {
  title: 'VSF Next',
  description: 'Vue Storefront 2 documentation',
  a: 'aa',
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
