"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./ClassSection.module.css"
import TestCard from "@components/TestCard/TestCard";
import { FaRegHeart } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaHeart, FaCalendarAlt } from "react-icons/fa";

export default function ClassSection(){
    const [classes, setClasses] = useState([]);
    useEffect(() =>{
        
    },[])
    return(
        <div className={styles.cardsMainSection}>
            
            <div className={styles.cardsSection}>
            </div>
        </div>
        
    )
}