import Link from "next/link";
import styles from "./header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [menuDisplayed, setDisplayed] = useState(false);
  const [path, setPath] = useState("/");

  const router = useRouter();

  // Push /login on desktop and open menu on mobile
  function handleButtonClick() {
    // Display menu
    if (!menuDisplayed) {
      document.getElementById("mobileMenu").style.transform = "translateY(calc(0%))";
      document.getElementById("mobileMenu").style.visibility = "visible";
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
      setDisplayed(true);
      return;
    }

    // Hide menu
    document.getElementById("mobileMenu").style.transform = "translateY(-100%)";
    document.getElementById("mobileMenu").style.visibility = "hidden";
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
    const splitHomePaths = router.asPath.split("/");

    if (splitHomePaths.length > 2) {
      setPath(`/${splitHomePaths[1]}`);
    }
  }, [router.asPath]);

  return (
    <div className={styles.headerOutside} id="headerOutside">
      <div className={[styles.headerbar].join(" ")}>
        <div className={styles.leftheader}>
          <Link className={styles.inside} href={path}>
            <span className={styles.contrast}>/</span>
            {path == "/" ? "home" : path.slice(1)}
          </Link>
        </div>
        <div className={styles.rightheader}>
          <Link className={styles.inside} href="/projects">
            Projects
          </Link>
          <Link className={styles.inside} href="/photography">
            Photography
          </Link>
          <Link className={styles.inside} href="/search" aria-label="Search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-solid" />
          </Link>
          <button className={styles.menuButton} onClick={() => handleMobileRedirect("/search")} aria-label="Search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-solid" />
          </button>
          <button
            id="menuButton"
            className={styles.menuButton}
            onClick={() => handleButtonClick()}
            aria-label="Toggle Menu"
          >
            {menuDisplayed ? (
              <FontAwesomeIcon icon={faBars} className="fa-solid" />
            ) : (
              <FontAwesomeIcon icon={faBars} className={["fa-solid", styles.iconShrink].join(" ")} />
            )}
          </button>
        </div>
      </div>
      <div id="mobileMenu" className={styles.mobileMenu}>
        <div className={styles.mobileTop}>
          <button className={styles.menuitem} onClick={() => handleMobileRedirect("/projects")}>
            <h3>Projects</h3>
          </button>
          <button className={styles.menuitem} onClick={() => handleMobileRedirect("/photography")}>
            <h3>Photography</h3>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
