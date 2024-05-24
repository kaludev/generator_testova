import styles from './ChapterPage.module.css'
import overlayStyles from '../ClassSection/ClassSection.module.css'
import { FaArrowLeft, FaLocationArrow, FaPlus } from "react-icons/fa";
import Link from 'next/link';
import CommentCard from '@components/CommentCard/CommentCard';
import { useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import Image from 'next/image';

const ChapterPage = ({data,setData}) => {
  const {data:session} = useSession();
  const [overlay, setOverlay] = useState(false);
  const [create, setCreate] = useState(false);
  const [questions, setQuestions] = useState([{points:"",num:""}])
  const [question, setQuestion] = useState('')
  const [numOfTests,setNumOfTests] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = e =>{
    setQuestion(e.target.value);
  }
  const handleOverlayChange = e =>{
    const copy= {...question};
    copy[e.target.name] = e.target.value;
    setQuestion(copy);
  }

  const handleCreateChange = e =>{
    const copy= [...questions];
    copy[e.target.getAttribute('data-index')][e.target.name] = parseInt(e.target.value);
    setQuestions(copy);
  }
  const handleSubmit = async () =>{
    const res = await fetch('/api/question/create',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question:question,id:data._id})
    });
    
    const fetchData = await res.json();

    if(!fetchData.ok){
        toast.error("Greška: "+ fetchData.message);
    }else{
        toast.success("Uspešno dodato pitanje");
        const copy = {...data}
        copy?.questions?.push({question:question,_id:data._id,author:session?.user})
        setData(copy);
    }
    await setLoading(false);
    setQuestion('');
  }
  const handleEditing = async () => {
    await setLoading(true);
    await setOverlay(false);
    const res = await fetch('/api/question/edit',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question:question})
    });
    
    const fetchData = await res.json();

    if(!fetchData.ok){
        toast.error("Greška: "+ fetchData.message);
    }else{
      const copy = {...data}
      const quest = copy?.questions?.find(question => question._id == fetchData.data._id);
      console.log(question);
      quest.question = question.question;
      quest.verified = true;
      quest.points = question.points;
      setData(copy);
      toast.success("Uspešno promenjeno pitanje");
    }
    await setQuestion("");
    await setLoading(false);
    
  }

  const handleEdit = async (id) => {
    setOverlay(true);
    setQuestion(data?.questions?.find(question => question._id == id));
  }
  const handleDelete = async (id) => {
    const res = await fetch("/api/chapter/delete/" + id);

    const fetchData = await res.json();
    if(!fetchData.ok) {
      toast.error('Greska pri brisanju oblasti:', data.message);
    }else{
      toast.success('Uspešno obrisano pitanje');
    }
    const copy = {...data}
    console.log(copy)
    const filtered = copy?.questions?.filter((value) => value._id !=id );
    copy.questions = filtered;
    setData(copy);
  }
  const handleAdd = () => {
    const copy = [...questions];
    copy.push({points:"",num:""});
    setQuestions(copy);
  }
  const handleRemove = (index) => {
    const copy = [...questions];
    console.log(index);
    copy.splice(index,1);
    setQuestions(copy);
  }
  const handleNumChange = (e) =>{
    setNumOfTests(e.target.value);
  }
  const handleGenerating =() =>{
    
  }
  return(
       
    <div className={styles.cardsMainSection}>
      <div className={styles.cardsHeaderSection}>
          <div className={styles.name}>{data?.name}</div>
          <div className={styles.code}>Unesite pitanja za vaš test</div>
      </div>
      <div className={styles.cardsNavigationSection}>
        <div className={styles.cardsNavigation}><Link href={"/subjects/" + data?.subjectId?._id + (data?.classId?._id ? "/"+ data?.classId?._id: "")  }><FaArrowLeft /></Link></div>
        {!create && <div className={styles.cardsNavigation} onClick={() => {setCreate(value => !value);}}><FaPlus /></div>}
      </div>

      <div className={styles.cardsSection}>
        {
        (session?.user.isVerified || session?.user.isSuperAdmin) &&<div className={styles.cardForm}>
          <Image src={session?.user.image} alt='Profile' className={styles.profileImage} width={50} height={50}/>
          <input type="text"  className={styles.inputText}  value={question} onChange={handleChange} placeholder='Postavite pitanje za test'/>
          <button  className={styles.cardFormSubmit} onClick={handleSubmit}><FaLocationArrow/></button>
        </div>
        }
        {overlay && <div className={overlayStyles.overlay}> 
                    <textarea className={overlayStyles.inputCode} name="question" value={question?.question} placeholder="Promenite pitanje" onChange={handleOverlayChange} autoFocus spellcheck="false" textarea/> 
                    <input type="number" className={overlayStyles.inputCode} name="points" id="points" value={question?.points} onChange={handleOverlayChange} placeholder="poeni"/>
                    <p className={styles.desc}>Izmenjivanjem pitanja automatski odobravate da pitanje bude na testu</p>
                    <button className={`${overlayStyles.primaryButton} primaryButton`} onClick={handleEditing}>Izmeni Pitanje</button>
                    <button className={`${overlayStyles.secondaryButton} secondaryButton`} onClick={() =>{setOverlay(value => !value);setQuestion("")}} >Odustani</button>
      </div>}
        {create && <div className={overlayStyles.overlay}> 
                      <div className={overlayStyles.cardsSection}>
                        {questions.map((question,index)=> <div className={styles.cardEvent} key={index}>
                            
                            <p>Broj pitanja:</p><input type="number" data-index={index} key={(index*2)} className={overlayStyles.inputCode} name="num" value={question?.num} placeholder="Broj pitanja" onChange={handleCreateChange} autoFocus/> 
                            <p>Broj poena:</p><input type="number" data-index={index} key={(index*2+1)} className={overlayStyles.inputCode} name="points" id="points" value={question?.points} onChange={handleCreateChange} placeholder="Poeni"/>
                            <button className={`primaryButton`} onClick={() =>{handleRemove(index)}}>Obrisi</button>
                        </div>
                        )}
                      </div>
                      <input type="number" className={overlayStyles.inputCode} name="num" value={numOfTests} placeholder="Broj testova" onChange={handleNumChange}/>
                      
                      <button className={`${overlayStyles.primaryButton} primaryButton`} onClick={handleAdd}><FaPlus /></button>
                      <button className={`${overlayStyles.primaryButton} primaryButton`} onClick={handleGenerating}>Generisi test</button>
                      <button className={`${overlayStyles.secondaryButton} secondaryButton`} onClick={() =>{setCreate(value => !value)}} >Odustani</button>
        </div>}
          {data?.questions ? data?.questions.map( question =><CommentCard key={question?._id} handleEdit={() =>{handleEdit(question?._id)}} handleDelete={ () => handleDelete(question._id)} question={question}/>) : <div className="loading">Učitavanje...</div>
          }
      </div>
    </div>
    
    
  )
}

export default ChapterPage