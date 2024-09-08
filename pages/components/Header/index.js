import Link from "next/link";
import styles from "./header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../Footer"

export default function Header() {
  const [menuDisplayed, setDisplayed] = useState(false);
  const [path, setPath] = useState("/")

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
  useEffect(() => {
    const splitHomePaths = router.asPath.split('/')

    if (splitHomePaths.length > 2) {
      setPath(`/${splitHomePaths[1]}`)
      
    }
  })
  
  return (
    <div className={styles.headerOutside} id="headerOutside">
      <div className={styles.headerbar}>
        <div className={styles.leftheader}>
          <Link className={styles.inside} href={path}>
            {path}
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
          <button className={styles.menuitem} onClick={() => handleMobileRedirect(path)}>
            {path}
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
        <Footer />
      </div>
    </div>
  );
}
