import { Scrollbar } from "swiper/modules";
import { Mousewheel, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import FullScreenImageButton from "../FullScreenImageButton";
import FullScreenImageView from "../FullScreenImageView";
import styles from "./imageswiper.module.css";
import SmallBox from "../SmallBox";

export default function ImageSwiper({ imageList }) {
  if (!imageList) {
    console.error("Image list is null");
    return; 
    
  }

  return (
    <div className={styles.swiperOuterWrapper}>
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
              quality={50}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <SmallBox>
        <p>Click the images to view fullscreen</p>
      </SmallBox>
    </div>
  );
}
