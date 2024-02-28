"use client";
import React, { useState } from "react";
import { CarListData } from "@/utils/CarListData";
import CarListItem from "./CarListItem";
import { useRouter } from "next/navigation";
const CarList = ({ distance }) => {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState([]);

  const router = useRouter();
  return (
    <div className="mt-5 overflow-auto h-[250px] p-5">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          className={`mt-5 cursor-pointer border-black rounded-md p-2 ${
            activeIndex === index ? "border-[2px]" : null
          }`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          <CarListItem item={item} distance={distance} />
        </div>
      ))}

      {selectedCar.name && (
        <div
          className="flex justify-between fixed bottom-5 rounded-lg w-full md:w-[30%] shadow-xl
      items-center border-[1px] bg-white p-2"
        >
          <h2>Make Payment For</h2>
          <button
            className="text-center bg-black text-white rounded-lg p-2"
            onClick={() =>
              router.push(
                "/payment?amount=" + (selectedCar.amount * distance).toFixed(2)
              )
            }
          >
            Request {selectedCar.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default CarList;
