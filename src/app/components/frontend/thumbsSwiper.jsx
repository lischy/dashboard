"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ThumbsSwiper = ({ product_images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(product_images);

  const Test = () => {
    if (product_images) {
      return product_images.map((product_image) => (
        <SwiperSlide>
          <img src={`/${product_image}`} />
        </SwiperSlide>
      ));
    }
  };

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {product_images ? (
          product_images.map((product_image) => (
            <SwiperSlide key={product_image}>
              <img src={`/${product_image}`} />
            </SwiperSlide>
          ))
        ) : (
          <>
            <SwiperSlide>
              <img src={`/9.jpg`} />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/60c88fa9379ac-square-removebg-preview.webp" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/6291b3a8d833d-square-removebg-preview.webp" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/CMTHP-COR12-turkish-blue-920x920-removebg-preview.webp" />
            </SwiperSlide>
          </>
        )}
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide> */}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {product_images ? (
          product_images.map((product_image) => (
            <SwiperSlide key={product_image}>
              <img src={`/${product_image}`} />
            </SwiperSlide>
          ))
        ) : (
          <>
            <SwiperSlide>
              <img src={`/9.jpg`} />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/60c88fa9379ac-square-removebg-preview.webp" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/6291b3a8d833d-square-removebg-preview.webp" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/CMTHP-COR12-turkish-blue-920x920-removebg-preview.webp" />
            </SwiperSlide>
          </>
        )}
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
};

export default ThumbsSwiper;
