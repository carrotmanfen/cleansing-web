import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoadingScreen } from "./useLoadingScreen";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { atomUserRole } from "@/atoms/atomUserRole";

export default function useReverse() {
    // const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { showLoading, hideLoading } = useLoadingScreen();
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_DATABASE_SERVICE_URL;
    const [userRole, setUserRole] = useRecoilState(atomUserRole);

    const changeProjectInAccount = useCallback(async (project_id, project_clean) => {
        try {
            showLoading();
            console.log(userRole)
            const requestBody = {
                "username": userRole.username,
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

    const reverseProject = useCallback(async (project_id, newProjectId) => {

        try {
            showLoading();
            const res = await axios.delete(url + 'projects/deleteProject/'+project_id);
            console.log(res);
            if (res.status === 200 || res.status == 201) {
                console.log(res.data.results);
                await changeProjectInAccount(project_id, newProjectId)
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

    return { error, isPending, reverseProject };
}