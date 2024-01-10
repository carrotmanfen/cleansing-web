import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoadingScreen } from "./useLoadingScreen";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { atomUserRole } from "@/atoms/atomUserRole";

export default function useAddProject() {
    // const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { showLoading, hideLoading } = useLoadingScreen();
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_DATABASE_SERVICE_URL;
    const [userRole, setUserRole] = useRecoilState(atomUserRole)

    const createProject = useCallback(async (columns, rows, project_name, file_name) => {
        try {
            showLoading();
            const requestBody = {
                "data_set": {
                    "columns": columns,
                    "rows": rows
                },
            }
            const headers = {
                "content-type": "application/json"
            }
            console.log(requestBody)
            const res = await axios.post(url + 'projects/createProject', requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200 || res.status == 201) {
                console.log(res.data.results);
                // router.push('/login');
                addProject(userRole.username, res.data.results._id,project_name, file_name )
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

    const addProject = useCallback(async (username, project_id, project_name, file_name) => {
        try {
            showLoading();
            console.log(userRole)
            const requestBody = {
                "username": username,
                "project_id": project_id,
                "project_name" : project_name,
                "file_name": file_name
            }
            const headers = {
                "content-type": "application/json"
            }
            console.log(requestBody)
            const res = await axios.patch(url + 'accounts/addProject', requestBody, {headers:headers});
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
    }, [url, showLoading, hideLoading, router]);

    return { error, setError, isPending, showLoading, hideLoading, createProject, addProject };
}