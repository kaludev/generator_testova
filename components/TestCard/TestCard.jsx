"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./TestCard.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

export default function TestCard({user,email,tel,events,likes}){


    return(

        <div className={styles.cardEvent}>
            <div className={styles.eventMain}>
                <div className={styles.eventHeader}>
                    <div className={styles.eventHeaderLeft}>
                        <div className={styles.eventName}>Ime testa</div>
                        <div className={styles.eventDesc}>opis testa sta ce da bude</div>
                    </div>
                    <div className={styles.eventHeaderRight}><FaRegClock /></div>
                </div>
            </div>
        </div>
        
    )
}