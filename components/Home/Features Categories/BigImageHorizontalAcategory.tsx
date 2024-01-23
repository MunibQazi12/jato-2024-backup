import { AcategoryRecord, SiteLocale } from "@/graphql/generated";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  features: AcategoryRecord[];
  locale: SiteLocale
};

const BigImageHorizontalAcategory = ({
  features,
  locale
}: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
      {features.map((feature) => {
        return (
          <div
            key={feature.id}
            className="group flex flex-col justify-center items-center overflow-hidden rounded-lg border md:flex-row"
          >
            {" "}
            <div className="relative block h-48 w-full shrink-0 self-start overflow-hidden md:h-full md:w-32 lg:w-48">
              <div className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110">
              <Link href={`/${locale}/awards/acategory/${feature.slug}`}>
                  <DatoImage
                    data={feature.picture.responsiveImage}
                    className="h-full w-full object-contain"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="50% 50%"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 lg:p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-darktext">
                <div className="transition duration-100 group-hover:text-primary dark:group-hover:text-toruquise h-14">
                  {feature.name}
                </div>
              </h2>

              <div className="text-gray-500 dark:text-darktext">
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

export default BigImageHorizontalAcategory;
