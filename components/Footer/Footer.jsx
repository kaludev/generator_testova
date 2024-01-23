import styles from "./Footer.module.css";
import Link from "next/link";
import { FaInstagram, FaFacebookSquare, FaTwitter } from "react-icons/fa";

export default function Footer({dark}) {

    return (
        <footer className={styles.footer}>
            <hr className={styles.footerDevider} />
            <div className={styles.footerMain}>
                <div className={styles.footerCol}>
                    <img className={styles.footerLogo} src="./images/logoGreen.png" alt="HakatonArenaLogo" />
                </div>
                <div className={styles.footerCol}>
                    <h3>Stranice</h3>
                    <div className={styles.footerLink}><Link href="/">Početna</Link></div>
                    <div className={styles.footerLink}><Link href="/about">O nama</Link></div>
                    <div className={styles.footerLink}><Link href="/arena">Arena</Link></div>
                    <div className={styles.footerLink}><Link href="/ranglist">Rang Lista</Link></div>
                    <div className={styles.footerLink}><Link href="/activities">Moje aktivnosti</Link></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Vaši podaci</h3>
                    <div className={styles.footerLink}><Link href="/termsofuse">Uslovi korišćenja</Link></div>
                    <div className={styles.footerLink}><a href="/privacypolicy"rel="noreferrer">Politika privatnosti</a></div>
                    <h3>Naši partneri</h3>
                    <div className={styles.footerLink}><Link href="https://vercel.com/" target="_blank">Vercel</Link></div>
                    <div className={styles.footerLink}><Link href="https://nextjs.org/" target="_blank">Next.js</Link></div>
                    <div className={styles.footerLink}><Link href="https://fkhadra.github.io/react-toastify/introduction" target="_blank">React Tostify</Link></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Kontakt</h3>
                    <div className={styles.footerLink}><Link href="mailto:luka.markovic2017@gmail.com">luka.markovic2017@gmail.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:nikolamilanovic2305@gmail.com">nikolamilanovic2305@gmail.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:dimitrijeradojkovic8@gmail.com">dimitrijeradojkovic8@gmail.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:tvasiljevic785@gmail.com">tvasiljevic785@gmail.com</Link></div>
                    <div className={styles.footerSocial}>
                        <div className={styles.footerSocialLink}><Link href="https://www.instagram.com/" target="_blank"><FaInstagram /></Link></div>
                        <div className={styles.footerSocialLink}><Link href="https://www.facebook.com/" target="_blank"><FaFacebookSquare /></Link></div>
                        <div className={styles.footerSocialLink}><Link href="https://twitter.com/" target="_blank"><FaTwitter /></Link></div>
                    </div>
                </div>
            </div>
            <hr className={styles.footerDevider} />
            <hr className={styles.footerDevider} />
            <div className={styles.footerCopyright}>
                <p className={styles.footerCopyrightP}>© {new Date().getFullYear()}. Sva prava zadržana Tim "Class" Kraljevo.</p>
                <div className={styles.footerPowered}>
                    <p>Veb aplikacija izrađena za potrebe HZS 6.0 </p>
                </div>
            </div>
        </footer>
    );
}
