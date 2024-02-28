import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useContext, useEffect, useState } from "react";
const GoogleMapSection = () => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const containerStyle = {
    width: "100%",
    height: window.innerWidth * 0.5,
  };

  const [center, setCenter] = useState({
    lat: -37.453,
    lng: -38.905,
  });

  useEffect(() => {
    if (source !== null && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }

    if (source !== null && destination !== null) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination !== null && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }

    if (source !== null && destination !== null) {
      directionRoute();
    }
  }, [destination]);
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  // });

  const directionRoute = () => {
    const DirectionService = new google.maps.DirectionsService();

    DirectionService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          console.error("Error Occurred!");
        }
      }
    );
  };

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "2b7929ce330e75c7" }}
    >
      {/* {source !== null ? (
        <MarkerF position={{ lat: source.lat, lng: source.lng }}>
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
              <p>{source.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      ) : null} */}
      {source !== null ? (
        <MarkerF position={{ lat: source.lat, lng: source.lng }}>
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      {destination !== null ? (
        <MarkerF position={{ lat: destination.lat, lng: destination.lng }}>
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions: {
            strokeColor: "#000",
            strokeWeight: 5,
          },
          suppressMarkers: true,
        }}
      />
    </GoogleMap>
  );
};

export default GoogleMapSection;
