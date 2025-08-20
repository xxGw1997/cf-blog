'use client'

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./ClientComponent"), {
  ssr: false,
});

const Page = () => {
  return <DynamicComponentWithNoSSR />;
};

export default Page;
