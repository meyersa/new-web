import Link from "next/link";
import Image from "next/image";
import ColorBox from "../ColorBox";
import SpacerDots from "../SpacerDots";

export default function PostItem({ dir, id, title, date, exerpt, image }) {
  if (dir == null) {
    console.error("DIR cannot be null");
    return;
  }

  return (
    <div style={{ display: "contents" }}>
      <ColorBox>
        <h1>
          <Link href={`${dir}/${id}`}>{title}</Link>
        </h1>
        <p>{date}</p>
        <Link href={`${dir}/${id}`}>
          <Image
            src={image}
            alt="Cover image"
            width={500}
            height={500}
            priority={true}
            style={{ width: "100%", height: "30vh", objectFit: "cover" }}
          />
        </Link>
        <p>{exerpt}</p>
      </ColorBox>
      <SpacerDots />
    </div>
  );
}
