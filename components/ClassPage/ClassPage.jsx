import AttenderCard from '@components/AttenderCard/AttenderCard'
import styles from './ClassPage.module.css'
import { FaRegClone, FaArrowLeft } from "react-icons/fa";
import Link from 'next/link';

const ClassPage = ({data}) => {
  return (
    <div className={styles.cardsMainSection}>
      <div className={styles.cardsHeaderSection}>
          <div className={styles.name}>{data?.name}</div>
          <div className={styles.code}>{data?.code} <FaRegClone className={styles.copy} onClick={() => {navigator.clipboard.writeText(data?.code)}}/></div>
          <div className={styles.attendees}>Broj učenika: {data?.numOfAttenders} </div>
      </div>
      <div className={styles.cardsNavigationSection}>
        <div className={styles.cardsNavigation}><Link href="/classes"><FaArrowLeft /></Link></div>
      </div>
      <div className={styles.cardsSection}>
          {data?.attendees ? data?.attendees.map( attender =>  <AttenderCard attender={attender}/>) : <div className="loading">Učitavanje...</div>}
      </div>
    </div>
  )
}

export default ClassPage