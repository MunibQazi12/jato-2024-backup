import { AcategoryRecord, SiteLocale } from "@/graphql/generated";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  features: AcategoryRecord[];
  locale: SiteLocale
};

const BigImageVerticalAcategory = ({
  features,
  locale
}: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
      {features.map((feature) => {
        return (
          <div
            key={feature.id}
            className="group flex flex-col justify-center items-center overflow-hidden rounded-lg border dark:border-none bg-white dark:bg-gray-800"
          >
            {" "}
            <div className="group relative block h-48 w-full overflow-hidden bg-gray-100 md:h-64">
              <div className="absolute inset-0 h-full w-full overflow-hidden object-cover object-center transition duration-200 group-hover:scale-110">
                <Link href={`/${locale}/awards/acategory/${feature.slug}`}>
                  <DatoImage
                    className="h-full w-full object-cover"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="50% 50%"
                    data={feature.picture.responsiveImage}
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-darktext">
                <div className="transition duration-100 group-hover:text-primary dark:group-hover:text-toruquise h-14">
                  {feature.name}
                </div>
              </h2>

              <div className="mb-8 text-gray-500 dark:text-darktext">
                <ReactMarkdown>
                  {feature.description || ""}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BigImageVerticalAcategory;
