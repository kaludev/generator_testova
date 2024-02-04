import styles from './ChaptersPage.module.css'
import { FaRegClone } from "react-icons/fa";
import { useState } from 'react';
import cardStyles from "../ClassCard/ClassCard.module.css"
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import { FaPlus } from "react-icons/fa";
import TestCard from '@components/TestCard/TestCard';

const ChaptersPage = ({chapters,setChapters,subject,classes,classId,subjectId}) => {
  const [overlay, setOverlay] = useState(false);
  const [chapterName,setChapterName] = useState('');

  const handleSubmit = async (e) =>{
    const res = await fetch('/api/chapter/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: chapterName,classId:classId,subjectId:subjectId})
    });
    const data = await res.json();
    console.log(data);
    if(!data.ok){
        toast.error("Greška: " + data.message);
    }else{
        toast.success("Kreirano odeljenje: " + data.data.name);
        const copy = [...chapters];

        copy.push(data.data);

        setChapters(copy);
        setChapterName("");
    }
    
    setOverlay(false);
}
const handleEdit = (id) => {
  console.log(id);
}
const handleDelete = (id) => {
  console.log(id);
}
const handleChange = (e) => {
    setChapterName(e.target.value);
    console.log(chapterName);
}
  return (
    <div className={styles.cardsMainSection}>
      <div className={styles.cardsHeaderSection}>
          <div className={styles.name}>{subject?.name} {classes?.name}</div>
          <div className={styles.code}>{classes?.code} <FaRegClone className={styles.copy} onClick={() => {navigator.clipboard.writeText(classes?.code)}}/></div>
          <div className={styles.attendees}>Broj učenika: {classes.numOfAttenders} </div>
      </div>
      {overlay && <div className={styles.overlay}> 
                    <input type="text" className={styles.inputCode} value={chapterName} placeholder="Unesite naziv odeljenja" onChange={handleChange} autoFocus/> 
                    <button className={`${styles.primaryButton} primaryButton`} onClick={handleSubmit}>Kreiraj Odeljenje</button>
                    <button className={`${styles.secondaryButton} secondaryButton`} onClick={() =>{setOverlay(value => !value)}} >Odustani</button>
            </div>}
        <div className={styles.cardsSection}>
          {!overlay && <button className={`${cardStyles.cardEvent} ${styles.createEvent}`} onClick={() => {setOverlay(value => !value);}}><FaPlus /></button>}
          {chapters?.length>0? chapters  ? chapters.map( chapter =>  <TestCard chapter={chapter} handleEdit={() => handleEdit(chapter._id)} handleDelete={() => handleDelete(chapter._id)} link={"/chapter/"+ chapter?._id}/>) : <div className="loading">Učitavanje...</div> : <div className=""></div>}
      </div>
    </div>
  )
}

export default ChaptersPage