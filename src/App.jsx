import { useState, useRef } from 'react'
import './App.css'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import AutoCompletePlaces from './AutoCompletePlaces'

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
          <AutoCompletePlaces
            apiKey={''}
            placeholder='Escribe aquí el nombre del lugar a para enviar el pedido.'
          >
          </AutoCompletePlaces>
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
