"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Button } from "@mui/material";

const items = [
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
    <section id="swiper_slider_5">
      <div className="content">
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
              <div className="img">
                <img src={item.imagename} alt="image1" />
              </div>
              <div className="text">
                <div className="subtitle">Subtitle</div>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam dictum mattis velit, sit amet faucibus felis iaculis
                  </p>
                </div>
                <Button>Shop now</Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;
