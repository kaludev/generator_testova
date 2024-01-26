"use client"

import { getProviders, signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import styles from "./HeroForm.module.css"
import  Link from "next/link"

const HeroForm = () => {
  const {data:session} = useSession()
  const [ providers, setProviders ] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const [code,setCode] = useState("")
    useEffect(() => {
      const setUpProviders = async () => {
        const res = await getProviders();
        setProviders(res);
      };
      setUpProviders();
    }, []);

    const handleChange = (e) => {
      setCode(e.target.value);
      console.log(code)
    }
    const handleSubmit = async (e) => {
      const res = await fetch('/api/class/join',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: code,
        })
      })
    }
    return (
        session?.user ? <form action="">
        
        {session?.user.isVerified ?
        <div>
          <p style={styles.navP}>Vi ste deo odeljenja {session?.user.class}</p> 
          <Link href="/tests"><button className={`${styles.primaryButton} primaryButton`}>Pregledaj testove</button></Link>
        </div>
        :
        <div>
          <input type="text" className={styles.inputCode} value={code} onChange={handleChange}/> 
          <button className={`${styles.primaryButton} primaryButton`} onClick={handleSubmit}>Pronađi učionicu</button>
        </div> }
        
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