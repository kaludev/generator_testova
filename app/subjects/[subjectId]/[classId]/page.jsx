"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import ChaptersPage from "@components/ChaptersPage/ChaptersPage";

const Class = () => {
    const {subjectId,classId} = useParams();
    const [chapters, setChapters] = useState([]);
    const [className, setClassName] = useState('')
    const [subject, setSubject] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        const fetchData = async () =>{
            const res = await fetch('/api/chapter/getChapters',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({subjectId:subjectId,classId:classId})
            });
            const data = await res.json();

            if(!data.ok){
                toast.error("Greška: "+ data.message);
            }else{
                await setChapters(data.data);
                await setClassName(data.className);
                await setSubject(data.subjectId)

            }
            await setLoading(false);
        }   
        fetchData();
    },[])

    return (
        chapters && <ChaptersPage loading ={loading} chapters={chapters} classes={className} subject={subject} classId={classId} subjectId={subjectId} setChapters={setChapters}/>
    )
}

export default Class