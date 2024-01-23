import { FeatureRecord } from "@/graphql/generated";
import SectionTitle from "../../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import { Maybe } from "graphql/jsutils/Maybe";

type Props = {
    features: FeatureRecord[];
    featuresHeader: string;
    featuresSubheader: Maybe<string>;
};

const Features = ({ features, featuresHeader, featuresSubheader }: Props) => {
    return (
        <>
            <section
                id="features"
                className="bg-white py-8 sm:py-10 lg:py-15 dark:bg-dark-background mt-12"
            >
                <div className="container">
                    <div  className="py-12 md:py-20">
                        <SectionTitle
                            title={featuresHeader}
                            paragraph={featuresSubheader}
                            center
                        />

                        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => (
                                <SingleFeature key={feature.id} feature={feature} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
