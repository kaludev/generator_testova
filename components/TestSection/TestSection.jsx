"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./TestSection.module.css"
import TestCard from "@components/TestCard/TestCard";
import { FaRegHeart } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function TestSection(){
    return(
        <div className={styles.cardsMainSection}>
            <div className={styles.cardsSection}>
                <TestCard />
                <TestCard />
            </div>
        </div>
        
    )
}