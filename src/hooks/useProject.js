import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoadingScreen } from "./useLoadingScreen";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { atomUserRole } from "@/atoms/atomUserRole";

export default function useProject() {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { showLoading, hideLoading } = useLoadingScreen();
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_DATABASE_SERVICE_URL;
    const [userRole, setUserRole] = useRecoilState(atomUserRole)

    const getProject = useCallback(async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const searchProjectId = queryParams.get('projectId');

        try {
            showLoading();
            const res = await axios.get(url + 'projects/' + searchProjectId);
            console.log(res);
            if (res.status === 200 || res.status == 201) {
                console.log(res.data.results);
                //    router.push('/login');
                setData(res.data.results)
            } else if (res.status === 400) {
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
    }, [url, showLoading, hideLoading, router]);

    useEffect(() => {
        if (data == null) {
            getProject();
        }

    }, [data, getProject]);

    const updateProject = async (projectId, data_set) => {  
        try {
            showLoading();
            const res = await axios.patch(url + 'projects/changeProject', {id:projectId, data_set:data_set});
            console.log(res);
            if (res.status === 200 || res.status == 201) {
                console.log(res.data.results);
                //    router.push('/login');
                // setData(res.data.results)
            } else if (res.status === 400) {
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
    }

    return { data, error, isPending, getProject, updateProject };


}