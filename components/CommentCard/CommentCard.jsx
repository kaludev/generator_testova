"use client"

import styles from "./CommentCard.module.css"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaEllipsisV } from "react-icons/fa";
export default function CommentCard({question}){

    const[activeMenu, setActiveMenu] = useState(false);
    return(
       
        <div className={styles.cardEvent}>
                <Image src={question?.author?.image} className={styles.profileImage} width={50} height={50}/>
                <div className={styles.eventMain}>
                    <div className={styles.eventName}>{question?.author?.name}Ime autora</div>
                    <div className={styles.eventUsername}>{question?.question}Jako dugacko pitanje koje je ucenik postavio profesoru Jako dugacko pitanje koje je ucenik postavio profesoru Jako dugacko pitanje koje je ucenik postavio profesoru Jako dugacko pitanje koje je ucenik postavio profesoru</div>
                </div>
            <FaEllipsisV className={styles.cardRight} onClick={() => setActiveMenu(true)}/>
            <div className={`eventMenu ${activeMenu ? "active" : ""}`}>
                {<button className="eventMenuItem">Ukloni</button>}
                {<button onClick={() => setActiveMenu(false)} className="eventMenuItem">Otkaži</button>}
            </div>
        </div>
    )
}