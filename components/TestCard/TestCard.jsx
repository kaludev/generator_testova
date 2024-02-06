"use client"

import Link from "next/link";
import { useState } from "react";
import styles from "./TestCard.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaRegClock , FaTrash, FaEllipsisV } from "react-icons/fa";

export default function TestCard({chapter,link,handleEdit,handleDelete}){

    const[activeMenu, setActiveMenu] = useState(false);
    return(
        
            <div className={styles.cardEvent}>
                
                    <div className={styles.eventMain}>
                        
                            <div className={styles.eventHeader}>
                                <Link className={styles.eventHeaderLeft} href={link}>
                                    <div className={styles.eventName}>{chapter?.name}</div>
                                    <div className={styles.eventDesc}>{chapter?.description}dsa</div>
                                </Link>
                                
                                <div className={styles.eventHeaderRight} style={{color: (chapter?.due?.getTime() > new Date().getTime()? "var(--success-color)" : "var(--main-color)" )}}>
                                    <FaRegClock />
                                    <FaEllipsisV className={styles.eventHeaderRightLink} onClick={() => setActiveMenu(true)}/>
                                </div>
                            </div>
                        <div className={`${styles.eventMenu} ${activeMenu ? styles.active : ""}`}>
                                {handleEdit && <button onClick={handleEdit} className={styles.eventMenuItem}>Izmeni</button>}
                                {handleDelete && <button onClick={handleDelete} className={styles.eventMenuItem}>Obriši</button>}
                                {handleDelete && <button onClick={() => setActiveMenu(false)} className={styles.eventMenuItem + ""}>Otkaži</button>}
                        </div>
                    </div>
                
                
            </div>
        
    )
}