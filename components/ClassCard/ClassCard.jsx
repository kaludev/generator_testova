"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./ClassCard.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

export default function TestCard({name}){


    return(

        <div className={styles.cardEvent}>
            <div className={styles.eventMain}>
                    <div className={styles.eventName}>{name}</div>
            </div>
        </div>
        
    )
}