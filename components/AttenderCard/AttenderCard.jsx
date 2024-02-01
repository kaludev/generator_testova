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
                    <div className={styles.eventUsername}>@{attender.username}</div>
                </div>
            </a>
            <a href={"mailto:" + attender.email}>
                <Image src={attender.image} className={styles.profileImage} width={50} height={50}/>
            </a>
        </div>
        
        
        
    )
}