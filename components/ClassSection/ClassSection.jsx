"use client"

import { useEffect, useState } from "react";
import styles from "./ClassSection.module.css"
import cardStyles from "../ClassCard/ClassCard.module.css"
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import ClassCard from "@components/ClassCard/ClassCard";
import { FaPlus } from "react-icons/fa";

export default function ClassSection(){
    const [classes, setClasses] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [className, setClassName] = useState('');
    useEffect(() =>{
        const fetchData = async () => {
            const res = await fetch('/api/class/getClasses');
            const data = await res.json();
            if(!data.ok){
                toast.error("Greška: "+ data.message );
            }else{
                await setClasses(data.data);
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
        if(!data.ok){
            toast.error("Greška: " + data.message);
        }else{
            toast.success("Kreirano odeljenje: " + data.data.name);
            const copy = [...classes];

            copy.push(data.data);

            setClasses(copy);
        }
        
        setOverlay(false);
    }

    const handleChange = (e) => {
        setClassName(e.target.value);
    }
    return(
        <div className={styles.cardsMainSection}>
            
            {overlay && <div className={styles.overlay}> 
                    <input type="text" className={styles.inputCode} value={className} placeholder="Unesite naziv odeljenja" onChange={handleChange} autoFocus/> 
                    <button className={`${styles.primaryButton} primaryButton`} onClick={handleSubmit}>Kreiraj Odeljenje</button>
                    <button className={`${styles.secondaryButton} secondaryButton`} onClick={() =>{setOverlay(value => !value)}} >Odustani</button>
            </div>}
            <div className={styles.cardsSection}>
                {!overlay && <button className={`${cardStyles.cardEvent} ${cardStyles.createEvent}`} onClick={() => {setOverlay(value => !value);}}><FaPlus /></button>}
                {classes.length > 0 ? classes.map( className =><ClassCard classCode={className}/>) : <div className="loading">Učitavanje...</div>}
            </div>
        </div>
        
    )
}