import {
  Image as DatoImage,
} from "react-datocms";
import Link from "next/link";
import {
  TalkQuery,
  SpeakerRecord,
  ResponsiveImage,
  SiteLocale,
} from "@/graphql/generated";
import { notFound } from "next/navigation";
import React from "react";
import agendaTime from "@/utils/agendaTime";
import StructuredTextSection from "@/components/Award/Award/StructuredTextBlocks";
type Props = {
  data: TalkQuery;
  lng: SiteLocale;
};

const Talk = ({ data, lng }: Props) => {
  if (!data.talk) notFound();
  const { title, speaker, start, end } = data.talk;

  const startTime = agendaTime(start, "full");
  const endTime = end ? agendaTime(end, "full") : '';

  const members = (speaker as SpeakerRecord[]) || [];
  return (
    <section className="pt-40 pb-[120px] dark:bg-dark-background min-h-[calc(100vh-320px)]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-darktext sm:text-4xl sm:leading-tight">
                {title}
              </h2>
              <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-darktext sm:text-4xl sm:leading-tight">
                <span>{` ${typeof startTime === "string" ? startTime : startTime.time}`}</span>
                <span> -</span>
                <span>{` ${typeof endTime === "string" ? endTime : endTime.time}`}</span>
              </h2>
              <div className="mb-10 flex items-center justify-between">
                <div className="flex flex-col items-start md:flex-row md:items-center">
                  {members.map((member) => {
                    return (
                      <Link
                        key={member.slug}
                        href={`/${lng}/talks/speaker/${member.slug}`}
                        passHref
                      >
                        <div className="mb-5 mr-10 flex items-center">
                          <div className="mr-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                              <DatoImage
                                className="h-full w-full object-cover"
                                data={
                                  member.picture
                                    .responsiveImage as ResponsiveImage
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <h4 className="mb-1 text-base font-medium text-body-color">
                              <span>{member.name}</span>
                            </h4>
                            <p className="text-xs text-body-color">
                              {member.jobTitle}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div>
                  <StructuredTextSection data={data.talk.content} lng={lng} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Talk;
