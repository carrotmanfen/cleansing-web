import { useState, useEffect, useCallback } from "react";
import axios from "axios";


export default function useAccount() {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const url = process.env.NEXT_PUBLIC_DATABASE_ACCOUNT_SERVICE_URL;

    const register = useCallback(async (username, password) => {
        try {
            const requestBody  = {
                username: username,
                password: password
            }
            console.log(requestBody)
            const res = await axios.post(url, requestBody);
            console.log(res);
            if (res.status === 200) {
                console.log(res.results);
                window.location.href = "/login"
            }else if(res.status === 400){
                console.log("asdmaklsdjlkasdm")
            } else {
                setError(err);
            }
            setIsPending(false);
        } catch (err) {
            setError(err);
            setIsPending(false);
        } 
    }, [url]);

    return { data, error, isPending, register };
}