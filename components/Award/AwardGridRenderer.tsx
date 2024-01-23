import {
  CollectionMetadata,
  AwardRecord,
  SiteLocale,
} from "@/graphql/generated";
import PageIndicatorList from "./PageIndicatorList";
import SingleAward from "./SingleAward";
import Link from "next/link";

type Props = {
  data: AwardRecord[];
  lng: SiteLocale;
  awardMeta: CollectionMetadata;
};

const AwardGridRenderer = ({ data, lng, awardMeta }: Props) => {
  return (
    <section className="mt-4 lg:py-[120px] md:py-24 py-20 dark:bg-dark-background min-h-[calc(100vh-320px)]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {data.map((award) => (
            <div
              key={award.id}
              className="mb-10 w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
              <SingleAward award={award as AwardRecord} locale={lng} />
            </div>
          ))}
        </div>

        <div className=" -mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <ul className="flex items-center justify-center pt-8">
              <PageIndicatorList lng={lng} awardCount={awardMeta.count} />
              {9 < awardMeta.count && (
                <li className="mx-1">
                  <Link
                    href={`/${lng}/awards/page/2`}
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

export default AwardGridRenderer;
