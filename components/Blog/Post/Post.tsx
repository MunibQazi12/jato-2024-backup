import SharePost from "@/components/Blog/Post/SharePost";
import TagButton from "@/components/Blog/TagButton";
import QuoteBlock from "@/components/Blog/Post/StructuredTextBlocks/QuoteBlock";
import transformDate from "@/utils/transformDate";
import {
  isBlockquote,
  isHeading,
  isLink,
  isParagraph,
} from "datocms-structured-text-utils";
import {
  Image as DatoImage,
  StructuredText,
  renderNodeRule,
} from "react-datocms";
import NewsletterCTABlock from "@/components/Blog/Post/StructuredTextBlocks/NewsletterCTABlock";
import CTABlock from "@/components/Blog/Post/StructuredTextBlocks/CTABlock";
import DateIcon from "@/components/Blog/svgs/DateIcon";
import SingleBlog from "@/components/Blog/SingleBlog";
import Link from "next/link";
import {
  AppCtaRecord,
  CtaButtonWithImageRecord,
  ImageBlockRecord,
  NewsletterSubscriptionRecord,
  PostQuery,
  PostRecord,
  ResponsiveImage,
  SiteLocale,
} from "@/graphql/generated";
import { notFound } from "next/navigation";
import React from "react";
import Highlighter from "@/components/Common/Highlighter";
import CTAAppBlock from "./StructuredTextBlocks/CTAAppBlock";

type Props = {
  data: PostQuery;
  lng: SiteLocale;
};

const Post = ({ data, lng }: Props) => {
  if (!data.post) notFound();
  return (
    <section className="lg:pt-36 lg:pb-[120px] pt-24 md:pb-24 pb-12 dark:bg-dark-background min-h-[calc(100vh-320px)]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-darktext sm:text-4xl sm:leading-tight">
                {data.post.title}
              </h2>
              <div className="lg:mb-10 mb-6 flex justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                <div className="flex flex-col items-start md:flex-row md:items-center">
                  <Link
                    href={`/${lng}/posts/author/${data.post.author?.slug}`}
                    className="mb-5 sm:mr-10 mr-2 flex items-center"
                  >
                    <div className="mr-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <DatoImage
                          className="h-full w-full object-cover"
                          data={
                            data.post.author!.picture
                              .responsiveImage as ResponsiveImage
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="mb-1 text-base font-medium text-body-color dark:text-darktext">
                        <span>{data.post.author?.name}</span>
                      </h4>
                      <p className="text-xs text-body-color dark:text-darktext">
                        {data.post.author?.bio}
                      </p>
                    </div>
                  </Link>
                  {data.post._publishedAt && (
                    <div className="mb-5 flex items-center">
                      <p className="sm:mr-5 mr-1 flex items-center sm:text-base text-sm font-medium text-body-color dark:text-darktext">
                        {DateIcon}
                        {transformDate(data.post._publishedAt)}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mb-5">
                  <Link
                    href={`/${lng}/posts/tag/${data.post.tags[0].slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                  >
                    {data.post.tags[0].tag}
                  </Link>
                </div>
              </div>
              <div>
                <StructuredText
                  data={data.post.content as any}
                  renderNode={Highlighter}
                  renderBlock={({ record }: any) => {
                    switch (record.__typename) {
                      case "ImageBlockRecord":
                        const ImageBlockRecord = record as ImageBlockRecord;
                        return (
                          <div className="relative lg:mb-16 mb-12 lg:mt-16 mt-12 overflow-hidden rounded-md shadow-md h-[300px] md:h-[400px]">
                            <DatoImage
                              data={ImageBlockRecord.image.responsiveImage}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="50% 50%"
                            />
                          </div>
                        );
                      case "NewsletterSubscriptionRecord":
                        const NewsletterSubscriptionRecord =
                          record as NewsletterSubscriptionRecord;
                        return (
                          <NewsletterCTABlock
                            title={NewsletterSubscriptionRecord.title}
                            subtitle={NewsletterSubscriptionRecord.subtitle}
                            buttonLabel={
                              NewsletterSubscriptionRecord.buttonLabel
                            }
                          />
                        );
                      case "CtaButtonWithImageRecord":
                        const CtaButtonWithImageRecord =
                          record as CtaButtonWithImageRecord;
                        return (
                          <CTABlock
                            title={CtaButtonWithImageRecord.title}
                            subtitle={CtaButtonWithImageRecord.subtitle}
                            buttonLabel={CtaButtonWithImageRecord.buttonLabel}
                            image={CtaButtonWithImageRecord.image}
                          />
                        );
                      case "AppCtaRecord":
                        const appCtaRecord = record as AppCtaRecord;
                        return (
                          <CTAAppBlock
                            title={appCtaRecord.title}
                            text={appCtaRecord.text}
                            googleURL={appCtaRecord.googlePlayUrl}
                            appleURL={appCtaRecord.appstoreUrl}
                          />
                        );
                      default:
                        return null;
                    }
                  }}
                  renderLinkToRecord={({
                    record,
                    children,
                    transformedMeta,
                  }) => {
                    switch (record.__typename) {
                      case "PostRecord":
                        return (
                          <Link
                            {...transformedMeta}
                            href={`/${lng}/posts/${record.slug}`}
                            className="text-base font-medium leading-relaxed text-body-color underline sm:text-lg sm:leading-relaxed"
                          >
                            {children}
                          </Link>
                        );
                      default:
                        return null;
                    }
                  }}
                  renderInlineRecord={({ record }) => {
                    switch (record.__typename) {
                      case "PostRecord":
                        const PostRecord = record as PostRecord;
                        return (
                          <Link
                            key={PostRecord.id}
                            href={`/${lng}/posts/${record.slug}`}
                            className="underline"
                          >
                            {PostRecord.title}
                          </Link>
                        );
                      default:
                        return null;
                    }
                  }}
                  customNodeRules={[
                    renderNodeRule(isHeading, ({ children, key }) => {
                      return (
                        <h3
                          className="mb-4 lg:mt-9 mt-6 text-xl font-bold text-black dark:text-darktext sm:text-2xl lg:text-xl xl:text-2xl"
                          key={key}
                        >
                          {children}
                        </h3>
                      );
                    }),
                    renderNodeRule(isParagraph, ({ children, key }) => {
                      return (
                        <div
                          className="text-base font-medium leading-relaxed text-body-color dark:text-darktext sm:text-lg sm:leading-relaxed"
                          key={key}
                        >
                          {children}
                        </div>
                      );
                    }),
                    renderNodeRule(isLink, ({ node, children, key }) => {
                      const attributeObject =
                        node.meta?.reduce((acc: any, { id, value }) => {
                          acc[id] = value;
                          return acc;
                        }, {}) || {};

                      return (
                        <Link
                          className="text-base font-medium leading-relaxed text-body-color dark:text-darktext underline sm:text-lg sm:leading-relaxed"
                          href={node.url}
                          key={key}
                          {...attributeObject}
                        >
                          {children}
                        </Link>
                      );
                    }),
                    renderNodeRule(isBlockquote, ({ children, key }) => {
                      return <QuoteBlock text={children} />;
                    }),
                  ]}
                />
                <div className="lg:mt-16 md:mt-12 sm:mt-8 mt-6 items-center justify-between sm:flex flex-wrap">
                  <div className="sm:mb-5 mb-2">
                    <h5 className="mb-3 text-sm font-medium text-body-color dark:text-white">
                      Post Tags :
                    </h5>
                    <div className="flex flex-wrap items-center">
                      {data.post.tags.map((tag) => {
                        return (
                          <TagButton
                            key={tag.id}
                            tag={tag.tag}
                            lng={lng}
                            slug={tag.slug}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="sm:mb-5 mb-2">
                    <h5 className="mb-3 text-sm font-medium text-body-color dark:text-darktext">
                      Share this post :
                    </h5>
                    <div className="flex items-center sm:justify-end gap-3">
                      <SharePost />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
