"use client"

import styles from "./AttenderCard.module.css"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaEllipsisV } from "react-icons/fa";
export default function AttenderCard({handleDelete,attender}){

    const[activeMenu, setActiveMenu] = useState(false);
    return(
       
        <div className={styles.cardEvent}>
            <a className={styles.cardLeft} href={"mailto:" + attender.email}>
                <Image src={attender.image} className={styles.profileImage} width={50} height={50}/>
                <div className={styles.eventMain}>
                    <div className={styles.eventName}>{attender.name}</div>
                    <div className={styles.eventUsername}>@{attender.username}</div>
                </div>
            </a>
            <FaEllipsisV className={styles.cardRight} onClick={() => setActiveMenu(true)}/>
            <div className={`eventMenu ${activeMenu ? "active" : ""}`}>
                {<button onClick={() => {setActiveMenu(false);handleDelete()}} className="eventMenuItem">Ukloni</button>}
                {<button onClick={() => setActiveMenu(false)} className="eventMenuItem">Otkaži</button>}
            </div>
        </div>
        
        
        
    )
}