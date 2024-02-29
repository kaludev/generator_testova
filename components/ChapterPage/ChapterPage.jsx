import styles from './ChapterPage.module.css'
import { FaArrowLeft, FaLocationArrow } from "react-icons/fa";
import Link from 'next/link';
import CommentCard from '@components/CommentCard/CommentCard';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import Image from 'next/image';

const ChapterPage = ({data}) => {
  const {data:session} = useSession();
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false);
  const handleChange = e =>{
    setQuestion(e.target.value);
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
    }
    await setLoading(false);
  }
  return(
       
    <div className={styles.cardsMainSection}>
      <div className={styles.cardsHeaderSection}>
          <div className={styles.name}>{data?.name}</div>
          <div className={styles.code}>Unesite pitanja za vaš test</div>
      </div>
      <div className={styles.cardsNavigationSection}>
        <div className={styles.cardsNavigation}><Link href={"/subjects/" + data?.subjectId?._id+ "/"+ data?.classId?._id  }><FaArrowLeft /></Link></div>
      </div>
      <div className={styles.cardsSection}>
        {session?.user.isSuperAdmin ?
        ""
        :
        session?.user.isVerified ?
        <div action="" className={styles.cardForm}>
          <Image src={session?.user.image} className={styles.profileImage} width={50} height={50}/>
          <input type="text"  className={styles.inputText}  value={question} onChange={handleChange} placeholder='Postavite pitanje za test'/>
          <button  className={styles.cardFormSubmit} onClick={handleSubmit}><FaLocationArrow/></button>
        </div>
        :
        ""
        }
          {data?.questions ? data?.questions.map( question =><CommentCard question={question}/>) : <div className="loading">Učitavanje...</div>
          }
      </div>
    </div>
    
    
  )
}

export default ChapterPage