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

    const formatDate = (day, month, year) => {
        const currentDate = new Date();
        const formattedDay = (day || currentDate.getDate()).toString().padStart(2, '0');
        const formattedMonth = ((month || currentDate.getMonth()) + 1).toString().padStart(2, '0');
        const formattedYear = year || currentDate.getFullYear();

        return `${formattedDay}/${formattedMonth}/${formattedYear}`;
    }

    const createProject = useCallback(async (projectName, fileName, columns, rows) => {
        try {
            showLoading();
            const startDate = formatDate()
            const requestBody = {
                "start_date": startDate,
                "data_set": {
                    "columns": columns,
                    "rows": rows
                },
                "project_name": projectName,
                "file_name": fileName
            }
            console.log(requestBody)
            const res = await axios.post(url + 'projects/createProject', requestBody);
            console.log(res);
            if (res.status === 200 || res.status == 201) {
                console.log(res.data.results);
                // router.push('/login');
                addProject(userRole.username, res.data.results._id, projectName, fileName)
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
                "project_name": project_name,
                "file_name": file_name
            }
            console.log(requestBody)
            const res = await axios.patch(url + 'accounts/addProject', requestBody);
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

    return { error, isPending, createProject, addProject };
}