import styles from "./SubjectCard.module.css"
import Link from "next/link"
export default function SubjectCard({classCode}){


    return(
       
        <div className={styles.cardEvent}>
            <Link href={"/classes/" }>
                <div className={styles.eventMain}>
                    <div className={styles.eventName}></div>
                    <div className={styles.eventName}></div>
                    <div className={styles.eventName}></div>
                    
                </div>
            </Link>
        </div>
        
        
        
    )
}