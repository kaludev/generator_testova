"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
const chaptersPage = () => {
    const {subjectId} = useParams();
    const [chapters, setChapters] = useState([]);
    const [className, setClassName] = useState('')
    const [subject, setSubject] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        const fetchData = async () =>{
            const res = await fetch('/api/chapter/getChapters',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({subjectId:subjectId})
            });
            const data = await res.json();

            if(!data.ok){
                toast.error("Greška: "+ data.message);
            }else{
                console.log(data);
                await setChapters(data.data);
                await setClassName(data.className);
                await setSubject(data.subjectId)

            }
            await setLoading(false);
        }   
        fetchData();
    },[])

  return (
    <div>ChaptersPage</div>
  )
}

export default chaptersPage