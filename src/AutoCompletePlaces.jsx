import React from 'react';
const GooglePlacesAutocomplete = ({
    apiKey,
    onPlaceSelected,
    placeholder = "Ingresa una dirección",
    className = "",
}) => {
    const inputRef = React.useRef(null);
    const [scriptLoaded, setScriptLoaded] = React.useState(false);
    const [autocomplete, setAutocomplete] = React.useState(null);
    // Cargar el script de Google Places API
    React.useEffect(() => {
        if (!scriptLoaded) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => setScriptLoaded(true);
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [apiKey, scriptLoaded]);
    React.useEffect(() => {
        if (scriptLoaded && inputRef.current && window) {
            const autocompleteInstance = new (window).google.maps.places.Autocomplete(
                inputRef.current,
                { types: ['address'] }
            );
            autocompleteInstance.addListener('place_changed', () => {
                const place = autocompleteInstance.getPlace();
                onPlaceSelected(place);
            });
            setAutocomplete(autocompleteInstance);
        }
        return () => {
            if (autocomplete) {
                // Limpiar listeners si es necesario
                google.maps.event.clearInstanceListeners(autocomplete);
            }
        };
    }, [scriptLoaded, onPlaceSelected]);
    return (
        <div className="google-places-autocomplete w-full">
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className={`place-input ${className}`}
            />
        </div>
    );
};
export default GooglePlacesAutocomplete