import { TalkRecord, SiteLocale, SpeakerRecord } from "@/graphql/generated";
import SectionTitle from "../Common/SectionTitle";
import SingleTalk from "./SingleTalk";
import { Maybe } from "graphql/jsutils/Maybe";

type TalkProps = {
  talkData: TalkRecord[];
  talkHeader: string;
  talkSubheader: Maybe<string>;
  speakers?: SpeakerRecord[];
  locale: SiteLocale;
};

const Talk = ({ talkData, talkHeader, talkSubheader, locale }: TalkProps) => {
  return (
    <section
      id="blog"
      className="bg-primary bg-opacity-5 py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle title={talkHeader} paragraph={talkSubheader} center />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {talkData.map((talk) => (
            <div key={talk.id} className="w-full">
              <SingleTalk talk={talk} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Talk;
