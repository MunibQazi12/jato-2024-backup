import { AwardRecord, SiteLocale } from "@/graphql/generated";
import SectionTitle from "../Common/SectionTitle";
import SingleAward from "./SingleAward";
import { Maybe } from "graphql/jsutils/Maybe";

type AwardProps = {
  awardData: AwardRecord[];
  awardHeader: string;
  awardSubheader: Maybe<string>;
  locale: SiteLocale;
};

const Award = ({
  awardData,
  awardHeader,
  awardSubheader,
  locale,
}: AwardProps) => {
  return (
    <section
      id="award"
      className="bg-primary bg-opacity-5 py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle title={awardHeader} paragraph={awardSubheader} center />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {awardData.map((award) => (
            <div key={award.id} className="w-full">
              <SingleAward award={award} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Award;
