import Image from "next/image";
import styles from "./Profile.module.css"
import Link from "next/link";
import { FaCog,FaTimes } from "react-icons/fa";

export default function ProfileSection({name, username, photo,isSuperAdmin,requestedOrganizer,
    isOrganizer,form,showForm,settings,showSettings,events,showEvents,requests,showRequests,handleSignOut,handleDeactivate,deactivating}){
    return(
        <section className={styles.profileCard}>
        <div className={styles.profileCardMain}>
            <h2>O nalogu</h2>
            <hr className={styles.divider} />
            <div className={styles.profileHeader}>
                {photo && <Image className={styles.userPhoto} src={photo} alt="Profile" width={80} height={80}/>}
                <div className={styles.userInfo}>
                    <div className={styles.userFirstName}>{name}</div>
                    <div className={styles.username}>@{username}</div>
                </div>
                {(form || requests || events) ? 
                    <div onClick={form?  showForm : requests ? showRequests : showEvents} className={styles.userSettings}>
                        <FaTimes/>
                    </div>
                    :
                    <div onClick={showSettings} className={styles.userSettings}>
                        {settings? <FaTimes/> : <FaCog />}
                    </div>
                }
            </div>
            <hr className={styles.divider} />

            {!form && !settings && !requests && !events && 
                <div className={styles.profileDesc}>
                    <div className={styles.descRow}>
                        <div className={styles.descRowMain}>
                            <div className={styles.descTitle}>Podešavanja naloga</div>
                            <div className={styles.descP}>Pregledajte i uredite vaše podatke</div>
                        </div>
                        <div onClick={showSettings} className={`${styles.secondaryButton} secondaryButton`}>
                            Podešavanja
                        </div>
                    </div>
                    {/* { !isSuperAdmin && !isOrganizer && 
                        <div className={styles.descRow}>
                            <div className={styles.descRowMain}>
                                <div className={styles.descTitle}>Podnesite zahtev za organizatora</div>
                                <div className={styles.descP}>Ukoliko želite da održavate takmičenja i prijavljujete kandidate morate postati organizator</div>
                            </div>
                            <button disabled={requestedOrganizer} onClick = {showForm} className={`${styles.secondaryButton} secondaryButton`}>
                                {requestedOrganizer? "Poslali ste zahtev":"Započnite"}
                            </button>
                        </div>
                    } */}
                    {isOrganizer &&
                        <div className={styles.descRow}>
                            <div className={styles.descRowMain}>
                                <div className={styles.descTitle}>Pogledajte vaša takmičenja</div>
                                <div className={styles.descP}>Pregledajte turnire koje ste vi organizovali i njihove statistike</div>
                            </div>
                            <button onClick = {showEvents} className={`${styles.secondaryButton} secondaryButton`}>
                                Pregledaj
                            </button>
                        </div>
                    }
                    {isOrganizer &&
                        <div className={styles.descRow}>
                            <div className={styles.descRowMain}>
                                <div className={styles.descTitle}>Kreirajte novo takmičenje</div>
                                <div className={styles.descP}>Kreirajte novi sportski turnir i pozovite ljude da učestvuju</div>
                            </div>
                            <Link href="/create-event" className={`${styles.secondaryButton} secondaryButton`}>
                                Kreiraj
                            </Link>
                        </div>
                    }
                    {
                        isSuperAdmin && 
                        <div className={styles.descRow}>
                            <div className={styles.descRowMain}>
                                <div className={styles.descTitle}>Pogledajte zahteve za organizatora</div>
                                <div className={styles.descP}>Pogledajte zahteve korisnika koji žele da se kvalifikuju za organizatora</div>
                            </div>
                            <button onClick = {showRequests} className={`${styles.secondaryButton} secondaryButton`}>
                                Zahtevi
                            </button>
                        </div>
                    }
                    <div className={styles.descRow}>
                        <div className={styles.descRowMain}>
                            <div className={styles.descTitle}>Odjavite se</div>
                            <div className={styles.descP}>Odjavite se kako bi ste se prijavili pomoću drugog naloga</div>
                        </div>
                        <div onClick={handleSignOut} className={`${styles.secondaryButton} secondaryButton`}>
                            Odjavi se
                        </div>
                    </div>
                    <div className={styles.descRow}>
                        <div className={styles.descRowMain}>
                            <div className={styles.descTitle}>Deaktivirajte vaš nalog</div>
                            <div className={styles.descP}>Ovde možete deaktivirati nalog i trajno ga obrisati iz svih naših baza, kao i sve podatke povezane sa njim</div>
                        </div>
                        <div onClick={handleDeactivate} className={`${styles.secondaryButton} ${styles.warningButton} secondaryButton`}>
                            {deactivating ? "Deaktiviranje" : "Deaktiviraj"}
                        </div>
                    </div>
                </div>
            }
            
        </div>
    </section>
    )
}