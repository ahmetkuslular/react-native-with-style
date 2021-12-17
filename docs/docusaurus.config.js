module.exports = {
  title: 'React Native With Style',
  tagline:
    'A styling package for easily adding themes to your React Native projects. ',
  url: 'https://ahmetkuslular.github.io',
  baseUrl: '/react-native-with-style/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ahmetkuslular',
  projectName: 'react-native-with-style',
  themeConfig: {
    twitterImage: 'img/socialImage.png',
    image: 'img/socialImage.png',
    navbar: {
      title: 'React Native With Style',
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/ahmetkuslular/react-native-with-style',
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
