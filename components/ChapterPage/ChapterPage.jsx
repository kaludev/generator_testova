import AttenderCard from '@components/AttenderCard/AttenderCard'
import styles from './ChapterPage.module.css'
import { FaRegClone, FaArrowLeft } from "react-icons/fa";
import Link from 'next/link';
import CommentCard from '@components/CommentCard/CommentCard';
import { useSession } from 'next-auth/react';

const ChapterPage = ({data}) => {
  const {data:session} = useSession();

  return(
       
    <div className={styles.cardsMainSection}>
      <div className={styles.cardsHeaderSection}>
          <div className={styles.name}>{data?.name}</div>
          <div className={styles.name}>{data?.subjectId?.name} {data?.classId?.name}</div>
          <div className={styles.code}>{data?.classId?.code} {data?.code &&<FaRegClone className={styles.copy} onClick={() => {navigator.clipboard.writeText(data?.code)}}/>}</div>
          <div className={styles.attendees}>Broj učenika: {data?.classId?.numOfAttenders} </div>
      </div>
      <div className={styles.cardsNavigationSection}>
        <div className={styles.cardsNavigation}><Link href={"/subjects/" + data?.subjectId?._id+ "/"+ data?.classId?._id  }><FaArrowLeft /></Link></div>
      </div>
      <div className={styles.cardsSection}>
          {data?.questions ? data?.questions.map( question =><CommentCard question={question}/>) : <div className="loading">Učitavanje...</div>
          }
      </div>
    </div>
    
    
  )
}

export default ChapterPage