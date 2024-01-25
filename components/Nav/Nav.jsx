"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css"
import { FaBars, FaHome, FaUserFriends, FaClipboardList, FaInfoCircle } from "react-icons/fa";
import { usePathname} from 'next/navigation'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = ({setMenuVisible}) => {
  
  const pathname = usePathname()
  const {data: session} = useSession();
  const [ providers, setProviders ] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const SCROLL_TRIGGER_PX = 0;

  useEffect(() => {
    function check() {
        setScrolled(window.scrollY > SCROLL_TRIGGER_PX);
    }
    
    // Vratiti ukoliko zelis da se nesto promeni kada skrolujes
    // if(window.location.pathname != "/"){
    //   setScrolled(true);
    // }else{
    //   setScrolled(false); 
    //   window.addEventListener("scroll", check)
    //   return () => {
    //     window.removeEventListener("scroll", check);
    //   }
    // }
},[pathname])

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  return (
    <div className={`${styles.navbar} ${styles.scrolled}`}>
      <div className={styles.logo}>
              <Link href="/">
                {/* <img src="/images/logoBlack.png" alt="Logo" /> Vratiti Logo ovde*/}
              </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
              <Link className={`${styles.navLink} ${styles.navIcon}`} href="/"><FaHome /></Link>
          </li>
          <li>
              <Link className={`${styles.navLink} ${styles.navIcon}`} href="/arena"><FaUserFriends /></Link>
          </li>
          <li>
              <Link className={`${styles.navLink} ${styles.navIcon}`} href="/ranglist"><FaClipboardList /></Link>
          </li>
          <li>
              <Link className={`${styles.navLink} ${styles.navIcon}`} href="/info"><FaInfoCircle /></Link>
          </li>
        </ul> 
      </nav>
      <nav className={styles.nav}>
        <ul>
          <li>
          {session?.user ? (
            <div className={styles.navProfile}>
              {session?.user.isOrganizer && <Link href="/create-event" className={`${styles.secondaryButton} secondaryButton`}>
                {" "}
                Dodaj takmičenje
              </Link>}
              <button type="button" onClick={async () =>{await signOut(); window.location.href ='/'}} className={`${styles.secondaryButton} secondaryButton`}>
                {" "}
                Odjavi se
              </button>
              <Link href="/profile">
                <div className={styles.navProfileImageBack}>
                  <Image
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className={styles.profilePic}
                    alt="profile"
                  ></Image>
                </div>
              </Link>
            </div>
            ) : (
              providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={`${styles.primaryButton} primaryButton`}
                >Prijavi se</button>
              ))
            )}
          </li>
        </ul>
      </nav>
      <div className={`${styles.menuBtn}`} onClick={(e) => {e.stopPropagation(); setMenuVisible(true); }}>
        <FaBars />
      </div>
    </div>
  );
};

export default Nav;
