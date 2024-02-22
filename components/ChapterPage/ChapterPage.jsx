import AttenderCard from '@components/AttenderCard/AttenderCard'
import styles from './ChapterPage.module.css'
import { FaRegClone, FaArrowLeft, FaLocationArrow } from "react-icons/fa";
import Link from 'next/link';
import CommentCard from '@components/CommentCard/CommentCard';
import { useSession } from 'next-auth/react';

const ChapterPage = ({data}) => {
  const {data:session} = useSession();

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
        <form action="" className={styles.cardForm}>
          <img src="" className={styles.profileImage} width={50} height={50}/>
          <input type="text"  className={styles.inputText} placeholder='Postavite pitanje za test'/>
          <button  className={styles.cardFormSubmit}><FaLocationArrow/></button>
        </form>
          {data?.questions ? data?.questions.map( question =><CommentCard question={question}/>) : <div className="loading">Učitavanje...</div>
          }
      </div>
    </div>
    
    
  )
}

export default ChapterPage