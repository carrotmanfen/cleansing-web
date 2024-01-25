import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoadingScreen } from "./useLoadingScreen";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { atomUserRole } from "@/atoms/atomUserRole";

export default function useCleansing() {
    const [data, setData] = useState(null);
    const [data3, setData3] = useState(null)
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
            else if(method=="2"){
                urlMethod = "removedupdata/check"
            }
            else if(method=="6"){
                urlMethod = "replaceexcdata/check"
            }
            else if(method=="3"){
                urlMethod = "editincdata/check"
            }
            else if(method=="4"){
                urlMethod = "managenavalue/check"
            }
            else if(method=="7"){
                urlMethod = "removeunrnumber/check"
            }
            else if(method=="8"){
                urlMethod = "flagoutlier/check"
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

    const createProject = useCallback(async (columns, rows, projectId, clean_name) => {
        try {
            showLoading();
            const requestBody = {
                "data_set": {
                    "columns": columns,
                    "rows": rows
                },
                "clean":{"clean_id":projectId,"clean_name":clean_name}
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
            let clean_name;
            if(method == "1"){
                urlMethod = "removeirrdata/clean"
                clean_name = "ลบคอลัมน์ที่ไม่เกี่ยวข้อง"
            }else if(method=="2"){
                urlMethod = "removedupdata/clean"
                clean_name = "ลบข้อมูลที่ซ้ำซ้อน"
            }
            else if (method=="3"){
                urlMethod = "editincdata/clean"
                clean_name = "แก้ไขข้อมูลที่ผิดปกติ"
            }
            else if (method=="4"){
                urlMethod = "managenavalue/clean"
                clean_name = "จัดการข้อมูลที่ขาดหายไป"
            }
            else if(method=="6") {
                urlMethod = "replaceexcdata/clean"
                clean_name = "เปลี่ยนข้อมูลประเภท กลุ่ม ที่มีจำนวนน้อย เป็น “อื่น "
            }
            else if(method=="7"){
                urlMethod = "removeunrnumber/clean"
                clean_name = "นำข้อมูลที่ไม่ตรงกับประเภทข้อมูลออก"
            }
            else if(method=="8"){
                urlMethod = "flagoutlier/clean"
                clean_name = "ระบุค่าผิดปกติทางสถิติ"
            }
            const res = await axios.post(url+urlMethod, requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200|| res.status==201) {
                if(res.data[0]){
                    const columns = Object.keys(res.data[0]).map(label => ({ label, dataKey: label }));
                    createProject(columns, res.data, projectId, clean_name)
                }else{
                    setError("ไม่สามารถทำความสะอาดด้วยวิธีนี้ได้เนื้องจากส่งผลให้ข้อมูลทั้งหมดหายไป")
                    console.log("no data")
                }
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

    const getDataMethod3 = useCallback(async (data_set) => {
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
            const res = await axios.post(url+"editincdata", requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200|| res.status==201) {
                console.log(res.data.column)
                setData3(res.data.column)
                
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

    return { data, error, isPending, setError, getDataCheck, cleanConfirm, getDataMethod3, data3 };
}