import { FeatureRecord, SiteLocale } from "@/graphql/generated";
import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  features: FeatureRecord[];
  featuresHeader: string;
  featuresSubheader: Maybe<string>;
};

const BigImageVerticalFeatures = ({
  features,
  featuresHeader,
  featuresSubheader,
}: Props) => {
  return (
    <div className="bg-white py-8 sm:py-10 lg:py-15 dark:bg-dark-background mt-12">
      <div className="py-12 md:py-20  mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="md:mb-16 sm:mb-10 mb-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-darktext md:mb-6 lg:text-3xl">
            {featuresHeader}
          </h2>

          <div className="mx-auto max-w-screen-md text-center text-gray-500 dark:text-darktext md:text-lg">
            <ReactMarkdown>{featuresSubheader || ""}</ReactMarkdown>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {features.map((feature) => {
            return (
              <div
                key={feature.id}
                className="group flex flex-col overflow-hidden rounded-lg border dark:border-none bg-white dark:bg-gray-800"
              >
                {" "}
                <div className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
                  <div className="absolute inset-0 h-full w-full overflow-hidden object-cover object-center transition duration-200 group-hover:scale-110">
                    <Link href={feature?.link || '#'}>
                      <DatoImage
                        className="h-full w-full object-cover"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="50% 50%"
                        data={feature.featureIcon.responsiveImage}
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-darktext">
                    <div className="transition duration-100 group-hover:text-primary dark:group-hover:text-toruquise h-14">
                      {feature.featureTitle}
                    </div>
                  </h2>

                  <div className="mb-8 text-gray-500 dark:text-darktext">
                    <ReactMarkdown>
                      {feature.featureDescription || ""}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BigImageVerticalFeatures;
