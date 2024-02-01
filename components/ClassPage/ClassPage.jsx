import AttenderCard from '@components/AttenderCard/AttenderCard'
import styles from './ClassPage.module.css'

const ClassPage = ({data}) => {
    console.log(data)
  return (
    <div className={styles.cardsMainSection}>
        <div className={styles.cardsSection}>
            <div className="name">{data?.name}</div><br />
            <div className="code">{data?.code}</div><br />
            <div className="attendees">{data?.numOfAttenders} </div>
            {data?.attendees ? data?.attendees.map( attender =>  <AttenderCard attender={attender}/>) : <div className="">loading...</div>}
        </div>
    </div>
  )
}

export default ClassPage