import {DefaultSeoProps} from 'next-seo'
const defaultSeo: DefaultSeoProps = {
  title: 'Product pricing A/B testing',
  description: 'We help you run tests and make data driven decision to pick the right price for your product!',
  titleTemplate: '%s - PriceRight',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.priceright.so/',
    site_name: 'Flows',
    images: [
      {
        url: 'https://www.priceright.so/og_image_800_600_dark.png',
        width: 800,
        height: 600,
        alt: 'PriceRight OG dark',
      },
      {
        url: 'https://www.priceright.so/og_image_800_600.png',
        width: 800,
        height: 600,
        alt: 'PriceRight OG',
      },
      {
        url: 'https://www.priceright.so/og_image_800_600_alt_1.png',
        width: 800,
        height: 600,
        alt: 'PriceRight OG white',
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
