import s from './Features.module.css'
import { Tab } from '@headlessui/react'
import Image from 'next/image'

const FeatureItem = () => {
  return (
    <Tab className={s.Tab}>
      <h2>
        <span className={s.TabTitle}>titl1 </span>
      </h2>
      <p className={s.TabDescription}>description1</p>
    </Tab>
  )
}

const FeaturePanel = ({ text }: { text: string | number }) => {
  return (
    <Tab.Panel>
      {text}
      <div className={s.featurePanelMobile}>
        <Image src="/payroll.webp" alt="demo" layout="intrinsic" height={1464} width={2174} />
      </div>
      <div className={s.featurePanel}>
        <Image src="/payroll.webp" alt="demo" layout="intrinsic" height={1464} width={2174} />
      </div>
    </Tab.Panel>
  )
}

export const Features = () => {
  return (
    <section className={s.Section}>
      <div className={s.Content}>
        <div className={s.TitleContainer}>
          <h2 className={s.Title}>Everything you need to experiment and evaluate pricing.</h2>
          <p className={s.Subtitle}>
            It doesn&apos;t have to be hard to create and run your pricing tests!
          </p>
        </div>
        <Tab.Group vertical>
          <div className={s.TabsContainer}>
            <Tab.List className={s.TabsList}>
              <div className={s.Tabs}>
                <FeatureItem />
                <FeatureItem />
                <FeatureItem />
              </div>
            </Tab.List>
            <Tab.Panels className={s.TabPanels}>
              <FeaturePanel text={1} />
              <FeaturePanel text={2} />
              <FeaturePanel text={3} />
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </section>
  )
}
