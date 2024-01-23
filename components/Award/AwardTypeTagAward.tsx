import { AwardTagQuery, SiteLocale, ResponsiveImage } from "@/graphql/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";

type Props = {
  data: AwardTagQuery;
  lng: SiteLocale;
};

const TagAwards = ({ data, lng }: Props) => {
  if (!data.atag) {
    notFound();
  }
  return (
    <section className="lg:py-[32px] py-14 px-4 dark:bg-dark-background min-h-[calc(100vh-320px)]">
      <div className='flex width-full justify-center items-center gap-5 lg:py-16 py-8'>
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
          {data?.atag?.atag}
        </h1>
      </div>
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center gap-4">
          {
            data.atag["_allReferencingAwards"]?.map((singleAward: any, index: number) => {
              const { title = '', seoTags, jobTitle = '', slug } = singleAward;
              return (
                <div key={index} className="lg:w-[31%] md:w-[48%] w-full overflow-hidden group rounded-3xl bg-neutral-100 cursor-pointer relative">
                  <Link href={"/" + lng + "/awards/" + slug}>
                    <DatoImage
                      className="h-[280px] object-cover w-full transition duration-500 group-hover:scale-105"
                      objectFit="cover"
                      data={seoTags!.image!.responsiveImage as ResponsiveImage}
                    />
                    <div className="w-full h-full flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6 absolute top-0 left-0">
                      <p className="text-base font-semibold text-white tracking-wide">{title}</p>
                      <p className="text-sm text-white mt-2">{jobTitle}</p>
                    </div>
                  </Link>
                </div>
              );
            })
          }
        </div>
      </div>
    </section>
  );
};

export default TagAwards;
