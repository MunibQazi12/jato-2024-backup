import { AcategoryRecord, SiteLocale } from "@/graphql/generated";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  features: AcategoryRecord[];
  locale: SiteLocale
};

const MinimalCardsAcategory = ({
  features,
  locale
}: Props) => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 md:gap-6 xl:gap-8">
      {
        features.map((feature) => {
          return (
            <div
              key={feature.id}
              className="mt-16 w-full max-w-md rounded-lg bg-white sm:px-8 px-4 py-4 shadow-lg dark:bg-gray-800"
            >
              <div className="-mt-16 flex justify-center md:justify-end">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary object-cover">
                  <Link href={`/${locale}/awards/acategory/${feature.slug}`}>
                    <DatoImage
                      data={feature.picture.responsiveImage}
                      className="h-full w-full object-contain"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 50%"
                    />
                  </Link>
                </div>
              </div>

              <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-darktext md:mt-0">
                {feature.name}
              </h2>

              <div className="mt-2 text-sm text-gray-600 dark:text-darktext">
                <ReactMarkdown>{feature.description || ""}</ReactMarkdown>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default MinimalCardsAcategory;
