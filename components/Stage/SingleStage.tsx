import { SiteLocale, StageRecord } from "@/graphql/generated";
import transformDate from "@/utils/transformDate";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";

type Props = {
  stage: StageRecord; //
  locale: SiteLocale;
};

const SingleStage = ({ stage, locale }: Props) => {
  const { name, _publishedAt, slug } = stage;

  return (
    <>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h3>
          <Link
            href={"/" + locale + "/stage/" + slug}
            className="mb-4 block h-16 text-xl text-black hover:text-primary dark:text-white dark:hover:text-toruquise"
          >
            {name}
          </Link>
        </h3>
        <div className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10" />
        <div className="inline-block">
          <div className="text-xs text-body-color">
            {transformDate(_publishedAt)}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleStage;
