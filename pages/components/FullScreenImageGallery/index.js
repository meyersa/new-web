import Image from "next/image";
import styles from "./fullscreenimageview.module.css";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

export default function FullScreenGallery() {
  const [imageList, setImageList] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const showImage = searchParams.get("showImage");

  /**
   * Get list of images from figures as well as their metadata
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const figures = document.querySelectorAll("figure.fullscreen");
      const images = Array.from(figures).map((fig) => {
        const img = fig.querySelector("img");
        return {
          img: img?.src || "",
          alt: img?.alt || "",
          info: {
            Camera: fig?.getAttribute("data-camera") || "",
            Lens: fig?.getAttribute("data-lens") || "",
            ISO: fig?.getAttribute("data-iso") || "",
            Aperture: fig?.getAttribute("data-aperture") || "",
            Shutter: fig?.getAttribute("data-shutter") || "",
          },
        };
      });
      setImageList(images);
    }
  }, []);

  /**
   * Get the active image from the index
   */
  useEffect(() => {
    let curIndex = Number.parseInt(showImage);
    if (isNaN(curIndex) || curIndex < 0 || curIndex >= imageList.length) {
      curIndex = null;
    }
    setActiveImage(curIndex);
  }, [showImage, imageList.length]);

  /**
   * Open the viewer
   *
   * @param {Number} index to open to
   */
  const openView = useCallback(
    (index) => {
      const params = new URLSearchParams(searchParams);
      params.set("showImage", index);
      router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
    },
    [searchParams, pathname, router]
  );

  /**
   * Close the viewer
   */
  const closeView = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("showImage");
    router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  }, [searchParams, pathname, router]);

  /**
   * Increment image for switching
   *
   * @param {Number} amount to increment by
   */
  const incrementParam = useCallback(
    (amount) => {
      const curImage = Number.parseInt(showImage);
      let newImage = curImage + amount;
      if (newImage < 0) newImage = imageList.length - 1;
      if (newImage >= imageList.length) newImage = 0;
      const params = new URLSearchParams(searchParams);
      params.set("showImage", newImage);
      router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
    },
    [showImage, imageList.length, searchParams, pathname, router]
  );

  /**
   * Attach to figures marked as "fullscreen"
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const imgs = document.querySelectorAll("figure.fullscreen");
    imgs.forEach((img, index) => {
      img.style.cursor = "pointer";
      const handleClick = () => openView(index);
      img.addEventListener("click", handleClick);
      return () => img.removeEventListener("click", handleClick);
    });
  }, [imageList, openView]);

  /**
   * Allow keyboard controls
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImage === null) return;
      if (e.key === "ArrowLeft") incrementParam(-1);
      if (e.key === "ArrowRight") incrementParam(1);
      if (e.key === "Escape") closeView();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, incrementParam, closeView]);

  return (
    <>
      {activeImage !== null && (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <p>
              <strong>{imageList[activeImage].alt}</strong>
            </p>
            <div style={{ display: "contents" }} onClick={closeView}>
              <FontAwesomeIcon icon={faRectangleXmark} className="fa-solid" />
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              loader={({ src }) => src}
              unoptimized
              src={imageList[activeImage].img}
              width="500"
              height="500"
              alt={imageList[activeImage].alt}
              priority={true}
            />
          </div>
          <div className={styles.bottom}>
            <div className={styles.info}>
              {Object.entries(imageList[activeImage].info).map(([key, val]) => (
                <p key={key}>
                  <strong>{key}:</strong> {val}
                </p>
              ))}
            </div>
            <div className={styles.controls}>
              <div className={styles.arrow} onClick={() => incrementParam(-1)}>
                <FontAwesomeIcon icon={faCaretLeft} className="fa-solid" />
              </div>
              <div className={styles.arrow} onClick={() => incrementParam(1)}>
                <FontAwesomeIcon icon={faCaretRight} className="fa-solid" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
