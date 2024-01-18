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
            }else if(method=="2"){
                urlMethod = "removedupdata/check"
            }
            const res = await axios.post(url+urlMethod, requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200|| res.status==201) {
                const columns = Object.keys(res.data[0]).map(label => {
                    if (label !== 'st@tus') {
                      return { label, dataKey: label };
                    }
                    return null; // Skip this label
                  }).filter(Boolean);
                const dataSet ={
                    columns,
                    rows:res.data
                }
                console.log(dataSet)
                setData(dataSet)
                
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

    const changeProjectInAccount = useCallback(async (username, project_id, project_clean) => {
        try {
            showLoading();
            console.log(userRole)
            const requestBody = {
                "username": username,
                "project_id": project_id,
                "project_clean": project_clean
            }
            const headers = {
                "content-type": "application/json"
            }
            console.log(requestBody)
            const urlProject = process.env.NEXT_PUBLIC_DATABASE_SERVICE_URL;
            const res = await axios.patch(urlProject + 'accounts/updateClean', requestBody, { headers: headers });
            console.log(res);
            if (res.status === 200 || res.status == 201) {
                console.log(res.data.results);
                setUserRole({
                    isLogin: true,
                    username: res.data.results.username,
                    userId: res.data.results._id,
                    project: res.data.results.project
                });
                router.push({
                    pathname: '/main',
                    query: { projectId: project_clean },
                });
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

    const createProject = useCallback(async (columns, rows, projectId) => {
        try {
            showLoading();
            const requestBody = {
                "data_set": {
                    "columns": columns,
                    "rows": rows
                },
                "clean":projectId
            }
            const headers = {
                "content-type": "application/json"
            }
            console.log(requestBody)
            const urlProject = process.env.NEXT_PUBLIC_DATABASE_SERVICE_URL;
            const res = await axios.post(urlProject + 'projects/createProject', requestBody, { headers: headers });
            console.log(res);
            if (res.status === 200 || res.status == 201) {
                console.log(res.data.results);
                
                changeProjectInAccount(userRole.username, projectId, res.data.results._id)
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
    }, [url, showLoading, hideLoading]);

    const cleanConfirm = useCallback(async (method, data_set, projectId) => {
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
                urlMethod = "removeirrdata/clean"
            }else if(method=="2"){
                urlMethod = "removedupdata/clean"
            }
            const res = await axios.post(url+urlMethod, requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200|| res.status==201) {
                const columns = Object.keys(res.data[0]).map(label => ({ label, dataKey: label }));
                createProject(columns, res.data, projectId)
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

    return { data, error, isPending, setError, getDataCheck, cleanConfirm };
}