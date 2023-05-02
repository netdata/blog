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
  trailingSlash: true,
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

  scripts: [
    {
      'src': 'https://giscus.app/client.js',
      'data-repo': 'netdata/blog',
      'data-repo-id': 'MDEwOlJlcG9zaXRvcnkxNjg4NjY1MDU=',
      'data-category': 'General',
      'data-category-id': 'DIC_kwDOChCyyc4CSXx_',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'preferred_color_scheme',
      'data-lang': 'en',
      'crossorigin': 'anonymous',
      async: true,
    },

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
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-J69Z2JCTFB',
      },
    ],
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-N6CBMJD',
      },
    ],
    [
      "posthog-docusaurus",
      {
        apiKey: 'phc_hnhlqe6D2Q4IcQNrFItaqdXJAxQ8RcHkPAFAp74pubv',
        appUrl: 'https://app.posthog.com',
        enableInDevelopment: true,
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
          alt: 'Netdata Logo',
          src: 'img/logo-letter-green-white.svg',
          height: 145
        },
        items: [
          {
            to: 'https://www.netdata.cloud/features/',
            position: 'left',
            label: 'Features',
            style: {'font-weight': '500'}
          },
          {
            to: 'https://www.netdata.cloud/open-source/',
            position: 'left',
            label: 'Open Source',
            style: {'font-weight': '500'}
          },
          {
            to: 'https://www.netdata.cloud/pricing/',
            position: 'left',
            label: 'Pricing',
            style: {'font-weight': '500'}
          },
          {
            to: 'https://www.netdata.cloud/integrations/',
            position: 'left',
            label: 'Integrations',
            style: {'font-weight': '500'}
          },
          {
            position: 'left',
            label: 'Use cases',
            style: {'font-weight': '500'},
            items: [
              {
                label: 'Response Time',
                style: {'color': 'white'},
                to: 'https://www.netdata.cloud/response-time-monitoring/'
              },
              {
                label: 'Cloud',
                style: {'color': 'white'},
                to: 'https://www.netdata.cloud/cloud-monitoring/',
              },
              {
                label: 'Web Servers',
                style: {'color': 'white'},
                to: 'https://www.netdata.cloud/webserver-monitoring/',
              },
              {
                label: 'Containers',
                style: {'color': 'white'},
                to: 'https://www.netdata.cloud/container-monitoring/',
              }
            ]
          },
          {
            position: 'left',
            label: 'Resources',
            style: {'font-weight': '500'},
            items: [
              {
                to: 'https://learn.netdata.cloud/',
                style: {'color': 'white'},
                label: 'Documentation'
              },
              {
                to: 'https://learn.netdata.cloud/docs/getting-started',
                style: {'color': 'white'},
                docId: 'getting-started/getting-started',
                label: 'Getting Started'
              },
              {
                label: 'Community',
                style: {'color': 'white'},
                to: 'https://www.netdata.cloud/community/',
              },
              {
                label: 'About',
                style: {'color': 'white'},
                to: 'https://www.netdata.cloud/about/',
              },
              {
                label: 'Forums',
                style: {'color': 'white'},
                to: 'https://community.netdata.cloud/',
              },
              {
                label: 'Blog',
                style: {'color': 'white'},
                to: '/',
              },
              {
                label: 'Roadmap',
                style: {'color': 'white'},
                to: 'https://www.netdata.cloud/roadmap/'
              },
              {
                label: 'Videos',
                style: {'color': 'white'},
                to: 'https://www.youtube.com/c/Netdata/'
              },
            ]
          },
          
          {
            to: 'https://app.netdata.cloud/spaces/netdata-demo?utm_source=learn&utm_content=top_navigation_demo',
            label: 'Live Demo',
            position: 'left',
            // style: {color : '#00ab44'},
            className: 'custom_text',
            style: {'font-weight': '500'}
          },
          {
            to: 'https://app.netdata.cloud/',
            label: 'Login',
            position: 'right',
            className: 'button custom_button_grey',
            style: {'font-weight': '500'}
          },
          {
            to: 'https://app.netdata.cloud/?utm_source=learn&utm_content=top_navigation_sign_up',
            label: 'Sign Up',
            position: 'right',
            className: 'button custom_button',
            style: {'font-weight': '500'}
  
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Netdata, Inc.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    }),
};

module.exports = config;
