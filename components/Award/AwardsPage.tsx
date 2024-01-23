import PageIndicatorList from "@/components/Award/PageIndicatorList";
import { AwardRecord, AwardsQuery, SiteLocale } from "@/graphql/generated";
import SingleAward from "./SingleAward";
import Link from "next/link";

type Props = {
  data: AwardsQuery;
  lng: SiteLocale;
  page: number;
};

const AwardsPage = ({ data, lng, page }: Props) => {
  return (
    <section className="pb-[120px] pt-[120px] min-h-[calc(100vh-320px)]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {data.allAwards.map((award) => (
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
              {page > 0
                ? <li className="mx-1">
                  <Link
                    href={
                      page - 1 === 1
                        ? `/${lng}/awards`
                        : `/${lng}/awards/page/${+page - 1}`
                    }
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Prev
                  </Link>
                </li>
                : null}
              <PageIndicatorList
                lng={lng}
                awardCount={data["_allAwardsMeta"].count}
              />
              {page * 9 <= data["_allAwardsMeta"].count && (
                <li className="mx-1">
                  <Link
                    href={`/${lng}/awards/page/${+page + 1}`}
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

export default AwardsPage;
