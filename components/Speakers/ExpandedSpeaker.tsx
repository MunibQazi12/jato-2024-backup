import {
  AuthorRecord,
  ResponsiveImage,
  SiteLocale,
  SpeakerRecord,
} from "@/graphql/generated";
import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import StructuredTextSection from "../Award/Award/StructuredTextBlocks";

type Props = {
  header: Maybe<string>;
  subheader: Maybe<string>;
  speakersSection: Array<SpeakerRecord>;
  lng: SiteLocale;
};

const ExpandedSpeaker = ({
  header,
  subheader,
  speakersSection,
  lng,
}: Props) => {
  return (
    <section className="bg-white dark:bg-dark-background">
      <div className="container mx-auto px-6 py-10">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800 dark:text-darktextlg:text-4xl">
          {header}
        </h1>

        <div className="mx-auto my-6 max-w-2xl text-center text-gray-500 dark:text-gray-300">
          <ReactMarkdown>{subheader || ""}</ReactMarkdown>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 text-center md:grid-cols-2 md:gap-8 md:text-start xl:mt-16 xl:grid-cols-2">
          {speakersSection.map((member) => {
            return (
              <Link
                href={`/${lng}/talks/speaker/${member.slug}`}
                key={member.id}
                className=" group transform cursor-pointer rounded-xl border px-12 py-8 transition-colors duration-300 hover:border-transparent hover:bg-primary/90 hover:opacity-95 dark:border-gray-700 dark:hover:border-transparent"
              >
                <div className="flex flex-col items-center sm:-mx-4 sm:flex-row">
                  <div className="relative z-50 h-24 w-24 flex-shrink-0 overflow-hidden rounded-full object-cover ring-4 ring-gray-300 sm:mx-4">
                    <DatoImage
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 20%"
                      data={member.picture.responsiveImage as ResponsiveImage}
                    />
                  </div>

                  <div className="mt-4 sm:mx-4 sm:mt-0">
                    <h1 className="text-xl font-semibold capitalize text-gray-700 group-hover:text-white dark:text-white md:text-2xl">
                      {member.name}
                    </h1>
                    <h3 className="mt-2 capitalize text-gray-500 group-hover:text-white">
                      {member.jobTitle}
                    </h3>{" "}
                    <StructuredTextSection data={member.biography} lng={lng} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpandedSpeaker;
