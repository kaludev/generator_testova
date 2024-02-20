import HeroForm from "@components/HeroForm/HeroForm"
import styles from "./Hero.module.css"

export default function HeroSection() {
    return (
        <header className={styles.header}>
            <section className={styles.hero}>
                <h1 className={styles.h1}>Kreirajte testove po vašoj meri.</h1>
                <div className={styles.heroBtns}>
                    <HeroForm/>
                    {/* <Link href="/about"><button className={`${styles.secondaryButton} secondaryButton`}>Prijavi se</button></Link> */}
                </div>
            </section>
        </header>
    )
}