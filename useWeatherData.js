import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl = `https://api.open-meteo.com/v1/forecast?`;
const endPoint = `&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,wind_speed_10m_max`;

// it give current and daily weather data [7day forecast]
const useWeatherData = (lat, lon, timezone) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const url = `${baseUrl}latitude=${lat}&longitude=${lon}${endPoint}&timezone=${timezone}`;

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (err) {
            console.error("Error getting data: ", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (lat && lon) {
            getData();
        }
    }, [lat, lon, timezone]);

    return { data, loading, error };
};

export default useWeatherData;
