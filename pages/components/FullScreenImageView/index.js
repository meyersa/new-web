import Image from "next/image";
import styles from "./fullscreenimageview.module.css";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

export default function FullScreenImageView({ imageList }) {
  /*
   * Since I can't escape the overflow issues, I'll try something else
   *
   * When an image is clicked, we'll instead append ?showImage=image to path
   * If the name of the image is in the imageList we were passed, we'll show it
   * if not, this will stay hidden
   */
  const [image, setImage] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  // Watch for image updates in query
  const searchParams = useSearchParams();
  const showImage = searchParams.get("showImage");

  useEffect(() => {
    var curNum = Number.parseInt(showImage);

    if (isNaN(curNum)) {
      curNum = null;
    }

    if (0 > curNum || curNum > imageList.length - 1) {
      curNum = null;
    }
    setImage(curNum);
  }, [showImage, imageList.length]);

  // If no image then we don't show anything
  if (image == null) {
    return;
  }

  // Handle closing the view
  function closeView() {
    const params = new URLSearchParams(searchParams);

    params.delete("showImage");
    router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  }

  function incrementParam(amount) {
    const params = new URLSearchParams(searchParams);

    const curImage = Number.parseInt(showImage);
    var newImage = curImage + amount;

    if (newImage < 0) {
      newImage = imageList.length - 1;
    }

    if (newImage > imageList.length - 1) {
      newImage = 0;
    }

    params.set("showImage", newImage);
    router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p>{imageList[image]["alt"]}</p>
        <div style={{ display: "contents" }} onClick={() => closeView()}>
          <FontAwesomeIcon icon={faRectangleXmark} className="fa-solid" />
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image src={imageList[image]["img"]} width="500" height="500" alt={imageList[image]["alt"]} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.info}>
          {Object.entries(imageList[image]["info"]).map(([key, val]) => (
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
  );
}
