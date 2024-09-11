import { useRef, useState } from "react";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "../styles/fonts.scss";
import Header from "../components/Base/Header";
import SContext from "../contexts/SContext";
import useLocoscroll from "../hooks/useLocoscroll";
import Cookie from "../components/Cookie";
import Preloader from "../components/Preloader";
import { config } from "../styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [state, setState] = useState("Some initial state");
  // Loader
  const [loading, setLoading] = useState<boolean>(true);

  // Scroll
  const ref = useRef<HTMLDivElement>(null);
  const { locomotiveScrollRef } = useLocoscroll();

  const values = {
    state,
    setState,
    ref,
    locomotiveScrollRef,
    loading,
    setLoading,
  };
  return (
    <SContext.Provider value={values}>
      <Header />
      {loading ? (
        <Preloader />
      ) : (
        <div className="flex h-full flex-col relative">
          <Preview />
          <AnimatePresence mode="sync">
            <motion.div key={router.route} className="will-change-transform">
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      <Cookie consentCookieName="userConsent" expires={365} />
    </SContext.Provider>
  );
}

function Preview() {
  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{
        ease: config.animations.speed,
        duration: 1.25,
        delay: 1,
      }}
      className="absolute overflow-hidden w-full h-screen z-[3] bg-primary top-0 bottom-0 flex justify-center items-center"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 533 }}
        transition={{
          ease: config.animations.speed,
          duration: 1.25,
          delay: 1,
        }}
        className=""
      >
        <motion.svg
          initial={{ scale: 1 }}
          animate={{ scale: 0.2525 }}
          transition={{
            ease: config.animations.speed,
            duration: 1.25,
          }}
          width="1010"
          height="150"
          viewBox="0 0 1010 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M513.915 121.955C532.575 121.955 549.258 113.488 560.332 100.186L511.137 62.8983L513.554 59.7106L562.788 97.0284C570.017 87.0763 574.28 74.8306 574.28 61.5891C574.28 28.25 547.254 1.22339 513.915 1.22339C480.576 1.22339 453.549 28.25 453.549 61.5891C453.549 74.8284 457.811 87.0723 465.038 97.0236L504.619 66.1385L505.234 66.9269L465.632 97.8281C476.647 112.479 494.174 121.955 513.915 121.955ZM513.915 122.955C532.901 122.955 549.873 114.333 561.129 100.79L581.966 116.584L584.382 113.396L563.585 97.6326C570.942 87.5126 575.28 75.0576 575.28 61.5891C575.28 27.6978 547.806 0.223389 513.915 0.223389C480.023 0.223389 452.549 27.6978 452.549 61.5891C452.549 75.0604 456.89 87.5179 464.249 97.6391L442.519 114.596L443.134 115.384L464.844 98.4434C476.041 113.329 493.854 122.955 513.915 122.955ZM553.263 65.2652L538.811 53.2134V77.5706L553.263 88.1472V65.2652ZM464.521 108.356V148.959V149.459H465.021H560.501V148.459H465.521V108.356H464.521Z"
            fill="#fff"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M25.6467 106.898C33.7172 111.36 43.3345 113.592 54.4987 113.592C64.3851 113.592 73.0608 112.194 80.526 109.398C88.0585 106.602 93.9096 102.624 98.0794 97.4625C102.249 92.2475 104.334 86.0109 104.334 78.7528H87.1842C87.1842 85.7421 84.225 91.3873 78.3067 95.6883C72.4556 99.9894 64.5196 102.14 54.4987 102.14C46.1592 102.14 39.232 100.339 33.7172 96.7367C28.2696 93.1346 24.1671 88.1883 21.4097 81.898C18.7195 75.6077 17.3744 68.4303 17.3744 60.3658C17.3744 51.4948 19.0894 44.0485 22.5194 38.027C25.9493 32.0055 30.4554 27.4894 36.0374 24.4787C41.6868 21.4141 47.8405 19.8819 54.4987 19.8819C62.1657 19.8819 68.8575 21.7636 74.5741 25.527C80.3579 29.2367 84.5613 34.2367 87.1842 40.527L104.132 37.7851C101.039 29.1292 95.3556 22.1131 87.0833 16.7367C78.8783 11.3066 68.0168 8.59155 54.4987 8.59155C44.2761 8.59155 35.0623 10.5808 26.8573 14.5593C18.7195 18.484 12.2631 24.2905 7.48807 31.9787C2.78028 39.6668 0.426392 49.1292 0.426392 60.3658C0.426392 70.9034 2.61215 80.1776 6.98367 88.1883C11.3552 96.1453 17.5762 102.382 25.6467 106.898ZM170.414 113.592C159.923 113.592 150.541 111.656 142.268 107.785C133.996 103.914 127.472 98.1077 122.697 90.3658C117.922 82.5701 115.535 72.8389 115.535 61.1722C115.535 49.3442 117.922 39.5593 122.697 31.8174C127.472 24.0217 133.996 18.2152 142.268 14.398C150.541 10.527 159.923 8.59155 170.414 8.59155C180.906 8.59155 190.288 10.527 198.56 14.398C206.832 18.269 213.356 24.1023 218.131 31.898C222.906 39.6937 225.294 49.4518 225.294 61.1722C225.294 72.9464 222.906 82.7313 218.131 90.527C213.356 98.269 206.832 104.049 198.56 107.866C190.288 111.683 180.906 113.592 170.414 113.592ZM170.414 101.979C182.318 101.979 191.7 98.5109 198.56 91.5754C205.487 84.6399 208.951 74.4518 208.951 61.0109C208.951 47.8389 205.487 37.7045 198.56 30.6077C191.7 23.4572 182.318 19.8819 170.414 19.8819C158.645 19.8819 149.263 23.4572 142.268 30.6077C135.341 37.7582 131.878 47.9464 131.878 61.1722C131.878 74.5593 135.341 84.7206 142.268 91.6561C149.263 98.5378 158.645 101.979 170.414 101.979ZM398.626 113.592C390.152 113.592 382.384 112.382 375.323 109.963C368.261 107.489 362.578 103.86 358.274 99.0754C353.969 94.2905 351.75 88.3765 351.616 81.3335H366.949C366.949 86.0647 368.395 89.9625 371.287 93.027C374.179 96.0378 378.013 98.2959 382.788 99.8012C387.563 101.253 392.775 101.979 398.424 101.979C404.544 101.979 409.858 101.199 414.364 99.6399C418.87 98.0808 422.333 96.0378 424.754 93.5109C427.243 90.9303 428.487 88.1077 428.487 85.0432C428.487 80.7421 426.839 77.2744 423.544 74.6399C420.248 71.9518 415.372 69.7744 408.916 68.1077L386.52 61.8174C376.029 58.8066 368.093 55.3658 362.712 51.4948C357.332 47.6238 354.642 42.1937 354.642 35.2045C354.642 27.355 358.408 20.9571 365.941 16.0109C373.54 11.0647 384.301 8.59155 398.223 8.59155C411.135 8.59155 421.224 10.984 428.487 15.769C435.75 20.5002 439.92 26.8711 440.996 34.8819H425.461C424.452 30.2045 421.694 26.5754 417.188 23.9948C412.749 21.3604 406.428 20.0432 398.223 20.0432C389.883 20.0432 383.393 21.5217 378.753 24.4787C374.112 27.4356 371.792 31.1722 371.792 35.6883C371.792 39.398 373.238 42.355 376.13 44.5593C379.089 46.7098 383.696 48.6453 389.95 50.3657L416.179 57.6238C425.259 60.0432 432.421 63.4303 437.667 67.7851C442.98 72.1399 445.637 77.7851 445.637 84.7206C445.637 90.0969 443.821 94.9625 440.189 99.3174C436.625 103.672 431.345 107.14 424.351 109.721C417.356 112.301 408.782 113.592 398.626 113.592ZM584.263 10.3656H600.001V75.0431C600.001 84.5592 602.993 91.4409 608.979 95.6882C614.965 99.8818 622.8 101.979 632.484 101.979C642.102 101.979 649.87 99.8818 655.788 95.6882C661.774 91.4409 664.766 84.5592 664.766 75.0431V10.3656H680.504V75.0431C680.504 83.5377 678.52 90.6613 674.552 96.414C670.651 102.113 665.103 106.414 657.906 109.317C650.71 112.167 642.236 113.591 632.484 113.591C622.732 113.591 614.225 112.167 606.961 109.317C599.765 106.414 594.183 102.113 590.215 96.414C586.247 90.6613 584.263 83.5377 584.263 75.0431V10.3656ZM731.935 10.3656L688.354 111.656H704.899L715.995 85.6882H766.436L777.129 111.656H793.674L751.102 10.3656H731.935ZM762.401 75.8495H720.031L741.216 25.6882L762.401 75.8495ZM823.825 10.3656V100.688H880.318V111.656H808.087V10.3656H823.825ZM897.982 10.3656V111.656H913.719V10.3656H897.982ZM932.353 10.3656V111.656H948.091V65.6882H1005.19V54.8818H948.091V21.1721H1009.43V10.3656H932.353ZM261.724 10.3656H242.961V111.656H258.698V28.6589L322.858 111.656H340.412V10.3656H324.674V91.9229L261.724 10.3656Z"
            fill="#fff"
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

export default MyApp;
