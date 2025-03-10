import styles from '../ClassPage/ClassPage.module.css'
import overlayStyles from '../ClassSection/ClassSection.module.css'
import { FaRegClone, FaArrowLeft, FaPlus } from "react-icons/fa";
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import TestCard from '@components/TestCard/TestCard';
import Link from 'next/link';

const ChaptersPage = ({loading,chapters,setChapters,subject,classes,classId,subjectId}) => {
  const [overlay, setOverlay] = useState(false);
  const [chapterName,setChapterName] = useState('');
  const [edit,setEdit] = useState(null);
  const handleSubmit = async (e) =>{
    if(edit){
      const res = await fetch('/api/chapter/edit', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id:edit,name: chapterName,classId:classId,subjectId:subjectId})
      });
      const data = await res.json();
      if(!data.ok){
          toast.error("Greška: " + data.message);
      }else{
        const copy = [...chapters];
        toast.success("Izmenjeno odeljenje: "+data.data.name+ " -> " + chapterName);
        copy.find((value) =>value._id==edit).name =chapterName
        setChapters(copy);
        setChapterName("");
      }
    }else{ 
      const res = await fetch('/api/chapter/create', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ name: chapterName,classId:classId,subjectId:subjectId})
      });
      const data = await res.json();
      if(!data.ok){
          toast.error("Greška: " + data.message);
      }else{
          toast.success("Kreirano odeljenje: " + data.data.name);
          const copy = [...chapters];

          copy.push(data.data);

          setChapters(copy);
          setChapterName("");
      }
    }
    setOverlay(false);
}
const handleEdit = (id) => {
  setEdit(id);
  const chapter = chapters.find((e) => e._id == id);
  setChapterName(chapter.name);
  setOverlay(value => !value);
}
const handleDelete = async (id) => {
  const res = await fetch("/api/chapter/delete/" + id);

  const data = await res.json();
  if(!data.ok) {
    toast.error('Greska pri brisanju oblasti:', data.message);
  }else{
    toast.success('Uspešno obrisana oblast');
  }
  const copy = [...chapters];
  const filtered = copy.filter((value) => value._id !=id )
  setChapters(filtered);
}
const handleChange = (e) => {
    setChapterName(e.target.value);
}
  return (
    <div className={styles.cardsMainSection}>
      <div className={styles.cardsHeaderSection}>
          <div className={styles.name}>{subject?.name} {classes?.name}</div>
          {classes?.code && <div className={styles.code}>{classes?.code} <FaRegClone className={styles.copy} onClick={() => {navigator.clipboard.writeText(classes?.code)}}/></div>}
          {classes?.numOfAttenders!=undefined && <div className={styles.attendees}>Broj učenika: {classes?.numOfAttenders} </div>}
      </div>
      <div className={styles.cardsNavigationSection}>
        <div className={styles.cardsNavigation}><Link href="/subjects"><FaArrowLeft /></Link></div>
        {classes?.code && (!overlay && <div className={styles.cardsNavigation} onClick={() => {setEdit(null);setChapterName("");setOverlay(value => !value);}}><FaPlus /></div>)}
      </div>
      {overlay && <div className={overlayStyles.overlay}> 
                    <input type="text" className={overlayStyles.inputCode} value={chapterName} placeholder="Unesite naziv testa" onChange={handleChange} autoFocus/> 
                    <button className={`${overlayStyles.primaryButton} primaryButton`} onClick={handleSubmit}>{edit? "Izmeni" : "Kreiraj"} Test</button>
                    <button className={`${overlayStyles.secondaryButton} secondaryButton`} onClick={() =>{setOverlay(value => !value)}} >Odustani</button>
      </div>}
        <div className={styles.cardsSection}>
          {!loading ? (chapters?.length > 0 ? chapters.map( chapter =>  <TestCard key={chapter._id} chapter={chapter} handleEdit={classes?.code ? () => handleEdit(chapter._id) : null} handleDelete={classes?.code ? () => handleDelete(chapter._id) : null} link={"/chapter/"+ chapter?._id}/>) : <div>Ne postoje testovi</div>) : <div className="loading">Učitavanje...</div>}
      </div>
    </div>
  )
}

export default ChaptersPage