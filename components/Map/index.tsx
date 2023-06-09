import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { MdOutlineLocationSearching, MdPlace, MdSearch } from 'react-icons/md';
import Button from '../Button/Button';

const containerStyle = {
    width: '100%',
    height: '400px'
};

type GoogleProps = {
    apiKey: string;
    value: any;
    setValue: Dispatch<SetStateAction<any>>;
}

const GoogleMaps = ({ apiKey, value, setValue }: GoogleProps) => {
    const [currentPosition, setCurrentPosition] = useState<any>()
    const [searchBox, setSearchBox] = useState<any>(null);
    const [center, setCenter] = useState<any>({
        lat: 37.7749,
        lng: -122.4194
    });
    const [position, setPosition] = useState<any>({
        lat: 37.7749,
        lng: -122.4194
    });

    const [ libraries ] = useState(['places']);

    const onLoad = useCallback((ref: any) => {
        setSearchBox(ref);
    }, []);

    const handlePlaceChanged = () => {
        const place = searchBox.getPlaces()[0];
        const location = place.geometry.location;

        if (location) {
            setValue({
                url: place.url,
                address: place.formatted_address,
                lat: location.lat(),
                lng: location.lng()
            })
            setCenter({
                lat: location.lat(),
                lng: location.lng()
            });
            setPosition({
                lat: location.lat(),
                lng: location.lng()
            });
        }
    }


    const getCurrentPosition = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
                setCenter({
                    lat: latitude,
                    lng: longitude
                });
            }, (error) => {
                console.error('Error getting current position:', error);
            }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        getCurrentPosition();
    }, []);

    useEffect(() => {
      if(value?.lat) {
        setCenter({
            lat: value?.lat,
            lng: value?.lng,
        });
        setPosition({
            lat: value?.lat,
            lng: value?.lng,
        });
      }
    }, [value])
    

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries as any[]} version="weekly">
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={handlePlaceChanged}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for a location"
                        className='w-full mb-3 text-sm pl-10 rounded-lg border border-stroke bg-transparent py-3 px-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary disabled:border-0 disabled:bg-transparent'
                    />
                    <MdSearch className='w-6 h-6 absolute top-3 left-3' />
                </div>
            </StandaloneSearchBox>

            <div className='relative'>
                <Button
                    type='button'
                    variant="secondary"
                    className='absolute z-50 left-5 bottom-5 rounded-lg text-sm'
                    onClick={getCurrentPosition}
                >
                    <MdOutlineLocationSearching className='w-5 h-5' />
                </Button>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >
                    {currentPosition && <Marker position={currentPosition} />}
                    {position && <Marker clickable={true} position={position} />}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};


export default GoogleMaps;
