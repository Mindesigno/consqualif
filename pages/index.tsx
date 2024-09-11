import { useContext, useState } from "react";
import Title from "../components/Title";
import SContext from "../contexts/SContext";
import { AnimatePresence, motion } from "framer-motion";
import { config, slides } from "../styles/global";

const Home = () => {
  const { ref } = useContext(SContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <Title title={config.global.title} />
      <main
        data-scroll-section
        data-scroll-id
        ref={ref}
        id="main-container"
        className="will-change-scroll overflow-hidden relative"
      >
        <Pagination
          arr={slides}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        {/* <TextLine /> */}
        <motion.div
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ ease: config.animations.speed, duration: 1.5 }}
          className="w-full h-screen"
        >
          {slides.map((obj, id) => (
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: id === currentIndex ? 1 : 0,
              }}
              transition={{
                ease: config.animations.speed,
                duration: 1.5,
              }}
              className="absolute opacity-75 bottom-[5em] right-[2.5em] text-white z-[3]"
            >
              {obj.map}
            </motion.p>
          ))}
          <div className="absolute bg-black z-[2] opacity-40  h-screen w-full"></div>
          <Slider
            arr={slides}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </motion.div>
      </main>
    </>
  );
};

function TextLine() {
  return (
    <motion.div
      initial={{ y: 100, x: 100 }}
      animate={{ y: 0, x: 0 }}
      transition={{ ease: config.animations.speed, duration: 1.5, delay: 1 }}
      className="absolute w-full h-screen z-[3] flex items-center"
    >
      <div className="flex gap-6 animate-runner w-full h-48">
        <h2 className="whitespace-nowrap">
          Experience luxurious construction & quality with us –
        </h2>
        <h2 className="whitespace-nowrap">
          Experience luxurious construction & quality with us
        </h2>
      </div>
    </motion.div>
  );
}

function Slider({
  arr,
  currentIndex,
  setCurrentIndex,
}: {
  arr: Slide[];
  currentIndex: number;
  setCurrentIndex: (index: number | ((index: number) => number)) => void;
}) {
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % arr.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev + arr.length - 1) % arr.length);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <AnimatePresence initial={false} custom={currentIndex}>
        <div className="flex gap-12 absolute z-[20] left-0 right-0">
          <div onClick={prevSlide} className="w-full h-screen cursor-pointer" />
          <div
            onClick={nextSlide}
            className="w-full h-screen absolute cursor-pointer"
          />
        </div>
        <motion.img
          key={currentIndex}
          src={arr[currentIndex].img}
          custom={currentIndex}
          transition={{
            ease: config.animations.speed,
            duration: 5,
          }}
          className="object-cover h-screen animate-zoom"
        />
      </AnimatePresence>
    </div>
  );
}

function Pagination({
  arr,
  currentIndex,
  setCurrentIndex,
}: {
  arr: Slide[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  // Calculating the percentage offset of the current index
  const offset = (currentIndex * 80) / arr.length;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{
        ease: config.animations.speed,
        duration: 1.25,
        delay: 1,
      }}
      className="absolute overflow-hidden border-t-[1px] border-[#fff2] z-[4] bottom-0 left-0 right-0"
    >
      <motion.div
        transition={{
          ease: config.animations.speed,
          duration: 1,
        }}
        className="w-full h-full flex  gap-3 justify-center items-center py-[.5em]"
      >
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            onClick={() => setCurrentIndex(index)} // Correctly using the index from the map function
            className={`cursor-pointer duration-300 p-2 whitespace-nowrap px-4 rounded-lg ${
              index === currentIndex ? "bg-[#fff2]" : "text-[#fff7]"
            }`}
          >
            {slide.name}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

type Slide = {
  id: string;
  img: string;
  name: string;
  map: string;
};

export default Home;
