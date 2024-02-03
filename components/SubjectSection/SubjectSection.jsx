"use client"

import { useEffect, useState } from "react";
import styles from "../ClassSection/ClassSection.module.css";
import cardStyles from "../ClassCard/ClassCard.module.css";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import { FaPlus } from "react-icons/fa";
import SubjectCard from "@components/SubjectCard/SubjectCard";

export default function SubjectSection(){
    const [subjects, setSubjects] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [classes, setClasses] = useState([]);
    const [chosenClasses , setChosenClasses] = useState([]);
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
    const [subject, setSubject] = useState({
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
                console.log(data.data);
            }
        };
        fetchData();
    },[])

    const handleSubmit = async (e) =>{
        const res = await fetch('/api/subject/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(subject)
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
        setSubject({... subject, name:e.target.value});
        console.log(subject);
    }

    const handleSelectChange = (e) => {
        console.log(e.target.value);
        
        const filteredClasses = classes.filter(className => {if(className._id == e.target.value){setChosenClasses([...chosenClasses,className]);setSubject({...subject,classes:[...subject.classes,e.target.value]})}return className._id !== e.target.value})
        
        setClasses(filteredClasses)
    }
    const handleDelete = (id) => {
    }
    return(
        <div>
            <div className={styles.cardsMainSection}>
                <div className={styles.cardsSection}>
                    {overlay && <div className={styles.overlay}> 
                        <input type="text" className={styles.inputCode} value={subject.name} placeholder="Unesite naziv predmeta" onChange={handleChange} autoFocus/> 
                        <select className={styles.inputSelect} name="classes" id="classes" onChange={handleSelectChange}>
                            <option value="">Izaberite odeljenje</option>
                            {classes.map(className => <option key={className._id} value={className._id}>{className.name}</option>)}
                        </select>
                        <div className={styles.chosenClasses}>{chosenClasses.map(className => <div key={className._id} onClick={() => handleDelete(className._id)}>{className.name},</div>)}</div>
                        <button className={`${styles.primaryButton} primaryButton`} onClick={handleSubmit}>Kreiraj Predmet</button>
                        <button className={`${styles.secondaryButton} secondaryButton`} onClick={() =>{setOverlay(value => !value)}}>Odustani</button>
                    </div>}
                    {!overlay && <button className={`${cardStyles.cardEvent} ${cardStyles.createEvent}`} onClick={() => {setOverlay(value => !value);}}><FaPlus /></button>}
                    {subjects ?  subjects.map(oneSubject => <SubjectCard key={oneSubject._id} subject={oneSubject}/>) : <div className="loading">Učitavanje...</div>}
                </div>
            </div>
        </div>
        
        
    )
}