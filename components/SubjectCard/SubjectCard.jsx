import { useEffect } from "react"
import styles from "../ClassCard/ClassCard.module.css"
import Link from "next/link"
export default function SubjectCard({subject,link}){

    return(
       
        <div className={styles.cardEvent}>
            <Link href={link && link }>
                <div className={styles.eventMain}>
                    <div className={styles.eventName}>{subject?.name}</div>
                    <div className={styles.eventDesc}>{subject?.classes.map(className => <Link href={'/subjects/'+subject._id+'/'+className._id}><div>{className.name}</div></Link>)}</div>
                    
                </div>
            </Link>
        </div>
        
        
        
    )
}