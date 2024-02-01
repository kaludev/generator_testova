"use client"

import styles from "./ClassCard.module.css"
import Link from "next/link"
export default function ClassCard({classCode}){


    return(
       
        <div className={styles.cardEvent}>
            <Link href={"/classes/" + classCode.code}>
                <div className={styles.eventMain}>
                    <div className={styles.eventName}>{classCode.name}</div>
                    <div className={styles.eventDesc}>{classCode.code}</div>
                    <div className={styles.eventNumber}>Broj učenika: {classCode?.numOfAttenders}</div>
                </div>
            </Link>
        </div>
        
        
        
    )
}