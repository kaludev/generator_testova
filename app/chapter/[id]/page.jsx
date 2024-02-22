"use client"
import ChapterPage from "@components/ChapterPage/ChapterPage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';

const Chapter = () => {
    const {id} = useParams();
    const [data, setData] = useState({});
    useEffect(() =>{
        const fetchData = async () =>{
            const res = await fetch('/api/chapter/getChapter/'+ id);
            const data = await res.json();
            
            if(!data.ok){
                toast.error("Greška: "+ data.message);
            }else{
                if(!data.questions){
                    const newData = {...data.data, questions:[]};
                    await setData(newData);
                }else{
                    await setData(data.data);
                }
            }
            
        }   
        fetchData();
    },[])
    return (
        data && <ChapterPage data={data}/>
    )
}

export default Chapter