"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./SubjectSection.module.css"
import TestCard from "@components/TestCard/TestCard";
import { FaRegHeart } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function SubjectSection(){
    const [subjects, setSubjects] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [className, setClassName] = useState('');
    useEffect(() =>{
        const fetchData = async () => {
            const res = await fetch('/api/subject/getSubjects');
            const data = await res.json();
            console.log(data);
            if(!data.ok){
                toast.error("Greška: "+ data.message );
            }else{
                await setSubjects(data.data);
                console.log(subjects);
            }
        };
        fetchData();
    },[])

    const handleSubmit = async (e) =>{
        const res = await fetch('/api/class/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: className})
        });
        const data = await res.json();
        console.log(data);
        if(!data.ok){
            toast.error("Greška: " + data.message);
        }else{
            toast.success("Kreirano odeljenje: " + data.data.name);
            const copy = [...subjects];

            copy.push(data.data);

            setSubjects(copy);
        }
        
        setOverlay(false);
    }

    const handleChange = (e) => {
        setClassName(e.target.value);
        console.log(className);
    }
    return(
        <div>
            <div></div>
            <div className={styles.cardsMainSection}>
                <div className={styles.cardsSection}>
                    <SubjectCard />
                </div>
            </div>
        </div>
        
        
    )
}