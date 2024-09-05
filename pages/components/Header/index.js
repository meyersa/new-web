import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [menuDisplayed, setDisplayed] = useState(false);
  const router = useRouter() 
  
  // Push /login on desktop and open menu on mobile
  function handleButtonClick() {
    // Display menu
    if (!menuDisplayed) {
      document.getElementById("mobileMenu").style.transform = "translateY(calc(0% + 6em))";
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
      setDisplayed(true);
      return;
    }

    // Hide menu
    document.getElementById("mobileMenu").style.transform = "translateY(-100%)";
    document.body.style.height = "initial";
    document.body.style.overflow = "initial";
    setDisplayed(false);
    return;
  }

  function handleMobileRedirect(redirectPage) {
    if (window.location.pathname == redirectPage) {
      handleButtonClick();
      return;
    }

    document.body.style.height = "initial";
    document.body.style.overflow = "initial";
    window.location.href = redirectPage;
    setDisplayed(false);
    return;
  }

  /* 
   * Dynamically get home path
   */
  const splitHomePaths = router.asPath.split('/')
  var homePath 

  if (splitHomePaths.length < 3) {
    homePath = '/'

  } else {
    homePath = `/${splitHomePaths[1]}`

  }

  console.log(homePath) 


  return (
    <div className={styles.headerOutside} id="headerOutside">
      <div className={styles.headerbar}>
        <div className={styles.leftheader}>
          <Link className={styles.inside} href={homePath}>
            {homePath}
          </Link>
        </div>
        <div className={styles.rightheader}>
          <Link className={styles.inside} href="/writeups">
            Writeups
          </Link>
          <Link className={styles.inside} href="/photography">
            Photography
          </Link>
          <Link className={styles.inside} href="/projects">
            Projects
          </Link>
          <button id="menuButton" className={styles.menuButton} onClick={() => handleButtonClick()}>
              <i className={["fa", "fa-bars", styles.FABars].join(" ")} />
          </button>
        </div>
      </div>
      <div id="mobileMenu" className={styles.mobileMenu}>
        <div className={styles.mobileTop}>
          <button className={styles.menuitem} onClick={() => handleMobileRedirect("/home")}>
            Home
          </button>
          <button className={styles.menuitem} onClick={() => handleMobileRedirect("/writeups")}>
            Writeups
          </button>
          <button className={styles.menuitem} onClick={() => handleMobileRedirect("/photography")}>
            Photography
          </button>
          <button className={styles.menuitem} onClick={() => handleMobileRedirect("/projects")}>
            Projects
          </button>
        </div>
        <div className={styles.mobileArrow} />
      </div>
    </div>
  );
}
