// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/palenight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Netdata Blog',
  tagline: 'Home of the Netdata blog.',
  url: 'https://blog.netdata.cloud',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon-32x32.png',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          routeBasePath: '/', 
          showReadingTime: true,
          blogTitle: 'Netdata Blog',
          blogDescription: 'Home of the Netdata blog about monitoring and troubleshooting.',
          blogSidebarTitle: 'Blog Posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
          feedOptions: {
            type: 'all',
            title: 'Netdata Blog',
            description: 'Home of the Netdata blog about monitoring and troubleshooting.',
            language: 'en',
            copyright: `Copyright © ${new Date().getFullYear()} Netdata`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  stylesheets: [
    {
        href: '/font/ibm-plex-sans-v8-latin-regular.woff2',
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        crossorigin: '',
    },
    {
        href: '/font/ibm-plex-sans-v8-latin-500.woff2',
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        crossorigin: '',
    },
    {
        href: '/font/ibm-plex-sans-v8-latin-700.woff2',
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        crossorigin: '',
    },
    {
        href: '/font/ibm-plex-mono-v6-latin-regular.woff2',
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        crossorigin: '',
    },
  ],

  plugins: [
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'UA-64295674-3'
      },
    ],
    [
      "posthog-docusaurus",
      {
        apiKey: 'phc_hnhlqe6D2Q4IcQNrFItaqdXJAxQ8RcHkPAFAp74pubv',
        appUrl: 'https://app.posthog.com',
        enableInDevelopment: false,
        opt_in_site_apps: true,
      }
    ],
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      //colorMode: {
      //  defaultMode: 'dark',
      //  disableSwitch: false,
      //  respectPrefersColorScheme: false,
      //},
      metadata: [{name: 'keywords', content: 'netdata, monitoring, troubleshooting, servers'}],
      navbar: {
        title: '',
        logo: {
          alt: 'Netdata',
          src: 'img/logo.svg',
        },
        items: [
            {
                to: 'https://www.netdata.cloud/',
                label: 'Website',
                position: 'left',
              },
              {
                to: 'https://learn.netdata.cloud/',
                label: 'Learn',
                position: 'left',
              },
              {
                to: 'https://community.netdata.cloud/',
                label: 'Community',
                position: 'left',
              },
              {
                to: 'https://app.netdata.cloud/',
                label: 'App',
                position: 'left',
              },
              {
                to: 'https://app.netdata.cloud/',
                label: 'Sign In',
                position: 'right',
              },
        ],
      },
      footer: {
        style: 'dark',
        links: [
            {
                title: 'Products',
                items: [
                    {
                        label: 'Agent',
                        to: 'https://netdata.cloud/agent',
                    },
                    {
                        label: 'Cloud',
                        to: 'https://netdata.cloud/cloud',
                    },
                    {
                        label: 'Integrations',
                        to: 'https://www.netdata.cloud/integrations/',
                    },
                    {
                        label: 'Status',
                        to: 'https://status.netdata.cloud',
                    },
                ],
            },
            {
                title: 'Resources',
                items: [
                    {
                        label: 'Learn',
                        to: '/',
                    },
                    {
                        label: 'Blog',
                        to: 'https://netdata.cloud/blog',
                    },
                    {
                        label: 'GitHub',
                        to: 'https://github.com/netdata/netdata',
                    },
                ],
            },
            {
                title: 'Community',
                items: [
                    {
                        label: 'Overview',
                        to: 'https://www.netdata.cloud/community-overview/',
                    },
                    {
                        label: 'Forums',
                        to: 'https://community.netdata.cloud/',
                    },
                ],
            },
            {
                title: 'Company',
                items: [
                    {
                        label: 'About',
                        to: 'https://netdata.cloud',
                    },
                    {
                        label: 'News',
                        to: 'https://www.netdata.cloud/news/',
                    },
                    {
                        label: 'Careers',
                        to: 'https://careers.netdata.cloud/',
                    },
                ],
            },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Netdata, Inc.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    algolia: {
      appId: 'OW5U4HGY60',
      apiKey: '88d7f50e0c04e9d7c599c9023e205234',
      indexName: 'netlify_b51bd178-bf1c-47d6-8a6d-2a8873c97ded_master_all',
      contextualSearch: true,
    },
    }),
};

module.exports = config;