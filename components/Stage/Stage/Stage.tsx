import transformDate from "@/utils/transformDate";
import { Image as DatoImage } from "react-datocms";
import SingleBlog from "@/components/Blog/SingleBlog";
import Link from "next/link";
import {
  StageQuery,
  StageRecord,
  ResponsiveImage,
  SiteLocale,
  TalkRecord,
} from "@/graphql/generated";
import { notFound } from "next/navigation";
import React from "react";
import SingleTalk from "@/components/Agenda/SingleTalk";
import LiveryPlayer from "@/components/LiveryPlayer";

type Props = {
  data: StageQuery;
  lng: SiteLocale;
};

const Stage = ({ data, lng }: Props) => {
  if (!data.stage) notFound();
  return (
    <section className="bg-primary/[.03] lg:py-[120px] md:py-24 py-20 dark:bg-dark-background min-h-[calc(100vh-320px)]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-start">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-darktext sm:text-4xl sm:leading-tight">
                {data.stage.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-12">
        <div className="flex lg:flex-row flex-col h-[90vh]">
          {data?.stage?.streamKey
            ? <div className="lg:w-[66.66%] w-full">
              <LiveryPlayer streamId={data?.stage?.streamKey} />
            </div>
            : null}
          <div className="lg:w-[33.33%] w-full lg:h-auto h-[565px]">
            {data?.stage?.iframeUrl
              ? <iframe
                src={data?.stage?.iframeUrl || ''}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              ></iframe>
              : null}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {
            !data.stage.talk
              ? <div className="-mx-4 flex flex-wrap justify-center xl:h-[807px] lg:h-[679px] h-[415px]">
                <div className=" h-full animate-pulse relative w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-10">
                  <div className="w-full h-full bg-[#e8e7e8] dark:bg-subsectionBackground rounded-2xl">
                    <p className="absolute -top-5 left-12 w-40 h-8 rounded-full animate-pulse bg-[#e8e7e8] dark:bg-subsectionBackground"></p>
                  </div>
                </div>
                <div className="h-full px-4 animate-pulse relative w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mb-10">
                  <div className="w-full h-full bg-[#e8e7e8] dark:bg-subsectionBackground rounded-2xl">
                    <p className="absolute -top-5 left-12 w-40 h-8 rounded-full animate-pulse bg-[#e8e7e8] dark:bg-subsectionBackground"></p>
                  </div>
                </div>
                <div className="h-full animate-pulse relative w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-10">
                  <div className="w-full h-full bg-[#e8e7e8] dark:bg-subsectionBackground rounded-2xl">
                    <p className="absolute -top-5 left-12 w-40 h-8 rounded-full animate-pulse bg-[#e8e7e8] dark:bg-subsectionBackground"></p>
                  </div>
                </div>
              </div>

              : data.stage.talk.map((talks) => (
                <div
                  key={talks.id}
                  className="mb-10 w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                  <SingleTalk talk={talks as TalkRecord} locale={lng} hideBtnLink={false} />
                </div>
              ))}
        </div>

        <div className=" -mx-4 flex flex-wrap"></div>
      </div>
    </section>
  );
};

export default Stage;
