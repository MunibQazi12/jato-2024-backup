import { getFallbackLocale } from "@/app/i18n/settings";
import TalksPage from "@/components/Agenda/TalksPage";
import RealTimeTalksPage from "@/components/Agenda/RealTime/RealTimeTalksPage";
import { SiteLocale, TalksDocument } from "@/graphql/generated";
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
    TalksDocument,
    {
      locale: lng,
      fallbackLocale: fallbackLng,
      skip: 0,
    },
    isEnabled
  );

  if (!data.allTalks.length) {
    notFound();
  }

  return (
    <>
      {!isEnabled && <TalksPage data={data} lng={lng} page={params.page} />}
      {isEnabled && (
        <RealTimeTalksPage
          initialData={data}
          locale={lng}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ""}
          query={TalksDocument}
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
