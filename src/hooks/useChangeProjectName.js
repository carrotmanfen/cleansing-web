import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoadingScreen } from "./useLoadingScreen";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { atomUserRole } from "@/atoms/atomUserRole";

export default function useChangeProjectName() {
    // const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { showLoading, hideLoading } = useLoadingScreen();
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_DATABASE_SERVICE_URL;
    const [userRole, setUserRole] = useRecoilState(atomUserRole)

    const changeProjectNameInAccount = useCallback(async (project_name) => {
        const queryParams = new URLSearchParams(window.location.search);
        const searchProjectId = queryParams.get('projectId');
        try {
            showLoading();
            console.log(userRole)
            const requestBody = {
                "username": userRole.username,
                "project_id": searchProjectId,
                "project_name": project_name,
            }
            const headers = {
                "content-type": "application/json"
            }
            console.log(requestBody)
            const res = await axios.patch(url + 'accounts/updateProjectName', requestBody, {headers:headers});
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
                    query: { projectId: project_id},
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
    }, [url, showLoading, hideLoading, router, setUserRole, userRole]);

    return { error, isPending, changeProjectNameInAccount };
}