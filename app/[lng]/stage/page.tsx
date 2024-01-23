import { getFallbackLocale } from "@/app/i18n/settings";
import StagesPage from "@/components/Stage/StagesPage";
import RealTimeStagesPage from "@/components/Stage/RealTime/RealTimeStagesPage";
import { StagesDocument, SiteLocale } from "@/graphql/generated";
import queryDatoCMS from "@/utils/queryDatoCMS";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

type Params = {
  params: {
    page: number;
    lng: SiteLocale;
  };
};

const Page = async ({ params }: Params) => {
  const fallbackLng = await getFallbackLocale();
  const { lng } = params;
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    StagesDocument,
    {
      locale: lng,
      fallbackLocale: fallbackLng,
      skip: 0,
    },
    isEnabled
  );

  if (!data.allStages.length) {
    notFound();
  }

  return (
    <>
      {!isEnabled && <StagesPage data={data} lng={lng} page={params.page} />}
      {isEnabled && (
        <RealTimeStagesPage
          initialData={data}
          locale={lng}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ""}
          query={StagesDocument}
          variables={{
            locale: lng,
            fallbackLocale: fallbackLng,
            skip: 0,
          }}
          page={params.page}
        />
      )}
    </>
  );
};

export default Page;
