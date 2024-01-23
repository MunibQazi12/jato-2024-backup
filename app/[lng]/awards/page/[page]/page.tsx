import { getFallbackLocale } from "@/app/i18n/settings";
import PostsPage from "@/components/Blog/PostsPage";
import AwardsPage from "@/components/Award/AwardsPage";
import RealTimeAwardsPage from "@/components/Award/RealTime/RealTimeAwardsPage";
import RealTimePostsPage from "@/components/Blog/RealTime/RealTimePostsPage";
import { AwardsDocument, PostsDocument, SiteLocale } from "@/graphql/generated";
import queryDatoCMS from "@/utils/queryDatoCMS";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

type Params = {
  params: {
    page: number;
    lng: SiteLocale;
  };
};

const Awards = async ({ params }: Params) => {
  const fallbackLng = await getFallbackLocale();
  const { lng } = params;
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    AwardsDocument,
    {
      locale: lng,
      fallbackLocale: fallbackLng,
      skip: (params.page - 1) * 9,
    },
    isEnabled
  );

  if (!data.allAwards.length) {
    notFound();
  }

  return (
    <>
      {!isEnabled && <AwardsPage data={data} lng={lng} page={params.page} />}
      {isEnabled && (
        <RealTimeAwardsPage
          initialData={data}
          locale={lng}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ""}
          query={AwardsDocument}
          variables={{
            locale: lng,
            fallbackLocale: fallbackLng,
            skip: (params.page - 1) * 9,
          }}
          page={params.page}
        />
      )}
    </>
  );
};

export default Awards;
