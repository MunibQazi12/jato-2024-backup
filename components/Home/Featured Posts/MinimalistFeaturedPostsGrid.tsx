import { PostRecord, SiteLocale } from '@/graphql/generated';
import transformDate from '@/utils/transformDate';
import { Maybe } from 'graphql/jsutils/Maybe';
import Link from 'next/link';
import { Image as DatoImage } from 'react-datocms';

type BlogProps = {
  blogData: PostRecord[];
  blogHeader: string;
  blogSubheader: Maybe<string>;
  locale: SiteLocale;
};

const MinimalistFeaturedPostsGrid = ({
  blogData,
  blogHeader,
  blogSubheader,
  locale,
}: BlogProps) => {
  return (
    <section className="bg-white dark:bg-dark-background">
      <div className="container mx-auto sm:px-6 px-4 py-10">
        <h1 className="text-2xl font-semibold capitalize text-gray-800 dark:text-darktext lg:text-3xl sm:text-left text-center">
          {blogHeader}
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 lg:grid-cols-2">
          {blogData.map((post) => {
            return (
              <div key={post.id} className="sm:flex sm:text-left text-center block gap-4 items-center">
                {post.seoTags?.image?.responsiveImage && (
                  <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-lg object-cover sm:mx-0 mx-auto">
                    <DatoImage
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 20%"
                      data={post.seoTags?.image?.responsiveImage}
                    />
                  </div>
                )}

                <div className="flex flex-col justify-between lg:mx-6">
                  <Link
                    href={'/' + locale + '/posts/' + post.slug}
                    className="text-xl font-semibold text-gray-800 hover:underline dark:text-darktext"
                  >
                    {post.title}
                  </Link>

                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {transformDate(post._publishedAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MinimalistFeaturedPostsGrid;
