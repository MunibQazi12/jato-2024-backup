import { TalkRecord, SiteLocale, DatetagQuery } from "@/graphql/generated";
import { notFound } from "next/navigation";
import SingleTalk from "./SingleTalk";

type Props = {
  data: DatetagQuery;
  lng: SiteLocale;
};

const DateTagTalks = ({ data, lng }: Props) => {
  if (!data.dateTag) {
    notFound();
  }
  return (
    <section className="py-[32px] dark:bg-dark-background">
      <div className="width-full flex items-center justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-16 w-16 stroke-primary opacity-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6h.008v.008H6V6z"
          />
        </svg>
        <h1 className="my-24 text-center text-2xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
          {data.dateTag.eventDate}
        </h1>
      </div>

      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {data.dateTag["_allReferencingTalks"].map((talk) => (
            <div
              key={talk.id}
              className="mb-10 w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
              <SingleTalk talk={talk as TalkRecord} locale={lng} />
            </div>
          ))}
        </div>

        <div className="-mx-4 flex flex-wrap"></div>
      </div>
    </section>
  );
};

export default DateTagTalks;
