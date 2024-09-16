import Image from "next/image";
import { useRouter } from "next/router";
import { useSearchParams, usePathname } from 'next/navigation';

export default function FullScreenImageButton({ src, alt }) {
  /* 
   * Complimentary component to FullScreenImageView 
   * Separated to allow for full screen view since the other is under 
   * a overflow: hidden 
   */
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter() 

  // Update path if clicked
  function openView() {
    const params = new URLSearchParams(searchParams)

    // Appends path and pushes without reloading
    params.set('showImage', src)
    router.replace(`${pathname}?${params.toString()}`, undefined, { shallow: true });

  }

  return (
    <div onClick={() => openView()} style={{display: "contents"}}>
      <Image src={src} height="500" width="500" alt={alt}/>
    </div>
  )
}
