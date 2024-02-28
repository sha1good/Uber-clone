"use client";

import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const InputItem = ({ type }) => {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceHolder] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    type === "source"
      ? setPlaceHolder("Pickup Location")
      : setPlaceHolder("Dropoff Location");
  }, []);

  const getLatitudeAndLongitude = (place, type) => {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        console.log(place.geometry.location.lat());
        if (type === "source") {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      }
    });
  };
  return (
    <div className="flex items-center gap-2 bg-slate-200 p-3 mt-3 rounded-lg">
      <Image
        src={
          type === "source"
            ? "https://media.istockphoto.com/id/185224033/photo/colorful-pointers-and-multimedia.jpg?s=1024x1024&w=is&k=20&c=vCn4lXLPw7MP-jrmlRPpG-61ryImXJa675VyhpE-Njk="
            : "https://media.istockphoto.com/id/1084580766/photo/smart-city.jpg?s=1024x1024&w=is&k=20&c=BG1G1-X7sMEaasSN5p4lUxvx0kQyRkq8tQCcVpLzVD0="
        }
        width={30}
        height={30}
        alt="Logo"
      />
      {/* <input
        type="text"
        placeholder={type === "source" ? "Pickup Location" : "Dropoff Location"}
        className="bg-transparent w-full outline-none"
      /> */}
      <GooglePlacesAutocomplete
        // apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: (place) => {
            getLatitudeAndLongitude(place, type), setValue(place);
          },
          placeholder: placeholder,
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "#00ffff00",
              border: "none",
            }),
          },
        }}
      />
    </div>
  );
};

export default InputItem;
