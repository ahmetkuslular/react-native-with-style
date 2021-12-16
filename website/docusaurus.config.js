module.exports = {
  title: 'React Native With Styles',
  tagline:
    'A styling package for easily adding themes to your React Native projects. ',
  url: 'https://ahmetkuslular.github.io',
  baseUrl: '/rn-with-styles/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ahmetkuslular',
  projectName: 'rn-with-styles',
  themeConfig: {
    twitterImage: 'img/og.png',
    image: 'img/og.png',
    navbar: {
      title: 'React Native With Styles',
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/ahmetkuslular/rn-with-styles',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
