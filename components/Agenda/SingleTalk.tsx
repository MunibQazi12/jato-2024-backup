import {
  ResponsiveImage,
  SiteLocale,
  SpeakerRecord,
  TalkRecord,
} from "@/graphql/generated";
import transformDate from "@/utils/transformDate";
import agendaTime from "@/utils/agendaTime";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import SpeakerTalks from "./SpeakerTalks";
import { primaryColor } from "@/app/i18n/settings";
import StructuredTextSection from "../Award/Award/StructuredTextBlocks";

type Props = {
  talk: TalkRecord; //
  locale: SiteLocale;
  hideBtnLink?: boolean
};

const SingleTalk = ({ talk, locale, hideBtnLink = true }: Props) => {
  const {
    title,
    id,
    seoTags,
    content,
    start,
    end,
    dateTags,
    speaker,
    stage,
    _publishedAt,
    slug,
  } = talk;

  const startTime = agendaTime(start, "full");
  const endTime = agendaTime(end, "full");

  return (
    <>
      <div className="flex h-full flex-col  shadow-lg rounded-2xl">
        <div className="relative flex flex-1 flex-col rounded-2xl border border-slate-200 dark:border-none bg-white dark:bg-subsectionBackground sm:px-8 px-4 py-12">
          <p className="text-md absolute top-0 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-primary px-3 py-1 font-semibold tracking-wide text-white shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              className="mr-2 fill-current py-0.5 text-xl text-white"
            >
              <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>
            <p className="flex items-center flex-nowrap">
              <span>{` ${typeof startTime === "string" ? startTime : startTime.time}`}</span>
              <span> -</span>
              <span>{` ${typeof endTime === "string" ? endTime : endTime.time}`}</span>
            </p>
          </p>
          <p className=" mb-5 flex text-sm font-semibold tracking-wide  text-dark dark:text-darktext">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="mr-2 fill-current py-0.5 text-lg"
            >
              <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" />
            </svg>
            {`${typeof startTime === "string" ? startTime : startTime.day} - `}
            {` ${typeof startTime === "string" ? startTime : startTime.date}`}
          </p>{" "}
          <h4 className="items-center rounded-lg bg-slate-100 dark:bg-[#201f2f] dark:text-darktext px-8 py-2 text-xl font-semibold uppercase leading-5">
            {title}
          </h4>
          <div className="mt-4 flex-1 leading-6">
            <StructuredTextSection data={content} lng={locale} />
          </div>
          <span className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10" />
          <ul className="flex flex-wrap flex-col justify-between">
            {speaker.map((speakerItem) => {
              return (
                <li key={speakerItem.id} className="mb-2 mr-2 ">
                  <Link
                    href={`/${locale}/talks/speaker/${speakerItem.slug}`}
                    className="flex h-full items-center"
                  >
                    <div className="mr-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full object-contain">
                        <DatoImage
                          className="h-full w-full object-cover"
                          data={
                            speakerItem.picture!
                              .responsiveImage as ResponsiveImage
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="mb-1 text-sm font-medium text-dark dark:text-darktext">
                        {speakerItem.name}
                      </h4>

                      <div className="text-xs text-dark dark:text-darktext">
                        {speakerItem.jobTitle}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          {hideBtnLink
            ? <Link href={`/${locale}/stage/${stage.slug}`} className="mt-5">
              <button className="flex w-full items-center justify-center rounded-md bg-primary p-3 text-sm  font-bold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  className="mr-2 fill-current text-xl"
                >
                  <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                </svg>{" "}
                <span className="uppercase">{` ${stage.name}`}</span>
              </button>
            </Link>
            : null
          }
          <div className="absolute bottom-0 right-0 z-[1]">
            <svg
              width="179"
              height="158"
              viewBox="0 0 179 158"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M75.0002 63.256C115.229 82.3657 136.011 137.496 141.374 162.673C150.063 203.47 207.217 197.755 202.419 167.738C195.393 123.781 137.273 90.3579 75.0002 63.256Z"
                fill="url(#paint0_linear_70:153)"
              />
              <path
                opacity="0.3"
                d="M178.255 0.150879C129.388 56.5969 134.648 155.224 143.387 197.482C157.547 265.958 65.9705 295.709 53.1024 246.401C34.2588 174.197 100.939 83.7223 178.255 0.150879Z"
                fill="url(#paint1_linear_70:153)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_70:153"
                  x1="69.6694"
                  y1="29.9033"
                  x2="196.108"
                  y2="83.2919"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={primaryColor} stopOpacity="0.62" />
                  <stop offset="1" stopColor={primaryColor} stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_70:153"
                  x1="165.348"
                  y1="-75.4466"
                  x2="-3.75136"
                  y2="103.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={primaryColor} stopOpacity="0.62" />
                  <stop offset="1" stopColor={primaryColor} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTalk;
