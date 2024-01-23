import {
  AwardQuery,
  SiteLocale,
} from "@/graphql/generated";
import Link from "next/link";
import { notFound } from "next/navigation";
import EmbededIframe from "@/components/IFrame/EmbededIframe";
import StructuredTextSection from "./StructuredTextBlocks";

type Props = {
  data: AwardQuery;
  lng: SiteLocale;
};

const Award = ({ data, lng }: Props) => {
  if (!data.award) notFound();

  return (
    <section className="pt-[100px] pb-20 bg-[#F7F9FA] dark:bg-dark-background min-h-[calc(100vh-320px)]">
      <div className="container">
        <div className="flex flex-wrap justify-center pb-5">
          <div className="w-full sm:px-4 lg:w-full">
            <div className="lg:mb-10 mb-6 flex justify-center pb-4">
              <Link
                href={`/${lng}/awards/acategory/${data.award.acategory?.slug}`}
              >
                <div className='flex w-full justify-center items-center gap-4'>
                  <svg
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="none"
                    strokeWidth={'20'}
                    className="lg:h-10 sm:h-8 h-6 lg:w-10 sm:w-8 w-6 stroke-primary opacity-90">
                    <path
                      d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z" />
                  </svg>
                  <h1 className="text-center xs:text-2xl text-xl font-semibold text-gray-800 dark:text-darktext lg:text-4xl">
                    {data?.award.acategory?.name}
                  </h1>
                </div>
              </Link>
            </div>
            <div className="flex flex-col md:items-start items-center justify-center sm:gap-8 gap-5 text-center md:flex-row md:text-start">
              <div className="relative sm:w-56 w-full overflow-hidden rounded-xl drop-shadow-xl md:w-72 lg:w-96">
                <StructuredTextSection data={data.award.content} lng={lng} />
              </div>
              <div className="xl:mx-4 xl:w-1/2">
                <h2 className="text-3xl font-bold leading-tight text-black dark:text-darktext sm:text-4xl sm:leading-tight">
                  {data?.award?.title}
                </h2>
                <p className="mb-3 text-sm font-bold leading-tight text-black dark:text-darktext sm:leading-tight">
                  {data?.award?.jobTitle}
                </p>
                <StructuredTextSection data={data.award.biography} lng={lng} />
                <div className="my-4 flex xl:items-center justify-between  dark:border-white dark:border-opacity-10">
                  <div className="">
                    <Link
                      href={`/${lng}/awards/atag/${data?.award?.atags[0]?.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      {data?.award?.atags[0].atag}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="block text-lg mt-4 mb-4 ml-0 mr-0 font-bold text-center text-gray-800 dark:text-darktext">
          {"Comments"}
        </h4>
        {
          data?.award?.iframe
            ? <EmbededIframe iframeUrl={data?.award?.iframe || ''} iframeHeight={100} />
            : null
        }
      </div>
    </section>
  );
};

export default Award;
