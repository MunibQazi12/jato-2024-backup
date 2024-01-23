import { AcategoryRecord, SiteLocale } from "@/graphql/generated";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  features: AcategoryRecord[];
  locale: SiteLocale
};

const AcategoryCards = ({
  features,
  locale
}: Props) => {
  return (
    <div className="mx-auto grid max-w-sm items-start gap-6 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
      {features.map((feature) => {
        return (
          <div
            key={feature.id}
            className="relative flex flex-col items-center justify-center rounded bg-white sm:p-6 p-4 shadow-xl h-80 dark:bg-subsectionBackground"
          >
            <div className="relative -mt-1 mb-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary bg-opacity-5">
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
            <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight dark:text-darktext">
              {feature.name}
            </h4>
            <div className="text-center text-gray-600 dark:text-darktext">
              <ReactMarkdown>
                {feature.description || ""}
              </ReactMarkdown>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AcategoryCards;
