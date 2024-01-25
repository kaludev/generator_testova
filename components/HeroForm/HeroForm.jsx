"use client"

import { useSession } from "next-auth/react"

const HeroForm = () => {
    const {data:session} = useSession()
    return (
        session?.user ? <form action="">
        
        {session?.user.isVerified ? <input type="text" className={styles.inputCode}/> : <p>Vi ste deo odeljenja {session?.user.class}</p>}
        <Link href="/arena"><button className={`${styles.primaryButton} primaryButton`}>Pronađi učionicu</button></Link>
    </form> : (providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={`${styles.primaryButton} primaryButton`}
                >Prijavi se</button>
              )))
        
    )
}

export default HeroForm