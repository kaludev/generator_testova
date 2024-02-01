"use client"
import ClassPage from "@components/ClassPage/ClassPage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';

const Class = () => {
    const {code} = useParams();
    const [data, setData] = useState({});
    useEffect(() =>{
        const fetchData = async () =>{
            const res = await fetch('/api/class/getAttenders/'+code);
            const data = await res.json();

            if(!data.ok){
                toast.error("Greška: "+ data.message);
            }else{
                await setData(data.data);

            }
        }   
        fetchData();
    },[])
    return (
        data && <ClassPage data={data}/>
    )
}

export default Class