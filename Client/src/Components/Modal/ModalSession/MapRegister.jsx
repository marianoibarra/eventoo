import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { StaticGoogleMap, Marker } from "react-static-google-map";
// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
import placeholder from '../../../imgs/map-placeholder.png'
import { useSelector } from "react-redux";

const autocompleteService = { current: null };

const mapStyle =
  "feature:all|element:labels|visibility:off&style=feature:administrative|element:geometry.fill|color:0xf5f5f5&style=feature:administrative|element:labels.text|lightness:15&style=feature:administrative.locality|element:labels.text.fill|lightness:-11&style=feature:administrative.neighborhood|element:labels|visibility:on&style=feature:administrative.land_parcel|element:all|visibility:simplified&style=feature:landscape|element:geometry.fill|color:0xf5f5f5|lightness:-1&style=feature:landscape.natural.terrain|element:geometry.fill|visibility:off&style=feature:poi|element:labels|visibility:off&style=feature:poi.business|element:all|visibility:off&style=feature:road|element:labels|lightness:20|visibility:off&style=feature:road.highway|element:geometry|visibility:simplified|color:0xffffff|lightness:15&style=feature:road.highway.controlled_access|element:geometry|visibility:simplified|hue:0xff6500|lightness:0&style=feature:road.highway.controlled_access|element:labels|visibility:off&style=feature:road.arterial|element:geometry|visibility:simplified|color:0xffffff&style=feature:road.arterial|element:labels|visibility:on&style=feature:road.local|element:geometry|visibility:on&style=feature:road.local|element:geometry.stroke|visibility:on|color:0xffffff|lightness:0&style=feature:road.local|element:labels|visibility:off|lightness:28&style=feature:transit|element:all|visibility:off|lightness:15&style=feature:water|element:all|hue:0x007bff|saturation:30|lightness:49&style=feature:water|element:geometry|color:0x39c2c9|saturation:-20|gamma:1.00|lightness:46&style=feature:water|element:labels|visibility:off";

export default function GoogleMaps({ input, setInput, size="390x150", save=false, load=false}) {


  const user = useSelector(state => state.user)
  let valueSaved = null, inputValueSaved = '';

  if(load) {
    valueSaved = JSON.parse(localStorage.getItem('location_value'))
    inputValueSaved = localStorage.getItem('location_inputValue')
  }

  const [value, setValue] = React.useState(valueSaved);
  const [inputValue, setInputValue] = React.useState(inputValueSaved);
  const [coord, setCoord] = React.useState(null);
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        request.types = ["address"];
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );  

  React.useEffect(() => {
    if(load) {
      let valueSaved = JSON.parse(localStorage.getItem('location_value'))
      let inputValueSaved = localStorage.getItem('location_inputValue')
      if(valueSaved && inputValueSaved) {
        setValue(valueSaved)
        setInputValue(inputValueSaved)
      } else {
        setValue(null)
        setInputValue('')
      }
    }
  }, [user])

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  React.useEffect(() => {
    const getDetails = async () => {
      const results = await getGeocode({ address: value.description });
      const address = {};
      for (let component of results[0].address_components) {
        const type = component.types[0];
        switch (type) {
          case "street_number": {
            address.address_line = `${component.long_name}`;
            break;
          }
          case "route": {
            address.address_line = `${component.short_name} ${address.address_line}`;
            break;
          }
          case "postal_code": {
            address.zip_code = component.short_name;
            break;
          }
          case "locality":
            address.city = component.long_name;
            break;
          case "administrative_area_level_1": {
            address.state = component.long_name;
            break;
          }
          case "country":
            address.country = component.long_name;
            break;
        }
      }

      if(save && value) {
        localStorage.setItem('location_value', JSON.stringify(value))
        localStorage.setItem('location_inputValue', inputValue)
      }

      const resCoord = await getLatLng(results[0]);

      setInput({
        ...input,
        ...address,
      });

      setCoord(resCoord);
    };

     value && getDetails();

    if(inputValue === '') {
      setCoord(null)
      setInput({
        ...input,
        address_line: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
      })
    }
  }, [value]);

  return (
    <>
      <Autocomplete
        id="google-map-demo"
        sx={{ width: "100%", marginTop: "18px" }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        inputValue={inputValue}
        InputProps={{ inputProps: { tabIndex: -1 } }}
        filterSelectedOptions
        value={value}
        noOptionsText={inputValue === null || inputValue.length === 0 ? 'Enter your location above' : "No locations"}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          if(event !== null) setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} inputProps={{ ...params.inputProps, tabIndex: 1 }}  label="Add your location" fullWidth />
        )}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );

          return (
            <li {...props}>
              <div id="map"></div>
              <Grid container alignItems="center">
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      {part.text}
                    </Box>
                  ))}

                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
      <div style={{marginTop: '12px', marginBottom: '12px', backgroundImage: `url(${placeholder})`, width: size.split('x')[0]+'px', height: size.split('x')[1]+'px'}}>
        {coord 
          && (
              <StaticGoogleMap
                style={mapStyle}
                zoom={13}
                size={size}
                className="img-fluid"
                apiKey="AIzaSyDjaoLiwIGBU9Hr5hr1538Ddbk8n0m-a3g"
              >
                <Marker
                  scale={2}
                  iconURL="https://eventbrite-s3.s3.amazonaws.com/marketing/eds/static-map/custom-markers/pin-listings@1x.png"
                  location={coord}
                />
              </StaticGoogleMap>
            )
          
        }
      </div>
    </>
  );
}
