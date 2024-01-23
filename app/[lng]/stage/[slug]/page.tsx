import { getFallbackLocale } from "@/app/i18n/settings";
import queryDatoCMS from "@/utils/queryDatoCMS";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { AwardDocument, SiteLocale, StageDocument } from "@/graphql/generated";
import Stage from "@/components/Stage/Stage/Stage";
import RealTimeStage from "@/components/Stage/RealTime/RealTimeStage";

type Params = {
  params: {
    slug: string;
    lng: SiteLocale;
  };
};

const StageDetailsPage = async ({ params: { slug, lng } }: Params) => {
  const fallbackLng = await getFallbackLocale();
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    StageDocument,
    {
      slug,
      locale: lng,
      fallbackLocale: [fallbackLng],
    },
    isEnabled
  );

  if (!data.stage) {
    notFound();
  }

  return (
    <>
      {!isEnabled && <Stage data={data} lng={lng} />}
      {isEnabled && (
        <RealTimeStage
          initialData={data}
          locale={lng}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ""}
          query={AwardDocument}
          variables={{ slug, locale: lng, fallbackLocale: [fallbackLng] }}
        />
      )}
    </>
  );
};

export default StageDetailsPage;
