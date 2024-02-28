"use client";

import InputItem from "@/components/Home/InputItem";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { useContext, useEffect, useState } from "react";
import CarList from "./CarList";

const SearchSsection = () => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [distance, setDistance] = useState();
  const calculateDistance = () => {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: source.lat, lng: source.lng },
      { lat: destination.lat, lng: destination.lng }
    );

    setDistance(distance * 0.000621374);
  };

  useEffect(() => {
    if (source) {
      console.log(source);
    }

    if (destination) {
      console.log(destination);
    }
  }, [source, destination]);
  return (
    <div>
      <div className="border-[2px] p-2 md:p-6 rounded-xl">
        <p className="text-[20px] font-bold">Get a Ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          className="bg-black w-full mt-4 p-3 text-white rounded-lg"
          onClick={() => calculateDistance()}
        >
          Search
        </button>
      </div>
      {distance && <CarList distance={ distance} />}
    </div>
  );
};

export default SearchSsection;
