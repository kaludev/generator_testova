"use client"

import { useEffect, useState } from "react";
import styles from "./ClassSection.module.css"
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import ClassCard from "@components/ClassCard/ClassCard";

export default function ClassSection(){
    const [classes, setClasses] = useState([]);
    useEffect(() =>{
        const fetchData = async () => {
            const res = await fetch('/api/class/getClasses');
            const data = await res.json();
            console.log(data);
            if(!data.ok){
                toast.error("Greška: "+ data.message );
            }else{
                setClasses(data.data);
            }
        };
        fetchData();
    },[])
    return(
        <div className={styles.cardsMainSection}>
            
            <div className={styles.cardsSection}>
                {classes && classes.map( className =>{
                    <ClassCard className={className}/>
                })}
            </div>
        </div>
        
    )
}