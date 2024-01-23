import { getFallbackLocale } from "@/app/i18n/settings";
import AgendaTabPage from "@/components/AgendaTab/AgendaTabPage";
import { AgendaTabDocument, SiteLocale } from "@/graphql/generated";
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
    AgendaTabDocument,
    {
      locale: lng,
      fallbackLocale: fallbackLng,
      skip: (params.page - 1) * 9,
      first: 9
    },
    isEnabled
  );

  if (!data.allAgendaTabs.length) {
    notFound();
  }

  return (
    <>
      {!isEnabled && <AgendaTabPage data={data} lng={lng} page={params.page} />}
    </>
  );
};

export default Page;
