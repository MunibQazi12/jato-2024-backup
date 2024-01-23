import { getFallbackLocale } from "@/app/i18n/settings";
import AwardCategory from "@/components/Award/AwardCategoryAwards";
import RealTimeAwardCategoryAwards from "@/components/Award/RealTime/RealTimeAwardCategoryAwards";
import { AwardCategoryDocument, SiteLocale } from "@/graphql/generated";
import queryDatoCMS from "@/utils/queryDatoCMS";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
    lng: SiteLocale;
  };
};

const ACategoryPage = async ({ params }: Params) => {
  const fallbackLng = await getFallbackLocale();
  const { lng } = params;
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    AwardCategoryDocument,
    {
      locale: lng,
      fallbackLocale: fallbackLng,
      slug: params.slug,
    },
    isEnabled
  );

  if (!data.acategory) notFound();

  return (
    <>
      {!isEnabled && <AwardCategory data={data} lng={lng} />}
      {isEnabled && (
        <RealTimeAwardCategoryAwards
          initialData={data}
          locale={lng}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ""}
          query={AwardCategoryDocument}
          variables={{
            locale: lng,
            fallbackLocale: fallbackLng,
            slug: params.slug,
          }}
        />
      )}
    </>
  );
};

export default ACategoryPage;
