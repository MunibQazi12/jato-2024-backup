import { getFallbackLocale } from '@/app/i18n/settings';
import PostsPage from '@/components/Blog/PostsPage';
import RealTimePostsPage from '@/components/Blog/RealTime/RealTimePostsPage';
import { PostsDocument, SiteLocale } from '@/graphql/generated';
import queryDatoCMS from '@/utils/queryDatoCMS';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

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
    PostsDocument,
    {
      locale: lng,
      fallbackLocale: fallbackLng,
      skip: 0,
    },
    isEnabled
  );

  if (!data.allPosts.length) {
    notFound();
  }

  return (
    <>
      {!isEnabled && <PostsPage data={data} lng={lng} page={params.page} />}
      {isEnabled && (
        <RealTimePostsPage
          initialData={data}
          locale={lng}
          token={process.env.DATOCMS_READONLY_API_TOKEN || ''}
          query={PostsDocument}
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
