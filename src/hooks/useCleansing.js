import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoadingScreen } from "./useLoadingScreen";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { atomUserRole } from "@/atoms/atomUserRole";

export default function useCleansing() {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(false);
    const { showLoading, hideLoading } = useLoadingScreen();
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_CLEANSING_SERVICE_URL;
    const [userRole, setUserRole] = useRecoilState(atomUserRole)

    const getDataCheck = useCallback(async (method, data_set) => {
        try {
            setError(false);
            showLoading();
            const requestBody  = {
                data_set
            }
            const headers = {
                "content-type": "application/json"
            }
            console.log(requestBody)
            let urlMethod;
            if(method == "1"){
                urlMethod = "removeirrdata/check"
            }
            const res = await axios.post(url+urlMethod, requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200|| res.status==201) {
                console.log(res.data.results);
                
            }else if(res.status === 400){
                console.log("bad request look network for reason")
                setError(true);
            } else {
                setError(true);
            }
            setIsPending(false);
        } catch (err) {
            setError(true);
            setIsPending(false);
        } finally {
            hideLoading();
        }
    }, [url, showLoading, hideLoading, router]);


    

    return { data, error, isPending, setError, getDataCheck };
}