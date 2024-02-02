"use client"

import { useEffect, useState } from "react";
import styles from "./SubjectSection.module.css"
import cardStyles from "../ClassCard/ClassCard.module.css"

import { FaPlus } from "react-icons/fa";
import SubjectCard from "@components/SubjectCard/SubjectCard";

export default function SubjectSection(){
    const [subjects, setSubjects] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [classes, setClasses] = useState([]);
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
    const [className, setClassName] = useState({
        name: '',
        classes: []
    });
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
        const res = await fetch('/api/subject/create', {
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
        setClassName({... className, name:e.target.value});
        console.log(className);
    }

    const handleSelectChange = (e) => {
        console.log(e.target.value);
        const filteredClasses = classes.filter(className => className._id !== e.target.value)
        setClasses(filteredClasses)
    }
    return(
        <div>
            <div></div>
            <div className={styles.cardsMainSection}>
                <div className={styles.cardsSection}>
                    {overlay && <div className={styles.overlay}> 
                        <input type="text" className={styles.inputCode} value={className.name} placeholder="Unesite naziv odeljenja" onChange={handleChange} autoFocus/> 
                        <select name="classes" id="classes" onChange={handleSelectChange}>
                            <option value=""></option>
                            {classes.map(className => <option key={className._id} value={className._id}>{className.name}</option>)}
                        </select>
                        <button className={`${styles.primaryButton} primaryButton`} onClick={handleSubmit}>Kreiraj Odeljenje</button>
                        <button className={`${styles.secondaryButton} secondaryButton`} >Odustani</button>
                    </div>}
                    {!overlay && <button className={`${cardStyles.cardEvent} ${styles.createEvent}`} onClick={() => {setOverlay(value => !value);}}><FaPlus /></button>}
                    <SubjectCard />
                </div>
            </div>
        </div>
        
        
    )
}