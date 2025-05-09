// "use client";
// import React, { useRef } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import styles from "./carousel.module.css";

// const items = [
//   {
//     key: 1,
//     imagename: `1.jpg`,
//     imageurl: `https://pageportfolio-5.olitt.com/`,
//     imagelabel: `Portfoli Template`,
//   },
//   {
//     key: 2,
//     imagename: `2.jpg`,
//     imageurl: `https://watchappdark-4.olitt.com/`,
//     imagelabel: `Web app Template`,
//   },
//   {
//     key: 3,
//     imagename: `3.jpg`,
//     imageurl: `https://resume-26.olitt.com/`,
//     imagelabel: `Resume Template`,
//   },
//   {
//     key: 4,
//     imagename: `4.jpg`,
//     imageurl: `https://olittbakery-9.olitt.com/`,
//     imagelabel: `Bakery shop Template`,
//   },
//   {
//     key: 5,
//     imagename: `5.jpg`,
//     imageurl: `https://olittbakery-9.olitt.com/`,
//     imagelabel: `Bakery shop Template`,
//   },
//   {
//     key: 6,
//     imagename: `6.jpg`,
//     imageurl: `https://olittbakery-9.olitt.com/`,
//     imagelabel: `Bakery shop Template`,
//   },
//   {
//     key: 7,
//     imagename: `7.jpg`,
//     imageurl: `https://olittbakery-9.olitt.com/`,
//     imagelabel: `Bakery shop Template`,
//   },
// ];

// const handleItemClick = (index) => {
//   const url = items[index].imageurl;
//   const newWindow = window.open(url, "_blank", "noopener,noreferrer");
//   if (newWindow) newWindow.opener = null;
// };

// const Slider = () => {
//   const mySlides = useRef(null);
//   return (
//     // <Carousel
//     //   onClickItem={handleItemClick}
//     //   autoPlay={true}
//     //   showIndicators={true}
//     //   showThumbs={false}
//     //   infiniteLoop={true}
//     //   showArrows={false}
//     //   showStatus={false}
//     //   dynamicHeight={true}
//     // >
//     //   {items.map((item) => (
//     //     <div key={item.key}>
//     //       <img src={item.imagename} alt="image1" />
//     //       <p className="legend">{item.imagelabel}</p>
//     //     </div>
//     //   ))}
//     // </Carousel>
//     <div className={styles.slides}>
//       <img src="https://picsum.photos/200/300?t=1" alt="" className="pic" />

//       <img src="https://picsum.photos/200/300?t=2" alt="" className="pic" />
//       <img src="https://picsum.photos/200/300?t=3" alt="" className="pic" />

//       <img src="https://picsum.photos/200/300?t=4" alt="" className="pic" />

//       <img src="https://picsum.photos/200/300?t=5" alt="" className="pic" />
//     </div>
//   );
// };

// export default Slider;
