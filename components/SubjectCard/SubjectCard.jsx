import { useEffect } from "react"
import styles from "../ClassCard/ClassCard.module.css"
import Link from "next/link"
export default function SubjectCard({subject,link}){

    return(
       
        <div className={styles.cardEvent}>
            {!subject?.classes ? <Link href={"/subjects/"+subject._id}>
                <div className={styles.eventMain}>
                    <div className={styles.eventName}>{subject?.name}</div>
                    {subject?.classes && <div className={styles.eventDesc}>{subject?.classes.map(className => <Link key={className._id} className={styles.eventClass} href={'/subjects/'+subject._id+'/'+className._id}><div>{className.name}</div></Link>)}</div>}
                </div>
            </Link> : <div className={styles.eventMain}>
                    <div className={styles.eventName}>{subject?.name}</div>
                    {subject?.classes && <div className={styles.eventDesc}>{subject?.classes.map(className => <Link key={className._id} className={styles.eventClass} href={'/subjects/'+subject._id+'/'+className._id}><div>{className.name}</div></Link>)}</div>}
                </div>}
                
        </div>
    )
}