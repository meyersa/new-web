import { Scrollbar } from "swiper/modules";
import { Mousewheel, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/scrollbar";

import FullScreenImageButton from "../FullScreenImageButton";
import FullScreenImageView from "../FullScreenImageView";

import styles from "./imageswiper.module.css";

export default function ImageSwiper({ imageList }) {
  if (!imageList) {
    console.error("Image list cannot be null");
    return null; 
  }

  return (
    <div>
      <FullScreenImageView imageList={imageList}/>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        mousewheel={true}
        slidesPerView={"auto"}
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Scrollbar, Mousewheel, Autoplay]}
        className={styles.swiperWrapper}
      >
        {imageList.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`} className={styles.swiperSlide}>
            <FullScreenImageButton
              src={image.img}
              index={index}
              alt={`Image ${index + 1}`}
              width={500}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
