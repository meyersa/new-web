import Image from "next/image";
import styles from "./fullscreenimageview.module.css";
import { useEffect, useState } from "react";
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

  // Build imageList by querying the DOM for images with class "fullscreen"
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

  useEffect(() => {
    let curIndex = Number.parseInt(showImage);
    if (isNaN(curIndex) || curIndex < 0 || curIndex >= imageList.length) {
      curIndex = null;
    }
    setActiveImage(curIndex);
  }, [showImage, imageList.length]);

  const openView = (index) => {
    const params = new URLSearchParams(searchParams);
    params.set("showImage", index);
    router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  };

  const closeView = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("showImage");
    router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  };

  const incrementParam = (amount) => {
    const curImage = Number.parseInt(showImage);
    let newImage = curImage + amount;
    if (newImage < 0) newImage = imageList.length - 1;
    if (newImage >= imageList.length) newImage = 0;
    const params = new URLSearchParams(searchParams);
    params.set("showImage", newImage);
    router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  };

  // Attach click handlers to images with class "fullscreen"
  useEffect(() => {
    if (typeof window === "undefined") return;
    const imgs = document.querySelectorAll("figure.fullscreen");
    imgs.forEach((img, index) => {
      img.style.cursor = "pointer";
      const handleClick = () => openView(index);
      img.addEventListener("click", handleClick);
      return () => img.removeEventListener("click", handleClick);
    });
  }, [imageList]);

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
