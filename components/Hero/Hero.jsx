import styles from "./Hero.module.css"
import Link from "next/link";

export default function HeroSection() {
    return (
        <header className={styles.header}>
            <section className={styles.hero}>
                <h1 className={styles.h1}>Kreirajte testove po vašoj meri.</h1>
                <p className={styles.navP}>Ostavi pitanje koje tebi odgovara i očekuj ga na testu . . .</p>
                <div className={styles.heroBtns}>
                    <form action="">
                        <input type="text" className={styles.inputCode}/>
                        <Link href="/arena"><button className={`${styles.primaryButton} primaryButton`}>Pronađi učionicu</button></Link>
                    </form>
                    {/* <Link href="/about"><button className={`${styles.secondaryButton} secondaryButton`}>Prijavi se</button></Link> */}
                </div>
            </section>
        </header>
    )
}