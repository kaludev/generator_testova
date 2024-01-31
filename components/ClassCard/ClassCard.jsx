"use client"

import styles from "./ClassCard.module.css"

export default function ClassCard({classCode}){


    return(

        <div className={styles.cardEvent}>
            <div className={styles.eventMain}>
                <div className={styles.eventName}>{classCode.name}</div>
                <div className={styles.eventName}>{classCode.code}</div>
                <div className={styles.eventName}>{classCode?.numOfAttenders}</div>
            </div>
        </div>
        
    )
}