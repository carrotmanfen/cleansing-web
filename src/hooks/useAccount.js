import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoadingScreen } from "./useLoadingScreen";
import { useRouter } from "next/router";

export default function useAccount() {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { showLoading, hideLoading } = useLoadingScreen();
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_DATABASE_ACCOUNT_SERVICE_URL;

    const register = useCallback(async (username, password) => {
        try {
            showLoading();
            const requestBody  = {
                username: username,
                password: password
            }
            console.log(requestBody)
            const res = await axios.post(url+'register', requestBody);
            console.log(res);
            if (res.status === 200|| res.status==201) {
                console.log(res.results);
                router.push('/login');
            }else if(res.status === 400){
                console.log("bad request look network for reason")
            } else {
                setError(err);
            }
            setIsPending(false);
        } catch (err) {
            setError(err);
            setIsPending(false);
        } finally {
            hideLoading();
        }
    }, [url, showLoading, hideLoading]);


    const login = useCallback(async(username, password)=>{
        try {
            showLoading();
            const requestBody  = {
                username: username,
                password: password
            }
            console.log(requestBody)
            const res = await axios.post(url+'login', requestBody);
            console.log(res);
            if (res.status === 200) {
                console.log(res.results);
                router.push('/myProject')
            }else if(res.status === 400){
                console.log("bad request look network for reason")
            } else {
                setError(err);
            }
            setIsPending(false);
        } catch (err) {
            setError(err);
            setIsPending(false);
        } finally {
            hideLoading();
        }
    },[url, showLoading, hideLoading])

    return { data, error, isPending, register, login };
}