"use client";
import React, { useState, FC, useMemo } from "react";
import { Image as DatoImage } from "react-datocms";
import { GalleryRecord, ImageFileField } from "@/graphql/generated";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';

type Props = {
  galleryRecords: GalleryRecord[];
};

const GalleryBlock: FC<Props> = ({ galleryRecords }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const extractImages = useMemo(() => {
    return galleryRecords?.map((record: GalleryRecord) => record.imageGallery?.map((image: ImageFileField) => image)).flat();
  }, [galleryRecords])

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mainSwiper !m-0"
      >
        {extractImages.map((image: ImageFileField, index: number) => (
          <SwiperSlide key={index}>
            <div
              className="relative aspect-square sm:w-56 mx-auto w-full overflow-hidden rounded-xl drop-shadow-xl md:w-72 lg:w-96"
            >
              <DatoImage
                className="rounded"
                layout="fill"
                objectFit="contain"
                data={image.responsiveImage}
              />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbnailSwiper !m-0"
        spaceBetween={4}
      >
        {extractImages.map((image: ImageFileField, index: number) => (
          <SwiperSlide key={index}>
            <div className='h-40 w-20 cursor-pointer'>
              <DatoImage
                layout="fill"
                objectFit="cover"
                objectPosition="50% 20%"
                data={image.responsiveImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default GalleryBlock;
