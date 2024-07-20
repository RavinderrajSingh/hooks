import { useState } from 'react';
import axios from 'axios';

const key = import.meta.env.VITE_API_KEY; // your api key

const useCityCoordinates = () => {
    const [cityCoords, setCityCoords] = useState(null);
    const [cityCoordsLoading, setCityLoading] = useState(false);
    const [cityError, setCityError] = useState(null);

    // call this function on your cmponent to fetch cordinates i am not calling this is in useeffect becuase my api key has limited calls  so i want it to make a get only when i press enter or search button call this function any where when you want to fetch cordinates
    const fetchCoordinates = async (city) => {
        setCityLoading(true);
        setCityError(null);
        try {
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${key}`;
            console.log(`Fetching coordinates for city: ${city} with URL: ${url}`);
            const response = await axios.get(url);
            console.log('API Response:', response.data);

            if (response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry;
                setCityCoords({ lat, lon: lng });
            } else {
                setCityError('No results found');
            }
        } catch (error) {
            setCityError('Error fetching location data');
            console.error('Error fetching location data:', error);
        } finally {
            setCityLoading(false);
        }
    };

    return { cityCoords, cityCoordsLoading, cityError, fetchCoordinates };
};

export default useCityCoordinates;
