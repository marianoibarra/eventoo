import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  StaticGoogleMap,
  Marker,
} from 'react-static-google-map';

const style = 'feature:all|element:labels|visibility:off&style=feature:administrative|element:geometry.fill|color:0xf5f5f5&style=feature:administrative|element:labels.text|lightness:15&style=feature:administrative.locality|element:labels.text.fill|lightness:-11&style=feature:administrative.neighborhood|element:labels|visibility:on&style=feature:administrative.land_parcel|element:all|visibility:simplified&style=feature:landscape|element:geometry.fill|color:0xf5f5f5|lightness:-1&style=feature:landscape.natural.terrain|element:geometry.fill|visibility:off&style=feature:poi|element:labels|visibility:off&style=feature:poi.business|element:all|visibility:off&style=feature:road|element:labels|lightness:20|visibility:off&style=feature:road.highway|element:geometry|visibility:simplified|color:0xffffff|lightness:15&style=feature:road.highway.controlled_access|element:geometry|visibility:simplified|hue:0xff6500|lightness:0&style=feature:road.highway.controlled_access|element:labels|visibility:off&style=feature:road.arterial|element:geometry|visibility:simplified|color:0xffffff&style=feature:road.arterial|element:labels|visibility:on&style=feature:road.local|element:geometry|visibility:on&style=feature:road.local|element:geometry.stroke|visibility:on|color:0xffffff|lightness:0&style=feature:road.local|element:labels|visibility:off|lightness:28&style=feature:transit|element:all|visibility:off|lightness:15&style=feature:water|element:all|hue:0x007bff|saturation:30|lightness:49&style=feature:water|element:geometry|color:0x39c2c9|saturation:-20|gamma:1.00|lightness:46&style=feature:water|element:labels|visibility:off'

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDjaoLiwIGBU9Hr5hr1538Ddbk8n0m-a3g',
    libraries: ["places"]
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map/>;
}

function Map() {

  const { address_line, city, state, country } = useSelector(state => state.eventDetail.eventDetail.address);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const address = `${address_line}, ${city}, ${state}, ${country}`;
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      setLocation({ lat, lng });
    }
    fetchData();
  }, []);

  return (
    <>
      {location &&
        <StaticGoogleMap style={style} zoom={16} size="620x300" className="img-fluid" apiKey="AIzaSyDjaoLiwIGBU9Hr5hr1538Ddbk8n0m-a3g">
          <Marker scale={2} iconURL="https://eventbrite-s3.s3.amazonaws.com/marketing/eds/static-map/custom-markers/pin-listings@1x.png" location={location} />
        </StaticGoogleMap>
      }
    </>
  )
}