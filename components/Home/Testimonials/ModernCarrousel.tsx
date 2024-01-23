'use client';

import { TestimonialRecord } from '@/graphql/generated';
import { Maybe } from 'graphql/jsutils/Maybe';
import { StructuredText } from 'react-datocms/structured-text';
import { Image as DatoImage } from 'react-datocms';
import { useState } from 'react';
import Highlighter from '@/components/Common/Highlighter';

type Props = {
  reviews: TestimonialRecord[];
  header: string;
  subheader: Maybe<string>;
};

const ModernCarrousel = ({ reviews, header, subheader }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="bg-white dark:bg-dark-background">
      <div className="relative flex">
        <div className="min-h-screen lg:w-1/3"></div>
        <div className="mt-32 hidden h-[750px] w-3/4 rounded-xl bg-primary/10 dark:bg-gray-800 lg:block"></div>

        <div className="container mx-auto flex min-h-screen w-full flex-col justify-center sm:px-6 px-4 lg:py-10 py-5 lg:absolute lg:inset-x-0">
          <h1 className="text-2xl font-semibold capitalize text-gray-800 dark:text-darktext lg:text-3xl">
            {header}
          </h1>

          <div className="mt-10 lg:mt-20 lg:flex lg:items-center">
            <div className="relative lg:h-[32rem] md:h-[40rem] sm:h-[33rem] xs:h-96 h-80  w-full overflow-hidden rounded-lg object-cover object-center lg:w-[32rem]">
              <DatoImage
                layout="fill"
                objectFit="cover"
                objectPosition="80% 20%"
                data={currentReview.reviewerPicture.responsiveImage}
              />
            </div>

            <div className="mt-8 lg:mt-0 lg:px-10">
              <div className="mt-6 max-w-lg text-gray-500 dark:text-darktext">
                <StructuredText
                  data={currentReview.review.value}
                  renderNode={Highlighter}
                />
              </div>

              <h3 className="mt-6 text-lg font-medium text-primary">
                {currentReview.reviewerName}
              </h3>
              <p className="text-gray-600 dark:text-darktext">
                {currentReview.reviewerTitle}
              </p>
            </div>
          </div>

          <div className="lg:mt-12 mt-6 flex items-center lg:justify-start">
            <button
              title="left arrow"
              className="rounded-full border p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              onClick={handlePrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              title="right arrow"
              className="rounded-full border p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:mx-6"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCarrousel;
