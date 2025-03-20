import './App.css'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
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
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  return (
    <>
      <div style={{marginTop:"10%", textAlign:"center"}}>
        {isLoaded &&
          <AutoCompletePlaces
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
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
