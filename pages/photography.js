import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import Footer from "./components/Footer"
import SmallBox from "./components/SmallBox"
import ColorBox from "./components/ColorBox"
import TextWrap from "./components/TextWrap"
import SpacerDots from "./components/SpacerDots";
import { getSortedPostsData } from "../lib/posts";
import RecentPosts from "./components/RecentPosts";

const dir = "photography"

export default function Photography({ allPostsData }) {
  return (
    <div>
      <Header />
      <div>
        <TitlePage header="Photography" image="/images/photography/background.jpg">
          <p>Showcase of one of my main hobbies - Photography</p>
        </TitlePage>
        <p style={{margin: "0 auto", padding: "1rem", width: "fit-content"}}>
          Above image was taken in Georgia with an EOS R and a Sigma 24-105 f4 Art
        </p>
        <SpacerDots />
        <TextWrap>
        <h1>
            Trips, Portraits, Sports, and more..
          </h1>
          <p>On this page are my favorite collections of photos, mostly of trips I&apos;ve been on, but also including some sports photography.</p>
          <p>No portraits though..</p>
        </TextWrap>
        <RecentPosts dir={dir} allPostsData={allPostsData} />
        <TextWrap>
          <p style={{textAlign: "center"}}>There is currently no way to view <span style={{fontStyle: "italic"}}>all</span> posts but that should be a thing eventually</p>
        </TextWrap>
        <ColorBox>
          <h1>
            Equipment
          </h1>
          <h3>Main Camera - Canon EOS R</h3>
          <p>- Normally paired with a Tamron 100-400 or a Sigma 24-105 f4 Art</p>
          <p>- Peak design quick release straps</p>
          <h3>Backup Camera - Canon 6D</h3>
          <p>For when both a telephoto and a wide angle are needed, this carries whatever&apos;s not on the main camera</p>
        </ColorBox>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  console.log(`Fetching post data from ${dir}`);

  const allPostsData = getSortedPostsData(dir);

  return {
    props: {
      allPostsData,
    },
  };
}
