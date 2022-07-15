import {DefaultSeoProps} from 'next-seo'
const defaultSeo: DefaultSeoProps = {
  title: 'Email automation for your business',
  description: 'Automate email marketing campaigns and make them look awesome for your clients',
  titleTemplate: '%s - Flows',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.flows.so/',
    site_name: 'Flows',
    images: [
      {
        url: 'https://www.flows.so/og_image_800_600_dark.png',
        width: 800,
        height: 600,
        alt: 'Flows OG dark',
      },
      {
        url: 'https://www.flows.so/og_image_800_600.png',
        width: 800,
        height: 600,
        alt: 'Flows OG',
      },
      {
        url: 'https://www.flows.so/og_image_800_600_alt_1.png',
        width: 800,
        height: 600,
        alt: 'Flows OG white',
      }
    ]
  },
  twitter: {
    handle: '@TheRealRemKim',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default defaultSeo
