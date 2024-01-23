'use client'
import SvgRenderer from "../../Common/SvgRenderer";
import { FeatureRecord } from "@/graphql/generated";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  feature: FeatureRecord;
};

const SingleFeature = ({ feature }: Props) => {
  const { featureIcon, featureTitle, featureDescription, link } = feature;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center sm:px-16  text-center  md:px-0">
        <div className="relative mb-10 flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-md bg-primary bg-opacity-10 text-primary">
          <Link href={link || '#'}>
            <DatoImage
              data={featureIcon.responsiveImage}
              className="h-full w-full object-contain"
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
            />
          </Link>
        </div>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-darktext sm:text-2xl lg:text-xl xl:text-2xl">
          {featureTitle}
        </h3>
        <div className="text-base font-medium leading-relaxed text-body-color dark:text-darktext">
          <ReactMarkdown>{featureDescription || ""}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;
