import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLoadingScreen } from "./useLoadingScreen";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { atomUserRole } from "@/atoms/atomUserRole";

export default function useAccount() {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const { showLoading, hideLoading } = useLoadingScreen();
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_DATABASE_SERVICE_URL;
    const [userRole, setUserRole] = useRecoilState(atomUserRole)

    const register = useCallback(async (username, password) => {
        try {
            setError(false);
            showLoading();
            const requestBody  = {
                username: username,
                password: password
            }
            const headers = {
                "content-type": "application/json"
            }
            console.log(requestBody)
            const res = await axios.post(url+'accounts/register', requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200|| res.status==201) {
                console.log(res.data.results);
                router.push('/login');
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


    const login = useCallback(async(username, password)=>{
        try {
            setError(false);
            showLoading();
            const requestBody  = {
                username: username,
                password: password
            }
            const headers = {
                "content-type": "application/json"
            }
            console.log(requestBody)
            const res = await axios.post(url+'accounts/login', requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.results.username);
                console.log(res.data.results._id);
                console.log(res.data.results.project);
                localStorage.setItem('username', username)
                setUserRole({
                    isLogin: true,
                    username:res.data.results.username,
                    userId:res.data.results._id,
                    project: res.data.results.project
                });
                router.push('/myProject')
            }else if(res.status === 400){
                console.log("bad request look network for reason")
                setError(true);
            } else {
                setError(true);
            }
            setIsPending(false);
        } catch (err) {
            setError('ไม่พบบัญชีผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง');
            setIsPending(false);
        } finally {
            hideLoading();
        }
    },[url, showLoading, hideLoading, router, setUserRole])

    const refreshLogin = useCallback(async(username)=>{
        try {
            setError(false);
            showLoading();
            
            const res = await axios.get(url+'accounts/'+username);
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.results.account.username);
                console.log(res.data.results.account._id);
                console.log(res.data.results.account.project);
                localStorage.setItem('username', username)
                setUserRole({
                    isLogin: true,
                    username:res.data.results.account.username,
                    userId:res.data.results.account._id,
                    project: res.data.results.account.project
                });
            }else if(res.status === 400){
                console.log("bad request look network for reason")
                setError(true);
            } else {
                setError(true);
            }
            setIsPending(false);
        } catch (err) {
            setError('ไม่พบบัญชีผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง');
            setIsPending(false);
        } finally {
            hideLoading();
        }
    },[url, showLoading, hideLoading, setUserRole])

    return { data, error, isPending, register, login, refreshLogin, setError };
}