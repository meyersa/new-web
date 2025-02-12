import Header from "./components/Header";
import Footer from "./components/Footer";
import SkillLevel from "./components/SkillLevel";
import FlexSpaceBetween from "./components/FlexSpaceBetween";
import SmallBox from "./components/SmallBox";
import Link from "next/link";
import { getRecentPosts } from "../lib/posts";
import RecentPosts from "./components/RecentPosts";
import Head from "next/head";
import PageBlock from "./components/PageBlock";
import TextBlock from "./components/TextBlock";
import ShowcaseItem from "./components/ShowcaseItem";
import TitlePage from "./components/TitlePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import titleImage from "../public/images/home/selfie.jpeg";

// Dynamic import images that aren't rendered as fast
import dynamic from 'next/dynamic'
const DynamicImageSplit = dynamic(() => import("./components/ImageSplit") , {
  loading: () => <FontAwesomeIcon icon={faSpinner} className="fa-spinner" spinPulse />

})


export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Dedicated and developing IT/CPS student. Currently in the process of building experience while working as a student technician and learning in classes towards an accelerated masters in CPS."
        />
      </Head>
      <Header />
      <TitlePage header={"August Meyers"} image={titleImage}>
        <p>
          Dedicated and developing IT/CPS student. Currently in the process of building experience while working as a
          student technician and learning in classes towards an accelerated masters in CPS. In my free time, I am always
          looking for new projects and experiences to further my knowledge in the technical field.
        </p>
      </TitlePage>
      <TextBlock>
        <PageBlock>
          <h2>About Me</h2>
          <ShowcaseItem>
            <h3>Education</h3>
            <DynamicImageSplit image="/images/home/cmu.png" alt="CMU Logo">
              <h4>Undergrad - Central Michigan University - May 2024</h4>
              <p>Double major in Information Technology and Computer Science with minor in Math</p>
              <p>Summa Cum Laude</p>
              <br />
              <h4>Graduate - Central Michigan University - Expected May 2025</h4>
              <p>Accelerated Masters Degree in Computer Science</p>
            </DynamicImageSplit>
          </ShowcaseItem>
          <ShowcaseItem>
            <h3>Experience</h3>
            <DynamicImageSplit image="/images/home/comerica.jpg" alt="Comerica bank logo">
              <h4>Site Reliability Engineer Intern - Comerica Bank - Summer/Fall 2023 and 2024</h4>
              <p>Standardizing monitoring, transitioning to deployment as code and further automation</p>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/cmu.png" alt="Central Michigan University logo">
              <h4>Student Technician - Central Michigan - October 2020 to Present</h4>
              <p>Supporting faculty and staff on day to day operations as well as helping maintain infrastructure</p>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/seds.jpg" alt="SEDS USA Logo">
              <h4>Vice President - SEDS RSO</h4>
              <p>
                Creating and leading a student organization to coordinate students across various fields to use applied
                science to design, fabricate, and test rockets
              </p>
            </DynamicImageSplit>
          </ShowcaseItem>
          <SmallBox>
            <p>
              See <Link href="/projects">/projects</Link> for work I have done outside of enterprise environments. One
              largescale project was InstitutionPenguin which combined a react native website with CI/CD, API Ready
              Development, and agile programming.
            </p>
          </SmallBox>
        </PageBlock>
        <PageBlock>
          <h2>Programming</h2>
          <div>
            <DynamicImageSplit image="/images/home/python.png" alt="Python logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Python</h3>
                  <p>
                    Used extensively with data projects and ML. For example my Paranoia project on GitHub or one of the
                    other ETL pipelines.
                  </p>
                </div>
                <SkillLevel amount={9}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/js.png" alt="JavaScript logo">
              <FlexSpaceBetween>
                <div>
                  <h3>JS/TS</h3>
                  <p>Powering this website as well as many others,</p>
                </div>
                <SkillLevel amount={9}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/react.png" alt="React Logo">
              <FlexSpaceBetween>
                <div>
                  <h3>React</h3>
                  <p>
                    Most websites I make now are React native to utilize page generation as well as component
                    reusability.
                  </p>
                </div>
                <SkillLevel amount={7}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/c.png" alt="C Found. Logo">
              <FlexSpaceBetween>
                <div>
                  <h3>C</h3>
                  <p>
                    I&apos;ve worked on a couple projects that utilize Arduino/Pis that have to run lightweight code
                    where C comes in
                  </p>
                </div>
                <SkillLevel amount={4}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
          </div>
          <SmallBox>
            <p>
              I have a lot of examples of my coding on my <Link href="https://github.com/meyersa">github</Link>
            </p>
          </SmallBox>
        </PageBlock>
        <PageBlock>
          <h2>Technology</h2>
          <div>
            <DynamicImageSplit image="/images/home/docker.webp" alt="Docker logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Docker</h3>
                  <p>
                    Almost every project I work on ends up being deployed and tested in Docker containers for their
                    reproducibility
                  </p>
                </div>
                <SkillLevel amount={9}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/dynatrace.png" alt="Dynatrace logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Dynatrace</h3>
                  <p>
                    While at Comerica, I worked extensively on Dynatrace deployments with their API and become a sort of
                    Subject Matter Expert
                  </p>
                </div>
                <SkillLevel amount={9}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/debian.png" alt="Debian logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Linux (Debian)</h3>
                  <p>My server deployments are exclusively on linux now, with Debian based being the primary distro</p>
                </div>
                <SkillLevel amount={9}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/ansible.png" alt="Ansible logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Ansible</h3>
                  <p>
                    Management platform for all cloud and local servers, which I am tempted to manage my own computers
                    with as well
                  </p>
                </div>
                <SkillLevel amount={8}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/adobe.png" alt="Adobe logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Adobe LR/PS</h3>
                  <p>
                    Sort of out of place here, but I have worked a lot on media design in my free time and especially
                    LightRoom to become the goto photographer for friends and family
                  </p>
                </div>
                <SkillLevel amount={8}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
          </div>
        </PageBlock>
        <PageBlock>
          <h2>Recent Posts</h2>
          <RecentPosts allPostsData={allPostsData} postsPerPage={1} scrollToTop={false} topButtons={false} />
          <SmallBox>
            <p>
              More posts can be found in the respect <Link href="/projects">Projects</Link> and{" "}
              <Link href="/photography">Photography</Link> directories.
            </p>
          </SmallBox>
        </PageBlock>
      </TextBlock>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allPostsData: getRecentPosts(),
    },
  };
}
