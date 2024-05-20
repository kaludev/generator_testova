"use client"

import styles from "./CommentCard.module.css"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaCheck, FaEllipsisV, FaTimes } from "react-icons/fa";
export default function CommentCard({question,handleDelete,handleEdit}){
    const[activeMenu, setActiveMenu] = useState(false);
    return(
       
        <div className={styles.cardEvent}>
                <Image src={question?.author?.image} alt="profile" className={styles.profileImage} width={50} height={50}/>
                <div className={styles.eventMain}>
                    <div className={styles.eventUsername}>{question?.author?.name}</div>
                    <div className={styles.eventName}>{question?.question}</div>
                </div>
            <div className={styles.eventRight}>
                {question?.points!=undefined && <div className={styles.eventInfo}>
                        <div className={styles.eventCheck} style={{color:question?.verified?"green": "red"}}>{question?.verified?<FaCheck/>: <FaTimes/>}</div>
                        <div className={styles.eventPoints}>{question?.points}</div>
                    </div>
                    }
                {question.points!=undefined ? (<FaEllipsisV className={styles.cardRight} onClick={() => setActiveMenu(true)}/>) : ""}
                <div className={`eventMenu ${activeMenu ? "active" : ""}`}>
                    {<button className="eventMenuItem" onClick={() =>{setActiveMenu(false);handleDelete()}}>Ukloni</button>}
                    {<button className="eventMenuItem" onClick={() =>{setActiveMenu(false);handleEdit()}}>Izmeni</button>}
                    {<button onClick={() => setActiveMenu(false)} className="eventMenuItem">Otkaži</button>}
                </div>
            </div>
        </div>
    )
}