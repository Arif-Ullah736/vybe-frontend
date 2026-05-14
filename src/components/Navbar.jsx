import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { ImSearch } from "react-icons/im";
import { RxVideo } from "react-icons/rx";
import { PiCalendarPlusBold } from "react-icons/pi";
import dp from "../assets/dp.jpg";
const Navbar = () => {
  return (
    <div className="w-[90%] lg:w-[40%] h-[80px]  bg-black flex justify-around items-center fixed rounded-full shadow-2xl shadow-[#000000]  z-[100] bottom-[20px]">
      <div className="text-white w-[25px]  h-[25px]">
        <IoHomeSharp />
      </div>

      <div className="text-white w-[25px]  h-[25px]">
        <ImSearch />
      </div>

      <div className="text-white w-[25px]  h-[25px]">
        <PiCalendarPlusBold />
      </div>

      <div className="text-white w-[25px]  h-[25px]">
        <RxVideo />
      </div>

      <div className="w-[40px] h-[40px] rounded-full border-2 border-black cursor-pointer overflow-hidden">
        <img src={dp} alt="" className="w-full object-cover" />
      </div>
    </div>
  );
};

export default Navbar;
