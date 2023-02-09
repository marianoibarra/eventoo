import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox'
import {
  StaticGoogleMap,
  Marker,
} from 'react-static-google-map';
import { useDispatch } from "react-redux";
import { updateAddress, updateAddressLine, updateCity, updateCountry, updateState, updatestate, updateZipCode } from "../../../Slice/CreateEvent/CreateEvent";
// import style from './Map.module.css'

const style = 'feature:all|element:labels|visibility:off&style=feature:administrative|element:geometry.fill|color:0xf5f5f5&style=feature:administrative|element:labels.text|lightness:15&style=feature:administrative.locality|element:labels.text.fill|lightness:-11&style=feature:administrative.neighborhood|element:labels|visibility:on&style=feature:administrative.land_parcel|element:all|visibility:simplified&style=feature:landscape|element:geometry.fill|color:0xf5f5f5|lightness:-1&style=feature:landscape.natural.terrain|element:geometry.fill|visibility:off&style=feature:poi|element:labels|visibility:off&style=feature:poi.business|element:all|visibility:off&style=feature:road|element:labels|lightness:20|visibility:off&style=feature:road.highway|element:geometry|visibility:simplified|color:0xffffff|lightness:15&style=feature:road.highway.controlled_access|element:geometry|visibility:simplified|hue:0xff6500|lightness:0&style=feature:road.highway.controlled_access|element:labels|visibility:off&style=feature:road.arterial|element:geometry|visibility:simplified|color:0xffffff&style=feature:road.arterial|element:labels|visibility:on&style=feature:road.local|element:geometry|visibility:on&style=feature:road.local|element:geometry.stroke|visibility:on|color:0xffffff|lightness:0&style=feature:road.local|element:labels|visibility:off|lightness:28&style=feature:transit|element:all|visibility:off|lightness:15&style=feature:water|element:all|hue:0x007bff|saturation:30|lightness:49&style=feature:water|element:geometry|color:0x39c2c9|saturation:-20|gamma:1.00|lightness:46&style=feature:water|element:labels|visibility:off'

export default function App({input, setInput, errors, setShowMsg, showMsg}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDjaoLiwIGBU9Hr5hr1538Ddbk8n0m-a3g',
    libraries: ["places"]
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg} />;
}

function Map({input, setInput, errors, setShowMsg, showMsg}) {

  const [selected, setSelected] = useState(null)

  return (
    <div className="container">
      <div className="places-container">
        <PlacesAutocomplete input={input} setInput={setInput} errors={errors} showMsg={showMsg} setShowMsg={setShowMsg} setSelected={setSelected} />
      </div>
      {selected && 
      <div className="map-container">
        <StaticGoogleMap style={style} zoom={13} size="720x165" className="img-fluid" apiKey="AIzaSyDjaoLiwIGBU9Hr5hr1538Ddbk8n0m-a3g">
          <Marker scale={2} iconURL="https://eventbrite-s3.s3.amazonaws.com/marketing/eds/static-map/custom-markers/pin-listings@1x.png" location={selected} />
        </StaticGoogleMap>
      </div>
      }
    </div>
  )
}

const PlacesAutocomplete = ({setSelected, input, setInput, errors, setShowMsg, showMsg}) => {

  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions
  } = usePlacesAutocomplete()

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()
    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    const info = {}
    for(let component of results[0].address_components) {
      const type = component.types[0]
      switch(type) {

        case "street_number": {
          info.address_line = `${component.long_name}`;
          break;
        }
        case "route": {
          info.address_line = `${component.short_name} ${info.address_line}`;
          break;
        }
        case "postal_code": {
          info.zip_code = component.short_name;
          break;
        }
        case "locality":
          info.city = component.long_name;
          break;
        case "administrative_area_level_1": {
          info.state = component.long_name;
          break;
        }
        case "country":
          info.country = component.long_name;
          break;
      }
    }
    setSelected({ lat, lng });
    setInput({
      ...input,
      address_line: info.address_line,
      city: info.city,
      country: info.country,
      state: info.state,
      zip_code: info.zip_code     
    })
  }


  return (
    <>
    <Combobox onSelect={handleSelect}>
      <ComboboxInput style={{backgroundColor: 'white', padding: '10px',margin: '10px',maxWidth: '400px',borderRadius: '5px', border: '1px solid #aaa'}} value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} className='combobox-input' placeholder='Address' />
      <ComboboxPopover>
        <ComboboxList style={{backgroundColor: 'white', marginTop: '4px', borderRadius: '8px', overflow: 'hidden', boxShadow: '4px 4px 20px #3332'}}>
          {status === "OK" && data.map(({place_id, description}) => <ComboboxOption style={{backgroundColor: 'white', fontSize: '0.9rem', cursor: 'pointer', minHeight: '20px', padding: '4px', listStyle: 'none'}} key={place_id} value={description} />)}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    {showMsg.address_line&&(
                            <p className={style.warning}>{errors.address_line}</p>
                        )}
    </>
    
  )
}