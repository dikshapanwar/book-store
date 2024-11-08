import React from "react";
import bannerImage from '../../assets/banner.png'
function Banner() {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16  items-center justify-center gap-12">
         <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImage} alt="" />
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className=" md:text-5xl text-2xl font-medium mb-7">
          New Releases This Week{" "}
        </h1>
        <p className="mb-10">
          "I want a better catastrophe" can be seen as an intriguing paradox,
          reflecting the desire for something less destructive amid chaos.
          Here's some text exploring this concept: I want a better catastrophe,
         
        </p>
        <button className="btn-primary">Subscribe</button>
      </div>
     
    </div>
  );
}

export default Banner;
