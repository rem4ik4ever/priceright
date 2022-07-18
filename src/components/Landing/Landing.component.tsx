import React, { FormEvent, useCallback, useState } from 'react';
import Link from 'next/link'
import Button from '../ui/Button'
import Input from '../ui/Input'
import s from './landing.module.css'
import clx from 'classnames'
import RightSvg from '../../assets/undraw_well_done_re_3hpo.svg'
import LeftSvg from '../../assets/undraw_projections_re_ulc6.svg'
import MobileSvg from '../../assets/undraw_email_campaign_re_m6k5.svg'
import dataReport from '../../assets/data-report.svg'
import designInspiration from '../../assets/design-inspiration.svg'
import projectComplete from '../../assets/project-complete.svg'
import thoughProcess from '../../assets/thought-process.svg'
import Image from 'next/image'
import useTyped from '@components/useTyped';
import { trpc } from 'src/utils/trpc';
import { Tab } from '@headlessui/react'
import { Features } from './Features';

const HeroSection = () => {
  //const { ref } = useTyped({
  //  strings: [
  //    'customer reach',
  //    'client engagement',
  //    'conversion',
  //  ],
  //  typeSpeed: 50,
  //  backSpeed: 50,
  //  backDelay: 1500,
  //  loop: true,
  //})
  return (
    <div className='mx-auto container fadein'>
      <header className={s.header}>
        <Link href="/"><span className={s.logo}><span className='text-accent-5'>Price</span>Right</span></Link>
      </header>
      <section className={clx(s.hero, 'fit')}>
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>
            Product pricing
            <span className='ml-2 relative'>
              <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-light" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg>
              <span className="text-orange relative">
                made simple
              </span>
            </span><br />
            for your business
          </h1>
          <p className={s.subtitle}>
            Product pricing can be hard. Our software makes it easy to experiment and find best price for your product.
          </p>
          <SubscribeForm />
        </div>
      </section>
    </div>
  )
}

const SubscribeForm = () => {
  const [email, setEmail] = useState('')
  const { isLoading, isSuccess, isError, error, mutateAsync, reset } = trpc.useMutation('public.subscribeEmail')
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    await mutateAsync({ email })
  }, [email])
  if (isSuccess) {
    return (
      <p className="flex justify-center py-4 text-dark-blue font-bold">
        Thank you for joining waitlist! ✅
      </p>
    )
  }
  if (isError) {
    return (
      <p className="flex flex-col md:flex-row justify-center items-center gap-2 py-4 text-red font-bold">
        <span>
          Something went wrong! Please try again
        </span>
        <Button type="button" variant="slim" onClick={reset}>Retry</Button>
      </p>
    )
  }
  return (
    <form className={s.subscribeForm} onSubmit={handleSubmit}>
      <Input type="email" value={email} onChange={setEmail} placeholder='Enter your email*' required />
      <Button type="submit" variant='slim' className='whitespace-nowrap' loading={isLoading} disabled={isLoading}>JOIN WAITLIST</Button>
    </form>

  )
}

const Footer = () => {
  return (
    <footer className="container mx-auto flex py-4 my-8 gap-8 justify-center md:flex-row flex-col md:p-0 p-4">
      <div>
        <h4 className="text-4xl font-bold">Go with the flow</h4>
        <SubscribeForm />
      </div>
      <div className="">
        <Link href="/"><span className={clx(s.logo, 'text-4xl')}>Flows</span></Link>
        <p className="text-lg max-w-xs">
          Automate email marketing campaigns and make them look awesome for your clients
        </p>
      </div>
    </footer>
  );
}



export const Landing = () => {
  return <div>
    <HeroSection />
    <Features />
    <Footer />
  </div>
}
