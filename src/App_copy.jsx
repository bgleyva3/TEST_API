import { useState, useRef } from 'react'
import './App.css'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  marginTop: '20px'
}

const center = {
  lat: 40.7128,
  lng: -74.0060
}

function App() {
  const inputref = useRef(null)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
    libraries: ['places']
  })

  const handleOnPlacesChanged = () => {
    let address = inputref.current.getPlaces()
    console.log('address:', address)
  }

  return (
    <>
      <div style={{marginTop:"10%", textAlign:"center"}}>
        {isLoaded &&
          <StandaloneSearchBox
            onLoad={(ref) => inputref.current = ref}
            onPlacesChanged = {handleOnPlacesChanged}
          >
            <input
              type="text"
              placeholder="Start typing your address"
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '50%',
                height: '50px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 1px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
                marginTop: '30px',
              }}
            />
          </StandaloneSearchBox>
        }
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
          >
          </GoogleMap>
        )}
      </div>
    </>
  )
}

export default App
