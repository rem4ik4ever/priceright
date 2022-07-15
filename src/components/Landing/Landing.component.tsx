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

const HeroSection = () => {
  const { ref } = useTyped({
    strings: [
      'customer reach',
      'client engagement',
      'conversion',
    ],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
  })
  return (
    <div className='mx-auto container fadein'>
      <header className={s.header}>
        <Link href="/"><span className={s.logo}>Flows</span></Link>
      </header>
      <section className={clx(s.hero, 'fit')}>
        <div className="md:block hidden">
          <Image src={LeftSvg} alt="left-svg" width={380} />
        </div>
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>
            Email automation<br />
            to increase<br />
            <span className="text-orange" ref={ref}></span><br />
          </h1>
          <p className={s.subtitle}>
            Automate email marketing campaigns and make them look awesome for your clients
          </p>
          <SubscribeForm />
        </div>
        <div className="md:block hidden">
          <Image src={RightSvg} alt="right-svg" width={380} />
        </div>
        <div className='block md:hidden'>
          <Image src={MobileSvg} alt="right-svg" width={220} height={220} />
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

interface FeatureItemProps {
  id: number;
  imgSrc: string;
  title: string;
  description: string
}
const FeatureItem: React.FC<FeatureItemProps> = ({ id, imgSrc, title, description }) => {
  const isEven = id % 2 === 0;
  return (
    <div className='flex md:flex-row flex-col md:items-stretch items-center justify-center gap-2 md:mb-0 md:h-auto h-[70vh]'>
      <div className={clx(isEven ? 'md:order-3' : 'md:order-1', s.featureItemTextContainer)}>
        <div className={clx(s.featureItemText)}>
          <h6 className="text-3xl text-orange-light py-2 font-bold">{title}</h6>
          <p className="text-lg">{description}</p>
        </div>
      </div>
      <div className="md:flex hidden order-2 border border-accent-6 items-center mx-8">
        <div className="absolute bg-orange-light py-2 px-4 rounded-full -ml-5">{id}</div>
      </div>
      <div className={clx(s.featureItemImageContainer, isEven ? 'md:order-1' : 'md:order-3', isEven ? 'bg-accent-2' : 'bg-dark-blue')}>
        <Image src={imgSrc} alt="title" width={400} height={400} />
      </div>
    </div>
  )
}

const Features = () => {
  const features: FeatureItemProps[] = React.useMemo(() => ([
    {
      id: 1,
      imgSrc: projectComplete,
      title: "Create awesome forms",
      description: 'Signups, onboardings, newsletters, subscription made easy!'
    },
    {
      id: 2,
      imgSrc: designInspiration,
      title: "Design campaign and emails",
      description: 'With simple drag and drop craft beautiful email campaigns that drive client engagement!'
    },
    {
      id: 3,
      imgSrc: dataReport,
      title: "Analytics and reports",
      description: 'Make data driven decisions! Experiment and see what makes clients excited and more engaged with the product!'
    },
    {
      id: 4,
      imgSrc: thoughProcess,
      title: "Create your own email flows",
      description: 'Create and reuse your custom email flows '
    }
  ]), [])
  return (
    <section className={s.featuresSection}>
      <div className="mx-auto container py-8 flex flex-col items-center">
        <span className="text-orange font-bold">Features</span>
        <h2 className={s.featuresTitle}>Solutions your business needs</h2>
        <div className='flex flex-col items-center'>
          {features.map(feature => (
            <FeatureItem {...feature} key={feature.id} />
          ))}
        </div>
      </div>
    </section>
  );
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
