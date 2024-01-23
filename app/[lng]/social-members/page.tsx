import { getFallbackLocale } from "@/app/i18n/settings";
import Member from "@/components/Member";
import { SiteLocale, MemberDocument } from "@/graphql/generated";
import queryDatoCMS from "@/utils/queryDatoCMS";
import { draftMode } from "next/headers";

type Params = {
  params: {
    page: number;
    lng: SiteLocale;
  };
};

const MemberPage = async ({ params }: Params) => {
  const fallbackLng = await getFallbackLocale();
  const { lng } = params;
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    MemberDocument,
    {
      locale: lng,
      fallbackLocale: fallbackLng,
      skip: (params.page - 1) * 9,
    },
    isEnabled
  );

  return (
    <>
      {!isEnabled && <Member data={data} lng={lng} />}
    </>
  );
};

export default MemberPage;
