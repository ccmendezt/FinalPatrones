import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'

<GoogleMap
  apiKey={"Your Google Api Key"}
  style={{ height: "400px", width: "100%" }}
  zoom={6}
  center={{ lat: 37.4224764, lng: -122.0842499 }}
  markers={
    [
      { lat: 37.4224764, lng: -122.0842499 },
      { lat: 37.5224764, lng: -121.0842499 },
      { lat: 37.3224764, lng: -120.0842499 }
    ]
  } //optional
/>

function Mapa() {
  return (
    <div>
      <GoogleMap></GoogleMap>
    </div>
  )
}

export default Mapa
