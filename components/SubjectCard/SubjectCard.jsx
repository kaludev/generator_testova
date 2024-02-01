import styles from "./ClassCard.module.css"
import Link from "next/link"
export default function SubjectCard({classCode}){


    return(
       
        <div className={styles.cardEvent}>
            <Link href={"/classes/" + classCode.code}>
                <div className={styles.eventMain}>
                    <div className={styles.eventName}>{classCode.name}</div>
                    <div className={styles.eventName}>{classCode.code}</div>
                    <div className={styles.eventName}>{classCode?.numOfAttenders}</div>
                    
                </div>
            </Link>
        </div>
        
        
        
    )
}