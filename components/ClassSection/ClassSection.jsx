"use client"

import { useEffect, useState } from "react";
import styles from "./ClassSection.module.css"
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import ClassCard from "@components/ClassCard/ClassCard";

export default function ClassSection(){
    const [classes, setClasses] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [className, setClassName] = useState('');
    useEffect(() =>{
        const fetchData = async () => {
            const res = await fetch('/api/class/getClasses');
            const data = await res.json();
            console.log(data);
            if(!data.ok){
                toast.error("Greška: "+ data.message );
            }else{
                await setClasses(data.data);
                console.log(classes);
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
        }

        const copy = [...classes];

        copy.push(data.data);

        setClasses(copy);
    }

    const handleChange = (e) => {
        setClassName(e.target.value);
        console.log(className);
    }
    return(
        <div className={styles.cardsMainSection}>
            {overlay && <div className={styles.overlay}> 
                    <input type="text" className={styles.inputCode} value={className} onChange={handleChange}/> 
                    <button className={`${styles.primaryButton} primaryButton`} onClick={handleSubmit}>Pronađi učionicu</button>
            </div>}
            <button className={ styles.primaryButton + ' primaryButton '} onClick={() => setOverlay(value => !value)}>Kreiraj ucionicu</button>
            <div className={styles.cardsSection}>
                {classes.length>0 ? classes.map( className =><ClassCard classCode={className}/>) : <div className="">loading...</div>}
            </div>
        </div>
        
    )
}