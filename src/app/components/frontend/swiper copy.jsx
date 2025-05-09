"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const items = [
  {
    key: 1,
    imagename: `1.jpg`,
    imageurl: `https://pageportfolio-5.olitt.com/`,
    imagelabel: `Portfoli Template`,
  },
  {
    key: 2,
    imagename: `2.jpg`,
    imageurl: `https://watchappdark-4.olitt.com/`,
    imagelabel: `Web app Template`,
  },
  {
    key: 3,
    imagename: `3.jpg`,
    imageurl: `https://resume-26.olitt.com/`,
    imagelabel: `Resume Template`,
  },
  {
    key: 4,
    imagename: `4.jpg`,
    imageurl: `https://olittbakery-9.olitt.com/`,
    imagelabel: `Bakery shop Template`,
  },
  {
    key: 5,
    imagename: `5.jpg`,
    imageurl: `https://olittbakery-9.olitt.com/`,
    imagelabel: `Bakery shop Template`,
  },
  {
    key: 6,
    imagename: `6.jpg`,
    imageurl: `https://olittbakery-9.olitt.com/`,
    imagelabel: `Bakery shop Template`,
  },
  {
    key: 7,
    imagename: `7.jpg`,
    imageurl: `https://olittbakery-9.olitt.com/`,
    imagelabel: `Bakery shop Template`,
  },
];

const Slider = () => {
  return (
    <Swiper
      spaceBetween={20}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      rewind={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {items.map((item) => (
        <SwiperSlide key={item.key}>
          <img src={item.imagename} alt="image1" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
