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
            else if(method=="5"){
                urlMethod = "splitcolumn/check"
            }
            else if(method=="55"){
                urlMethod = "joincolumns/check"
            }
            else if(method=="7"){
                urlMethod = "removeunrnumber/check"
            }
            else if(method=="8"){
                urlMethod = "flagoutlier/check"
            }
            else if(method=="9"){
                urlMethod = "removeoutlier/check"
            }
            else if(method=="10"){
                urlMethod = "changeoutlier/check"
            }
            else if (method=="12"){
                urlMethod = "renameheader/check"
            }
            const res = await axios.post(url+urlMethod, requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200|| res.status==201) {
                let columns;
                if(method=="12"){
                    columns = res.data.columns
                }else{
                    columns = Object.keys(res.data[0]).map(label => {
                        if (label !== 'st@tus') {
                          return { label, dataKey: label };
                        }
                        return null; // Skip this label
                      }).filter(Boolean);
                }
                let dataSet;
                if(method=="12"){
                    dataSet ={
                        columns,
                        rows:res.data.rows
                    }
                }else{
                    dataSet ={
                        columns,
                        rows:res.data
                    }
                }
                console.log(dataSet)
                setData(dataSet)
                
            }else if(res.status === 400){
                console.log("bad request look network for reason")
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากข้อมูลไม่ถูกต้อง")
            } else {
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            }
            setIsPending(false);
        } catch (err) {
            setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            setIsPending(false);
        } finally {
            hideLoading();
        }
    }, [url, showLoading, hideLoading]);

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
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากข้อมูลไม่ถูกต้อง")
            } else {
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            }
            setIsPending(false);
        } catch (err) {
            setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            setIsPending(false);
        } finally {
            hideLoading();
        }
    }, [ showLoading, hideLoading, router, setUserRole, userRole]);

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
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากข้อมูลไม่ถูกต้อง")
            } else {
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            }
            setIsPending(false);
        } catch (err) {
            setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            setIsPending(false);
        } finally {
            hideLoading();
        }
    }, [ showLoading, hideLoading, changeProjectInAccount, userRole.username]);

    function convertStringsToNumbers(data, columnName) {
        if (data.every(row => !isNaN(Number(row[columnName])))) {
          data.forEach(row => {
            row[columnName] = Number(row[columnName]);
          });
        }
      }
      function canConvertToNumber(str) {
        return !isNaN(Number(str));
      }
      function determineColumnType(columnValues) {
        const allNumbers = columnValues.every(value => typeof value === 'number'||canConvertToNumber(value));
        const allStrings = columnValues.every(value => typeof value === 'string'||value === null);
      
        if (allNumbers) {
          return 'number';
        } else if (allStrings) {
          return 'string';
        } else {
          return 'string';
        }
    }

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
            else if(method=="5"){
                urlMethod = "splitcolumn/clean"
                clean_name = "แยกคอลัมน์"
            }
            else if(method=="55"){
                urlMethod = "joincolumns/clean"
                clean_name = "รวมคอลัมน์"
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
            else if(method=="9"){
                urlMethod = "removeoutlier/clean"
                clean_name = "ระบุค่าผิดปกติทางสถิติ"
            }
            else if(method=="10"){
                urlMethod = "changeoutlier/clean"
                clean_name = "ลบค่าผิดปกติทางสถิติ"
            }else if (method=="12"){
                clean_name = "เปลี่ยนชื่อคอลัมน์"
                urlMethod = "renameheader/clean"
            }
            const res = await axios.post(url+urlMethod, requestBody, {headers:headers});
            console.log(res);
            if (res.status === 200|| res.status==201) {
                if(method=="12"){
                    if(res.data.rows[0]){
                        const columns = res.data.columns;
                        createProject(columns, res.data.rows, projectId, clean_name)
                    }else{
                        setError("ไม่สามารถทำความสะอาดด้วยวิธีนี้ได้เนื้องจากส่งผลให้ข้อมูลทั้งหมดหายไป")
                        console.log("no data")
                    }
                }else{
                    if(res.data[0]){
                        const columns = Object.keys(res.data[0]).map(label => ({ label, dataKey: label }));
                        console.log(columns)
                        columns.map(column => {
                            column.type = determineColumnType(res.data.map(row => row[column.dataKey]))
                        })
                        console.log("columns end")
                        columns.map(column => {
                            convertStringsToNumbers(res.data, column);
                        });
                        createProject(columns, res.data, projectId, clean_name)
                    }else{
                        setError("ไม่สามารถทำความสะอาดด้วยวิธีนี้ได้เนื้องจากส่งผลให้ข้อมูลทั้งหมดหายไป")
                        console.log("no data")
                    }
                }
            }else if(res.status === 400){
                console.log("bad request look network for reason")
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากข้อมูลไม่ถูกต้อง")
            } else {
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            }
            setIsPending(false);
        } catch (err) {
            setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            setIsPending(false);
        } finally {
            hideLoading();
        }
    }, [url, showLoading, hideLoading, createProject]);
    function checkType(variable) {
        // Check if the variable is an object
        if (typeof variable === 'object' && variable !== null) {
            return 'object';
        }
    
        // Check if the variable is a JSON string
        try {
            let variableWithNull = variable.replace(/NaN/g, 'null');
            JSON.parse(variableWithNull);
            return 'JSON string';
        } catch (e) {
            return 'not a JSON string';
        }
    }
    function jsonStringToObject(jsonString) {
        // Replace NaN with null in the JSON string
        let jsonStringWithNull = jsonString.replace(/NaN/g, 'null');
    
        // Parse the JSON string into a JavaScript object
        let obj = JSON.parse(jsonStringWithNull);
        
        return obj;
    }
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
                console.log(res.data)
                console.log(checkType(res.data));
                if(checkType(res.data)=='object'){
                    setData3(res.data.column)
                }else{
                    let obj = jsonStringToObject(res.data);
                    console.log(obj)
                    console.log("parse json")
                    setData3(obj.column)
                }
                
            }else if(res.status === 400){
                console.log("bad request look network for reason")
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากข้อมูลไม่ถูกต้อง")
            } else {
                setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            }
            setIsPending(false);
        } catch (err) {
            setError("ไม่สามารถทำความสะอาดข้อมูลได้ในขณะนี้เนื่องจากเกิดข้อผิดพลาดจากระบบ")
            setIsPending(false);
        } finally {
            hideLoading();
        }
    }, [url, showLoading, hideLoading]);

    return { data, error, isPending, setError, getDataCheck, cleanConfirm, getDataMethod3, data3 };
}