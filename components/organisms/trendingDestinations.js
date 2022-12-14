import React from "react";
import style from "../../styles/Home.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { useRouter } from "next/router";

const TrendingDestinations = (props) => {
  const router = useRouter();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigateToDestination = (city) => {
    router.push(`/search-flight/${city}`);
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-7">
          <p className={style.trendingTitle}>Trending destinations</p>
        </div>
      </div>
      <div className="row mt-2">
        <Slider {...settings}>
          {props?.data?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => navigateToDestination(item.city)}
                className={`card ${style.destinationsCarousel}`}
              >
                <Image
                  className={style.destinationsImage}
                  src={item.destination_image}
                  layout="fill"
                  alt=""
                />
                <div className={style.totalAirlines}>
                  <span>{item.count} Airlines</span>
                </div>
                <div className={style.destinationTitle}>
                  <span className={style.destinationCity}>{item.city},</span>
                  <br />
                  <span>{item.country}</span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default TrendingDestinations;
