import Header from "./components/Header";
import Footer from "./components/Footer";
import ColorBox from "./components/ColorBox";
import SkillLevel from "./components/SkillLevel";
import StyledList from "./components/StyledList";
import TitlePage from "./components/TitlePage";
import ImageSplit from "./components/ImageSplit";
import FlexSpaceBetween from "./components/FlexSpaceBetween";
import SmallBox from "./components/SmallBox";
import Link from "next/link";
import AttentionButtons from "./components/AttentionButtons";
import TextWrap from "./components/TextWrap";
import { getRecentPosts } from "../lib/posts";
import RecentPosts from "./components/RecentPosts";

export default function Home({ allPostsData }) {
  return (
    <div>
      <Header />
      <div>
        <TitlePage header={"August Meyers"} image={"/images/home/selfie.jpeg"}>
          <AttentionButtons />
        </TitlePage>
        <TextWrap>
          <h1>About me...</h1>
          <p>
            Dedicated and developing IT/CPS student. Currently in the process of building experience while working as a
            student technician and learning in classes towards an accelerated masters in CPS. In my free time, I am
            always looking for new projects and experiences to further my knowledge in the technical field.
          </p>
        </TextWrap>
        <ColorBox>
          <h1>Education</h1>
          <StyledList>
            <ImageSplit image="/images/home/cmu.png" alt="CMU Logo">
              <h3>Undergrad - Central Michigan University - May 2024</h3>
              <p>Double major in Information Technology and Computer Science with minor in Math</p>
              <p>Summa Cum Laude</p>
              <h3>Graduate - Central Michigan University - Expected May 2025</h3>
              <p>Accelerated Masters Degree in Computer Science</p>
            </ImageSplit>
          </StyledList>
        </ColorBox>
        <SmallBox>
          <p>
            Some relevant coursework during my Masters program have been CPS580 - Supervised Machine Learning, CPS685 -
            Pattern Recognition and Data Mining, and ITC630 - Cloud Computing which have focused on ML and current
            technologies.
          </p>
        </SmallBox>
        <ColorBox>
          <div>
            <h1>Experience</h1>
            <StyledList>
              <ImageSplit image="/images/home/comerica.jpg" alt="Comerica bank logo">
                <h3>Site Reliability Engineer Intern - Comerica Bank - Summer/Fall 2023 and 2024</h3>
                <p>Standardizing monitoring, transitioning to deployment as code and further automation</p>
              </ImageSplit>
              <ImageSplit image="/images/home/cmu.png" alt="Central Michigan University logo">
                <h3>Student Technician - Central Michigan - October 2020 to Present</h3>
                <p>Supporting faculty and staff on day to day operations as well as helping maintain infrastructure</p>
              </ImageSplit>
              <ImageSplit image="/images/home/seds.jpg" alt="SEDS USA Logo">
                <h3>Vice President - SEDS RSO</h3>
                <p>
                  Creating and leading a student organization to coordinate students across various fields to use
                  applied science to design, fabricate, and test rockets
                </p>
              </ImageSplit>
            </StyledList>
          </div>
        </ColorBox>
        <SmallBox>
          <p>
            See <Link href="/projects">/projects</Link> for work I have done outside of enterprise environments. One
            largescale project was InstitutionPenguin which combined a react native website with CI/CD, API Ready
            Development, and agile programming.
          </p>
        </SmallBox>
        <ColorBox>
          <div>
            <h1>Programming</h1>
            <StyledList>
              <ImageSplit image="/images/home/python.png" alt="Python logo">
                <FlexSpaceBetween>
                  <div>
                    <h3>Python</h3>
                    <p>
                      Used extensively with data projects and ML. For example my Paranoia project on GitHub or one of
                      the other ETL pipelines.
                    </p>
                  </div>
                  <SkillLevel amount={9}></SkillLevel>
                </FlexSpaceBetween>
              </ImageSplit>
              <ImageSplit image="/images/home/js.png" alt="JavaScript logo">
                <FlexSpaceBetween>
                  <div>
                    <h3>JS/TS</h3>
                    <p>Powering this website as well as many others,</p>
                  </div>
                  <SkillLevel amount={8}></SkillLevel>
                </FlexSpaceBetween>
              </ImageSplit>
              <ImageSplit image="/images/home/react.png" alt="React Logo">
                <FlexSpaceBetween>
                  <div>
                    <h3>React</h3>
                    <p>
                      Most websites I make now are React native to utilize page generation as well as component
                      reusability.
                    </p>
                  </div>
                  <SkillLevel amount={8}></SkillLevel>
                </FlexSpaceBetween>
              </ImageSplit>
              <ImageSplit image="/images/home/c.png" alt="C Found. Logo">
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
              </ImageSplit>
            </StyledList>
          </div>
        </ColorBox>
        <SmallBox>
          <p>
            I have a lot of examples of my coding on my <Link href="https://github.com/meyersa">github</Link>
          </p>
        </SmallBox>
        <ColorBox>
          <div>
            <h1>Technology</h1>
            <StyledList>
              <ImageSplit image="/images/home/docker.webp" alt="Docker logo">
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
              </ImageSplit>
              <ImageSplit image="/images/home/dynatrace.png" alt="Dynatrace logo">
                <FlexSpaceBetween>
                  <div>
                    <h3>Dynatrace</h3>
                    <p>
                      While at Comerica, I worked extensively on Dynatrace deployments with their API and become a sort
                      of Subject Matter Expert
                    </p>
                  </div>
                  <SkillLevel amount={9}></SkillLevel>
                </FlexSpaceBetween>
              </ImageSplit>
              <ImageSplit image="/images/home/debian.png" alt="Debian logo">
                <FlexSpaceBetween>
                  <div>
                    <h3>Linux (Debian)</h3>
                    <p>
                      My server deployments are exclusively on linux now, with Debian based being the primary distro
                    </p>
                  </div>
                  <SkillLevel amount={9}></SkillLevel>
                </FlexSpaceBetween>
              </ImageSplit>
              <ImageSplit image="/images/home/ansible.png" alt="Ansible logo">
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
              </ImageSplit>
              <ImageSplit image="/images/home/adobe.png" alt="Adobe logo">
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
              </ImageSplit>
            </StyledList>
          </div>
        </ColorBox>
        <TextWrap>
          <h1>Recent Posts</h1>
        </TextWrap>
        <RecentPosts allPostsData={allPostsData} postsPerPage={1} scrollToTop={false} topButtons={false} />
        <TextWrap>
          <p style={{textAlign: "center"}}>
            More posts can be found in the respect <Link href="/projects">Projects</Link> and{" "}
            <Link href="/photography">Photography</Link> directories.
          </p>
        </TextWrap>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allPostsData: getRecentPosts(),
    },
  };
}
