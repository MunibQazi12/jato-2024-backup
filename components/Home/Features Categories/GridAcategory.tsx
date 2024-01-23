import { AcategoryRecord, SiteLocale } from "@/graphql/generated";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  features: AcategoryRecord[];
  locale: SiteLocale
};

const GridAcategory = ({ features, locale }: Props) => {

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {
        features.map((feature: AcategoryRecord) => {
          const { picture, name, description, slug, id } = feature;
          return (
            <div key={id} className="w-full">
              <div className="flex flex-col items-center justify-center sm:px-16  text-center  md:px-0">
                <div className="relative mb-10 flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-md bg-primary bg-opacity-10 text-primary">
                  <Link href={`/${locale}/awards/acategory/${slug}`}>
                    <DatoImage
                      data={picture.responsiveImage}
                      className="h-full w-full object-contain"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 50%"
                    />
                  </Link>
                </div>
                <h3 className="mb-5 text-xl font-bold text-black dark:text-darktext sm:text-2xl lg:text-xl xl:text-2xl">
                  {name}
                </h3>
                <div className="text-base font-medium leading-relaxed text-body-color dark:text-darktext">
                  <ReactMarkdown>{description || ""}</ReactMarkdown>
                </div>
              </div>
            </div>
          );
        })
      }

    </div>
  );
};

export default GridAcategory;
