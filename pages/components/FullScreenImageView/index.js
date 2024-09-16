import Image from "next/image";
import styles from "./fullscreenimageview.module.css";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";

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
    setImage(showImage);
  }, [showImage]);

  // If no image then we don't show anything
  if (image == null) {
    return;
  }

  // Handle closing the view
  function closeView() {
    // TODO: Disable scroll
    
    const params = new URLSearchParams(searchParams);

    // Change path and push without reloading
    params.delete("showImage");
    router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  }
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div style={{ display: "contents" }} onClick={() => closeView()}>
          <i class={"fa-solid fa-square-xmark"}></i>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image src={image} width="500" height="500" />
      </div>
    </div>
  );
}
