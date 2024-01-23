import {
  CollectionMetadata,
  TalkRecord,
  SiteLocale,
} from "@/graphql/generated";
import PageIndicatorList from "./PageIndicatorList";
import SingleTalk from "./SingleTalk";
import DateTab from "./DateTab";
import Link from "next/link";

type Props = {
  data: TalkRecord[];
  lng: SiteLocale;
  talkMeta: CollectionMetadata;
};

const TalkGridRenderer = ({ data, lng, talkMeta }: Props) => {
  return (
    <section className="mt-4 lg:py-[120px] md:py-24 py-20 dark:bg-dark-background">
      <div className="container ">
        <div className="flex xl:justify-between justify-center xl:flex-row flex-col">
          <div className="-mx-4 flex h-auto xl:flex-col flex-row xl:justify-start items-start justify-center xl:w-1/5 w-full relative">
            <div className="relative xl:block flex xl:w-auto w-full">
            </div>
          </div>
          <div className="-mx-4 flex h-full flex-wrap xl:w-4/5 w-full lg:justify-between justify-center">
            {data.map((talk) => {
              return (
                <div
                  key={talk.id}
                  className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 xl:mb-0 mb-10"
                >
                  <SingleTalk talk={talk as TalkRecord} locale={lng} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <ul className="flex items-center justify-center pt-8">
              <PageIndicatorList lng={lng} talkCount={talkMeta.count} />
              {9 < talkMeta.count && (
                <li className="mx-1">
                  <Link
                    href={`/${lng}/talks/page/2`}
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Next
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalkGridRenderer;
