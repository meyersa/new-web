import Header from "./components/Header";
import TitlePage from "./components/TitlePage";
import Footer from "./components/Footer";
import { getRecentPosts } from "../lib/posts";
import RecentPosts from "./components/RecentPosts";
import Head from "next/head";
import TextBlock from "./components/TextBlock";
import PageBlock from "./components/PageBlock";
import ShowcaseItem from "./components/ShowcaseItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCameraRetro, faMagnifyingGlass, faSignOut } from "@fortawesome/free-solid-svg-icons";
import FASection from "./components/FASection";
import SmallBox from "./components/SmallBox";
import { getBlurData } from "../lib/getBlurData";

const type = "photography";
const titleImage = "/images/photography/background.jpg";

export default function Photography({ allPostsData, blurDataURL }) {
  return (
    <>
      <Head>
        <title>Photography - August Meyers</title>
        <meta name="description" content="Showcase of one of my main hobbies - Photography" />
      </Head>
      <Header />
      <TitlePage header="Photography" image={titleImage} blurDataURL={blurDataURL}>
        <p>Showcase of one of my main hobbies - Photography</p>
      </TitlePage>
      <TextBlock>
        <PageBlock>
          <div>
            <h2>Trips, Portraits, Sports, and more</h2>
            <p>
              On this page are my favorite collections of photos, mostly of trips I&apos;ve been on, but also including
              some sports photography.
            </p>
          </div>
          <ShowcaseItem>
            <h3>Equipment</h3>
            <FASection>
              <FontAwesomeIcon icon={faCamera} />
              <div>
                <h4>Canon EOS R (Primary)</h4>
                <p>
                  Canon&apos;s original full frame mirrorless that started the R lineup, it never disappoints. I picked
                  this up off the Canon refurb store and have been shooting with it as my primary since
                </p>
              </div>
            </FASection>
            <FASection>
              <FontAwesomeIcon icon={faCameraRetro} />
              <div>
                <h4>Canon 6D (Backup)</h4>
                <p>
                  While not as advanced as the primary R, the 6D serves as a reliable backup with better battery life
                  and solid performance. However it generally serves as a convenient lens storage system for when I need
                  to have multiple without a backpack
                </p>
              </div>
            </FASection>
            <FASection>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <div>
                <h4>Tamron 100-400</h4>
                <p>
                  My trusted zoom lens for sports and wildlife photography. Occasionally this can turn into a portrait
                  lens or landscape lens in a pinch, but the minimum zoom makes it a little tricky
                </p>
              </div>
            </FASection>
            <FASection>
              <FontAwesomeIcon icon={faSignOut} />
              <div>
                <h4>Sigma 24-105 Art</h4>
                <p>
                  The companion to my zoom, for everything else, this lens performs pretty well. It&apos;s not quite as
                  sharp as I would hope though, and in the future this would probably be the first thing to get upgraded
                </p>
              </div>
            </FASection>
          </ShowcaseItem>
          <SmallBox>
            <p>As for software, everything is done on Lightroom Classic as I&apos;m pretty simple</p>
          </SmallBox>
        </PageBlock>
        <PageBlock>
          <h2>Recent Posts</h2>
          <RecentPosts dir={type} allPostsData={allPostsData} postsPerPage={5} />
        </PageBlock>
      </TextBlock>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allPostsData: getRecentPosts({ type }),
      blurDataURL: await getBlurData(titleImage),
    },
  };
}
