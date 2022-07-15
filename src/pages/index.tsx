import { Landing } from "@components/Landing";
import type { NextPage } from "next";
import { DefaultSeo } from 'next-seo'
import defaultSeo from '../seo'


const Home: NextPage = () => {
  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <Landing />
    </>
  );
};

export default Home;
