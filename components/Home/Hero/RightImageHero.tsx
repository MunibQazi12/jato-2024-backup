'use client';

import { ButtonRecord, FileField } from '@/graphql/generated';
import { Maybe } from 'graphql/jsutils/Maybe';
import Link from 'next/link';
import { delay, motion } from 'framer-motion';
import { Image as DatoImage } from 'react-datocms';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type Props = {
  heroTitle: string;
  heroSubtitle: Maybe<string>;
  buttons: ButtonRecord[];
  image: Maybe<FileField> | undefined;
};

const RightImageHero = ({ heroTitle, heroSubtitle, buttons, image }: Props) => {
  return (
    <div className="lg:pt-40 md:pt-32 pt-24 bg-white dark:bg-dark-background pb-4 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <section className="flex flex-col justify-between lg:flex-row lg:gap-3">
          <div className="flex flex-col items-start text-center lg:py-12 lg:text-left lg:w-3/5 xl:py-24 md:gap-12 sm:gap-8 gap-5">
            <h1 className="text-4xl font-bold text-black dark:text-darktext sm:text-5xl md:text-6xl">
              {heroTitle}
            </h1>

            <div className="leading-relaxed text-gray-500 dark:text-darktext lg:w-4/5 xl:text-lg">
              <ReactMarkdown>{heroSubtitle || ''}</ReactMarkdown>
            </div>

            <div className="flex flex-wrap w-full items-center justify-center sm:gap-2.5 gap-5 sm:justify-center lg:justify-start">
              {buttons.map((button) => {
                const primary =
                  'inline-block rounded-lg bg-primary/90 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base sm:w-auto w-full';
                const secondary =
                  'inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base sm:w-auto w-full';
                return (
                  <Link
                    key={button.id}
                    href={button.url || '#'}
                    className={button.primary ? primary : secondary}
                  >
                    {button.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {image && image.responsiveImage && (
            <div className="relative w-2/5 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto">
              <DatoImage
                data={image.responsiveImage}
                layout="fill"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default RightImageHero;
