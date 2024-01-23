'use client'
import { FeatureListSectionRecord } from "@/graphql/generated";
import { ReactNode } from "react";
import MinimalCardsFeature from "./MinimalCardsFeature";
import Features from "./Features";
import BigImageHorizontalFeatures from "./BigImageHorizontalFeatures";
import BigImageVerticalFeatures from "./BigImageVerticalFeatures";
import FeatureCards from "./FeatureCards";
import { useAuth } from "@clerk/nextjs";

type Props = {
  featureListSectionRecord: FeatureListSectionRecord
  slug: string;
};

const Index = ({ featureListSectionRecord, slug }: Props) => {

  const { isSignedIn } = useAuth();
  const { feature, featuresHeader, featuresSubheader, displayOption } = featureListSectionRecord;

  const displayContentMapper: { [key: string]: ReactNode } = {
    card_minimal: <MinimalCardsFeature features={feature} featuresHeader={featuresHeader} featuresSubheader={featuresSubheader} />,
    grid: <Features features={feature} featuresHeader={featuresHeader} featuresSubheader={featuresSubheader} />,
    big_image_horizontal: <BigImageHorizontalFeatures features={feature} featuresHeader={featuresHeader} featuresSubheader={featuresSubheader} />,
    big_image_vertical: <BigImageVerticalFeatures features={feature} featuresHeader={featuresHeader} featuresSubheader={featuresSubheader} />
  }

  if(slug === 'home' && !isSignedIn) return;

  return (
    <>
      {
        displayContentMapper[displayOption] || <FeatureCards features={feature} featuresHeader={featuresHeader} featuresSubheader={featuresSubheader} />
      }
    </>
  );
};

export default Index;
