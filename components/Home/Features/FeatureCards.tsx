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

const FeatureCards = ({
  features,
  featuresHeader,
  featuresSubheader,
}: Props) => {
  return (
    <section id="features" className="bg-white py-8 sm:py-10 lg:py-15 dark:bg-dark-background mt-12">
    
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h1 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-darktext sm:text-4xl md:text-[45px]">
              {featuresHeader}
            </h1>
            <div className="text-xl text-gray-600 dark:text-darktext">
              <ReactMarkdown>{featuresSubheader || ""}</ReactMarkdown>
            </div>
          </div>

          {/* Items */}
          <div className="mx-auto grid max-w-sm items-start gap-6 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            {/* 1st item */}

            {features.map((feature) => {
              return (
                <div
                  key={feature.id}
                  className="relative flex flex-col items-center justify-center rounded bg-white sm:p-6 p-4 shadow-xl h-80 dark:bg-subsectionBackground"
                >
                  <div className="relative -mt-1 mb-2 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary bg-opacity-5">
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
                  <h4 className="mb-1 text-xl font-bold leading-snug tracking-tight dark:text-darktext">
                    {feature.featureTitle}
                  </h4>
                  <div className="text-center text-gray-600 dark:text-darktext">
                    <ReactMarkdown>
                      {feature.featureDescription || ""}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
