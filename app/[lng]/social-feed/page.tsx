import { getFallbackLocale } from "@/app/i18n/settings";
import SocialFeed from "@/components/SocialFeed";
import { SocialFeedDocument, SiteLocale } from "@/graphql/generated";
import queryDatoCMS from "@/utils/queryDatoCMS";
import { draftMode } from "next/headers";

type Params = {
  params: {
    page: number;
    lng: SiteLocale;
  };
};

const SocialFeedPage = async ({ params }: Params) => {
  const fallbackLng = await getFallbackLocale();
  const { lng } = params;
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    SocialFeedDocument,
    {
      locale: lng,
      fallbackLocale: fallbackLng,
      skip: (params.page - 1) * 9,
    },
    isEnabled
  );

  return (
    <>
      {!isEnabled && <SocialFeed data={data} lng={lng}/>}
    </>
  );
};

export default SocialFeedPage;
