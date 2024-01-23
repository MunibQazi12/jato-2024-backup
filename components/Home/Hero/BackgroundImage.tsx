import { ButtonRecord, FileField } from '@/graphql/generated';
import { Maybe } from 'graphql/jsutils/Maybe';
import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type Props = {
  heroTitle: string;
  heroSubtitle: Maybe<string>;
  buttons: ButtonRecord[];
  image: Maybe<FileField> | undefined;
};

const BackgroundImageHero = ({
  heroTitle,
  heroSubtitle,
  buttons,
  image,
}: Props) => {
  return (
    <div
      className="mt-20 lg:h-[48rem] md:h-[40rem] sm:h-[36rem] h-[32rem] w-full bg-cover bg-center object-cover"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url('${image?.responsiveImage?.src}')`,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900/30 sm:px-8 px-6 lg:px-32">
        <div className="flex flex-col items-center sm:gap-8 gap-5 text-center">
          <h1 className="md:text-7xl sm:text-6xl text-[34px] leading-none font-bold text-white">{heroTitle}</h1>
          <div className="leading-relaxed text-white xl:text-xl sm:text-base text-sm ">
            <ReactMarkdown>{heroSubtitle || ''}</ReactMarkdown>
          </div>
          <div className="flex flex-wrap gap-4">
            {buttons.map((button) => {
              const primary =
                'inline-block rounded-lg bg-primary/90 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base sm:w-auto w-full';
              const secondary =
                'inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base sm:w-auto w-full';
              return (
                <Link
                  key={button.id}
                  className={button.primary ? primary : secondary}
                  href={button.url || '#'}
                >
                  {button.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImageHero;
