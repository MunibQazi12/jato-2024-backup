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

const BigImageHorizontalFeatures = ({
  features,
  featuresHeader,
  featuresSubheader,
}: Props) => {
  return (
    <div className="bg-white py-8 sm:py-10 lg:py-15 dark:bg-dark-background mt-12">
      <div className="py-12 md:py-20 mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-darktext md:mb-6 lg:text-3xl">
            {featuresHeader}
          </h2>

          <div className="mx-auto max-w-screen-md text-center text-gray-500 dark:text-darktext md:text-lg">
            <ReactMarkdown>{featuresSubheader || ""}</ReactMarkdown>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
          {features.map((feature) => {
            return (
              <div
                key={feature.id}
                className="group flex flex-col items-center overflow-hidden rounded-lg border md:flex-row"
              >
                {" "}
                <div className="relative block h-48 w-full shrink-0 self-start overflow-hidden md:h-full md:w-32 lg:w-48">
                  <div className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110">
                    <Link href={feature?.link || '#'}>
                      <DatoImage
                        data={feature.featureIcon.responsiveImage}
                        className="h-full w-full object-contain"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4 lg:p-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-darktext">
                    <div className="transition duration-100 group-hover:text-primary dark:group-hover:text-toruquise h-14">
                      {feature.featureTitle}
                    </div>
                  </h2>

                  <div className="text-gray-500 dark:text-darktext">
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

export default BigImageHorizontalFeatures;
