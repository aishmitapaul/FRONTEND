import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroBanner() {
  const slides = [
    {
      img: "./assets/slide1.jpeg",
      title: "Top Business Headlines",
      subtitle: "Stay updated with the latest market trends.",
    },
    {
      img: "./assets/slide2.jpeg",
      title: "Tech Innovations",
      subtitle: "Discover cutting-edge technology news.",
    },
    {
      img: "./assets/slide3.jpeg",
      title: "Live Sports Updates",
      subtitle: "Catch up with the biggest sports stories.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: () => {
    
    if (document.activeElement) {
      document.activeElement.blur();
    }
  },
  };

  return (
    <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[400px]">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white">{slide.subtitle}</p>
              <a
                href="#categories"
                className="mt-6 inline-block bg-yellow-400 text-blue-800 font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-300 transition"
              >
                🔍 Browse News
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}