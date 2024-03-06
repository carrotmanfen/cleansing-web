import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoadingScreen } from "./useLoadingScreen";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { atomUserRole } from "@/atoms/atomUserRole";

export default function useDeleteProject() {
    // const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { showLoading, hideLoading } = useLoadingScreen();
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_DATABASE_SERVICE_URL;
    const [userRole, setUserRole] = useRecoilState(atomUserRole)

    const deleteProjectInAccount = useCallback(async (project_id) => {

        try {
            showLoading();
            const requestBody = {
                "username": userRole.username,
                "project_id": project_id,
            }
            const headers = {
                "content-type": "application/json"
            }
            const res = await axios.delete(url + 'accounts/deleteProjectInAccount', {headers:headers, data:requestBody});
            console.log(res);
            if (res.status === 200 || res.status == 201) {
                console.log(res.data.results);
                setUserRole({
                    isLogin: true,
                    username:res.data.results.username,
                    userId:res.data.results._id,
                    project: res.data.results.project
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

    const deleteProject = useCallback(async (project_id) => {

        try {
            showLoading();
            const res = await axios.delete(url + 'projects/deleteProject/'+project_id);
            console.log(res);
            if (res.status === 200 || res.status == 201) {
                console.log(res.data.results);
                await deleteProjectInAccount(project_id)
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

    return { error, isPending, deleteProject };
}