"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./SideNav.module.css"
import { FaBars } from "react-icons/fa";
import { usePathname} from 'next/navigation'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FaTimes } from "react-icons/fa";

const SideNav = ({menuVisible,setMenuVisible}) => {
  
  const pathname = usePathname()
  const {data: session} = useSession();
  const [ providers, setProviders ] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const SCROLL_TRIGGER_PX = 0;

  function setWindowSize () {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  const windowSize = setWindowSize();

  useEffect(() => {
    function check() {
        setScrolled(window.scrollY > SCROLL_TRIGGER_PX);
    }
    
    if(window.location.pathname != "/"){
      setScrolled(true);
    }else{
      setScrolled(false);
      window.addEventListener("scroll", check)
      return () => {
        window.removeEventListener("scroll", check);
      }
    }
},[pathname])

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  useEffect(() => {
    if(windowSize.width > 1024) setMenuVisible(false)
}, [windowSize.width])

  return (
    <>
      
              <div className={`${styles.sidebar} ${menuVisible ? styles.sidebarVisible : ""}`}>
                <div className={`${styles.sidebarLinks}`}>
                    <div className={`${styles.menuIconClose} ${menuVisible ? styles.showX : ""}`} onClick={() => setMenuVisible(false)}>
                      <FaTimes />
                    </div>
                    <div className={styles.sideNav}>
                      <ul>
                        <li>
                            <Link className={styles.sideNavLink} href="/about">O Nama</Link>
                        </li>
                        <li>
                            <Link className={styles.sideNavLink} href="/arena">Arena</Link>
                        </li>
                        <li>
                            <Link className={styles.sideNavLink} href="/ranglist">Rang Lista</Link>
                        </li>
                        <li>
                            <Link className={styles.sideNavLink} href="/activities">Moje aktivnosti</Link>
                        </li>
                      </ul>
                    </div>
                </div>
                <div className={styles.sidebarUserLinks}>
                {session?.user ? (
                  <div className={styles.sideNavProfile}>
                    {session?.user.isOrganizer && 
                    <Link href="/create-event" className={`${styles.primaryButton} primaryButton`}>
                      {" "}
                      Dodaj Takmičenje
                    </Link>}
                    <Link href="/profile" className={`${styles.primaryButton} primaryButton`}>
                      <div className={styles.navProfileImageBack}>
                          Moj Nalog
                      </div>
                    </Link>
                    <button type="button" onClick={async () =>{await signOut(); window.location.href ='/'}} className={`${styles.primaryButton} primaryButton`}>
                      {" "}
                      Odjavi se
                    </button>
                  </div>
                ) : (
                  
                      providers &&
                      Object.values(providers).map((provider) => (
                        <div key={provider.id} className={styles.sideNavProfile}>
                          <button
                            type="button"
                            onClick={() => signIn(provider.id)}
                            className={`${styles.primaryButton} primaryButton`}
                          >Prijavi se</button>
                          </div>
                      ))
                    
                    )}
                  
                </div>
      </div>

    </>
    
  );
};

export default SideNav;
