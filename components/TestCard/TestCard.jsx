"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./TestCard.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaRegClock , FaTrash } from "react-icons/fa";

export default function TestCard({chapter,link,handleEdit,handleDelete}){


    return(
        
            <div className={styles.cardEvent}>
                
                    <div className={styles.eventMain}>
                        <Link  href={link}>
                            <div className={styles.eventHeader}>
                                <div className={styles.eventHeaderLeft}>
                                    <div className={styles.eventName}>{chapter?.name}</div>
                                    <div className={styles.eventDesc}>{chapter?.description}</div>
                                </div>
                                
                                <div className={styles.eventHeaderRight} style={{color: (chapter?.due?.getTime() > new Date().getTime()? "var(--success-color)" : "var(--main-color)" )}}><FaRegClock /></div>
                            </div>
                        </Link>
                        <div className={styles.eventHeader}>
                                {handleEdit && <button onClick={handleEdit} className={styles.secondaryButton + " secondaryButton " }>edit</button>}
                                
                                {handleDelete && <button onClick={handleDelete} className={styles.delete + " "}><FaTrash /></button>}
                                
                            </div>
                        
                        
                    </div>
                
                
            </div>
        
    )
}