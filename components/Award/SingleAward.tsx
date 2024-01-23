import { AwardRecord, ResponsiveImage, SiteLocale } from "@/graphql/generated";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";

type Props = {
  award: AwardRecord; //
  locale: SiteLocale;
};

const SingleAward = ({ award, locale }: Props) => {
  const { title, seoTags, acategory, atags, slug, jobTitle } = award;

  return (
    <>
      <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-one dark:bg-dark">
        <div className="relative block h-[230px] w-full overflow-hidden">
          {/* <Link href={"/" + locale + "/awards/atag/" + atags[0].slug}>
            <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
              {atags[0].atag}
            </span>
          </Link> */}
          <Link href={"/" + locale + "/awards/" + slug}>
            <div className="relative h-full w-full overflow-hidden">
              <DatoImage
                className="h-full w-full object-contain"
                layout="fill"
                objectFit="cover"
                objectPosition="50% 50%"
                data={seoTags!.image!.responsiveImage as ResponsiveImage}
              />
            </div>
          </Link>
        </div>

        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <Link href={"/" + locale + "/awards/" + slug}>
            <h3
              className="dark:text-blue mb-4 block text-xl text-black dark:text-darktext hover:text-primary dark:hover:text-toruquise text-center"
            >
              {title}
            </h3>
            <p className="text-sm dark:text-darktext text-center">{jobTitle}</p>
          </Link>
          <div className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10" />
          <div className="flex h-full items-center justify-center">
            <Link
              href={`/${locale}/awards/acategory/${acategory?.slug}`}
              className="flex items-center dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5"
            >
              <div className="mr-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full object-contain">
                  <DatoImage
                    className="h-full w-full object-cover"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 50%"
                    data={acategory!.picture.responsiveImage}
                  />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-darktext">
                  {acategory?.name}
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleAward;
