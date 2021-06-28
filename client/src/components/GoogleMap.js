import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
// import { Link } from 'react-router-dom';
// import Loading from './Loading';
// import barIcon from '../assets/icons/beer.svg';
// import restaurantIcon from '../assets/icons/restaurant.svg';
// import storeIcon from '../assets/icons/store.svg';
// import markerIcon from '../assets/icons/pin.svg';
// import getCurrentLocationIcon from '../assets/icons/get-current-location.svg';

const containerStyle = {
  width: '100%',
  height: '250px',
  marginTop: '1rem',
  borderRadius: '5px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const zoom = 11;

const latLngVan = { lat: 49.282729, lng: -123.120738 };

function Map(props) {
  const { shops, isLoading } = props;

  const [center, setCenter] = useState(latLngVan);
  const [bounds, setBounds] = useState(null);
  const [shopsOnMap, setShopsOnMap] = useState(shops);
  const [selected, setSelected] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const mapRef = useRef();

  const handleLoad = useCallback((map) => (mapRef.current = map), []);

  const handleBoundsChange = () => {
    if (mapRef.current) setBounds(mapRef.current.getBounds());
  };

  const getCurrentLocation = () => {
    setDisabled(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setDisabled(false);
      },
      () => {
        setCenter(latLngVan);
        setDisabled(false);
        console.log('failed to get current location');
      },
      { timeout: 5000 }
    );
  };

  useEffect(() => {
    if (bounds) {
      const newShopsOnMap = shops.filter((shop) =>
        bounds.contains({
          lat: shop.geocode.latitude,
          lng: shop.geocode.longitude,
        })
      );
      setShopsOnMap(newShopsOnMap);
    }
  }, [shops, bounds]);

  // if (isLoading) return <Loading />;

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={options}
        zoom={zoom}
        onLoad={handleLoad}
        onBoundsChanged={handleBoundsChange}
      >
        <div
          onClick={getCurrentLocation}
          disabled={disabled}
          className={disabled ? 'icon-btn--get-current-location--disabled' : 'icon-btn--get-current-location'}
        >
          {/* <img src={getCurrentLocationIcon} alt="" /> */}
        </div>

        {shopsOnMap.map((shop) => (
          <Marker
            position={{
              lat: shop.geocode.latitude,
              lng: shop.geocode.longitude,
            }}
            label={{
              text: shop.id.toString(),
              color: 'black',
              fontSize: '16px',
            }}
            onClick={() => setSelected(shop)}
            // icon={{
            //   url: markerIcon,
            //   scaledSize: new window.google.maps.Size(48, 48),
            //   labelOrigin: new window.google.maps.Point(24, 16),
            // }}
            key={shop.id}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.geocode.latitude,
              lng: selected.geocode.longitude,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="info-window">
              <p className="shop-name">{selected.name}</p>
              <p className="shop-address">{selected.address}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}

export default React.memo(Map);
