import { useEffect, useState } from "react"


// to get current location coordinates of user
const useCurrentLocation = () => {
    const [currentCoords, setCoordinates] = useState({ lat: null, lon: null });
    const [currError, setError] = useState(null);
    const [isPermissionGranted, setPermissionGranted] = useState(false);
    const [isCheckingPermission, setIsCheckingPermission] = useState(true);


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPermissionGranted(true);
                    setCoordinates({ lat: position.coords.latitude, lon: position.coords.longitude });
                }, (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setPermissionGranted(false);
                            setError("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setPermissionGranted(false);
                            setError("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            setPermissionGranted(false);
                            setError("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            setPermissionGranted(false);
                            setError("An unknown error occurred.");
                            break;
                        default:
                            setPermissionGranted(false);
                            setError("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            setPermissionGranted(false);
            setError("Geolocation is not supported by this browser.");
        }
    };


    const CheckPremissions = async () => {
        try {
            const permssionStatus = await navigator.permissions.query({ name: 'geolocation' });
            // console.log(permssionStatus);

            if (permssionStatus.state === 'granted') {
                setPermissionGranted(true);
                console.log('Permission granted');
                getLocation();
            } else {
                setPermissionGranted(false);
                console.log('Permission denied');
            }
        } catch (e) {
            setIsCheckingPermission(false);
            console.error("error checking permision status : ", e);
        } finally { setIsCheckingPermission(false); }
    }

    useEffect(() => {
        CheckPremissions();
    }, []);



    // console.log("cords" , coordinates , "err" , error , isPermissionGranted , isCheckingPermission)

    return { currentCoords, currError, isPermissionGranted, isCheckingPermission,  CheckPremissions, getLocation };
}

export default useCurrentLocation