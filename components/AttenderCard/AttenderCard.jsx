"use client"

import styles from "./AttenderCard.module.css"
import Link from "next/link"
import Image from "next/image"
export default function AttenderCard({attender}){


    return(
       
        <div className={styles.cardEvent}>
            <a href={"mailto:" + attender.email}>
                <div className={styles.eventMain}>
                    <div className={styles.eventName}>{attender.name}</div>
                    <div className={styles.eventName}>{attender.username}</div>
                    <Image src={attender.image} className="rounded-full" width={50} height={50}/>
                    
                </div>
            </a>
        </div>
        
        
        
    )
}