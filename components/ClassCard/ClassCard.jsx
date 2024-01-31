"use client"

import styles from "./ClassCard.module.css"

export default function ClassCard({className}){


    return(

        <div className={styles.cardEvent}>
            <div className={styles.eventMain}>
                    <div className={styles.eventName}>{className.name}</div>
            </div>
        </div>
        
    )
}