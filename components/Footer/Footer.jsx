import styles from "./Footer.module.css";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer({dark}) {

    return (
        <footer className={styles.footer}>
            <hr className={styles.footerDevider} />
            <div className={styles.footerMain}>
                <div className={styles.footerCol}>
                    <img className={styles.footerLogo} src="./images/logoBlack.png" alt="HakatonArenaLogo" />
                </div>
                <div className={styles.footerCol}>
                    <h3>Stranice</h3>
                    <div className={styles.footerLink}><Link href="/">Početna</Link></div>
                    <div className={styles.footerLink}><Link href="/about">Moje odeljenje</Link></div>
                    <div className={styles.footerLink}><Link href="/arena">Testovi</Link></div>
                    <div className={styles.footerLink}><Link href="/ranglist">Informacije</Link></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Vaši podaci</h3>
                    <div className={styles.footerLink}><Link href="/termsofuse">Uslovi korišćenja</Link></div>
                    <div className={styles.footerLink}><a href="/privacypolicy">Politika privatnosti</a></div>
                </div>
                <div className={styles.footerCol}>
                    <h3>Kontakt</h3>
                    <div className={styles.footerLink}><Link href="mailto:miloye@gmail.com">miloye@gmail.com</Link></div>
                    <h3>Aplikaciju izradili</h3>
                    <div className={styles.footerLink}><Link href="mailto:luka.markovic2017@gmail.com">luka.markovic2017@gmail.com</Link></div>
                    <div className={styles.footerLink}><Link href="mailto:nikolamilanovic2305@gmail.com">nikolamilanovic2305@gmail.com</Link></div>
                    <div className={styles.footerSocial}>
                        <div className={styles.footerSocialLink}><Link href="https://github.com/kaludev/generator_testova" target="_blank"><FaGithub /></Link></div>
                    </div>
                </div>
            </div>
            <hr className={styles.footerDevider} />
            <hr className={styles.footerDevider} />
            <div className={styles.footerCopyright}>
                <p className={styles.footerCopyrightP}>© {new Date().getFullYear()}. Sva prava zadržana.</p>
                <div className={styles.footerPowered}>
                    <p>Veb aplikacija izrađena kao školski projekat </p>
                </div>
            </div>
        </footer>
    );
}
