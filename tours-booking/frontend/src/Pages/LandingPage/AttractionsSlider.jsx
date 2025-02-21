import React from "react";
import Slider from "react-slick";
import Card from "../../Components/Extra/Card";
import { RiSearchLine, RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Placesdata } from "../../Data/LandingPageData";

const Slick = () => {
  const NextArrow = ({ onClick }) => {
    return (
      <div
        onClick={onClick}
        className="text-2xl hover:cursor-pointer hover:scale-105 bg-gray-800 text-gray-200 p-3 inline-block rounded-full shadow-md absolute top-1/2 -right-3 z-10 hover:bg-gray-700"
      >
        <RiArrowRightSLine />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        onClick={onClick}
        className="text-2xl bg-gray-800 text-gray-200 hover:cursor-pointer hover:scale-105 p-3 inline-block rounded-full shadow-md absolute top-1/2 -left-3 z-10 hover:bg-gray-700"
      >
        <RiArrowLeftSLine />
      </div>
    );
  };

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-container padding-container bg-gray-900 text-gray-200">
      <div className="m-auto w-[90%]">
        <Slider {...settings}>
          {Placesdata.map((item) => (
            <div key={item.type} className="px-2 overflow-hidden border border-gray-700 group py-8">
              <div className="overflow-hidden relative">
                <img
                  src={item.pic}
                  className="h-[500px] w-[510px] object-cover hover:scale-105 hover:rotate-2 transition-all duration-700"
                  alt={item.type}
                />
                <Link
                  to={`/search?searchTerm=${item.type}`}
                  className="absolute top-1/2 left-1/2 h-14 w-14 flex justify-center items-center scale-0 bg-gray-800 text-gray-200 -translate-x-1/2 -translate-y-1/2 rounded-full group-hover:scale-100 transition all"
                >
                  <RiSearchLine />
                </Link>
              </div>

              <div className="px-5 py-3 bg-gray-800">
                <div className="capitalize text-[17px] font-[500] font-poppins text-gray-200">{item.type}</div>
                <div className="text-gray-400 text-[15px]">{item.description}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slick;
