"use client"
import ClassPage from "@components/ClassPage/ClassPage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';

const Class = () => {
    const {subjectId,classId} = useParams();
    const [chapters, setChapters] = useState({});
    const [className, setClassName] = useState('')
    const [subject, setSubject] = useState('')
    useEffect(() =>{
        const fetchData = async () =>{
            const res = await fetch('/api/class/getChapters',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({subjectId:subjectId,classId:classId})
            });
            const data = await res.json();

            if(!data.ok){
                toast.error("Greška: "+ data.message);
            }else{
                await setData(data.data);
                await setClassName(data.className);
                await setSubject(data.subject)
            }
        }   
        fetchData();
    },[])
    return (
        data && <ClassPage data={data}/>
    )
}

export default Class