import React from "react";
import Image from "next/image";
import { HiUser } from "react-icons/hi";
const CarListItem = ({ item, distance }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src={item.image} width={100} height={200} />
          <div>
            <h2 className="font-semibold  text-[18px] flex items-center gap-3">
              {item.name}

              <span className="flex items-center gap-2">
                <HiUser /> {item.seat}
              </span>
            </h2>
            <p>{item.desc}</p>
          </div>
        </div>
        <h2 className="font-semibold  text-[18px]">
          ${(item.amount * distance).toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default CarListItem;
