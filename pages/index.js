import Header from "./components/Header";
import Footer from "./components/Footer";
import SkillLevel from "./components/SkillLevel";
import FlexSpaceBetween from "./components/FlexSpaceBetween";
import Link from "next/link";
import { getRecentPosts } from "../lib/posts";
import RecentPosts from "./components/RecentPosts";
import Head from "next/head";
import PageBlock from "./components/PageBlock";
import TextBlock from "./components/TextBlock";
import TitlePage from "./components/TitlePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Dynamic import images that aren't rendered as fast
import dynamic from "next/dynamic";
import { getBlurData } from "../lib/getBlurData";
const DynamicImageSplit = dynamic(() => import("./components/ImageSplit"), {
  loading: () => <FontAwesomeIcon icon={faSpinner} className="fa-spinner" spinPulse />,
});

const titleImage = "/images/home/selfie.jpeg";

export default function Home({ allPostsData, blurDataURL }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Dedicated and developing IT/CPS student. Currently in the process of building experience while working as a student technician and learning in classes towards an accelerated masters in CPS."
        />
      </Head>
      <Header />
      <TitlePage header={"August Meyers"} image={titleImage} blurDataURL={blurDataURL}>
        <p>Building cool things, breaking things, and automating the rest.</p>
      </TitlePage>
      <TextBlock>
        <PageBlock>
          <div>
            <h2>TL;DR</h2>
            <p>
              I have always been interested in understanding how things work, challenging assumptions, and finding
              better ways to solve problems. That mindset has taken me from running a server rack in my dorm room while
              completing my master's degree to working on infrastructure, automation, observability, platform
              engineering, and architecture initiatives in enterprise environments. I am particularly interested in
              reliability, standardization, and building scalable solutions that make technology easier to operate and
              support. Outside of work, I spend my time on personal technology projects, horticulture, cycling, and
              reading.
            </p>
          </div>
        </PageBlock>
        <PageBlock>
          <div>
            <h2>Education</h2>
            <DynamicImageSplit image="/images/home/cmu.png" alt="CMU Logo">
              <h3>Master of Science, Central Michigan University</h3>
              <p>3.91 GPA, Accelerated Master's Program</p>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/cmu-masters.png" alt="CMU Logo">
              <h3>Bachelor of Science, Central Michigan University</h3>
              <p>
                3.98 GPA, Summa Cum Laude, Double major in Information Technology and Computer Science with minor in
                Math
              </p>
            </DynamicImageSplit>
          </div>
        </PageBlock>
        <PageBlock>
          <div>
            <h2>Experience</h2>
            <DynamicImageSplit image="/images/home/auto-owners.jpg" alt="Auto-Owners logo">
              <h3>Infrastructure Developer, Auto-Owners</h3>
              <p>
                Served as a key contributor to enterprise OpenShift platform operations, architecture, and production
                support, leading the migration of 170+ applications across 10+ engineering teams to a GitOps-based CI/CD
                platform while driving standardization, governance, and engineering best practices across the
                organization.
              </p>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/comerica.jpg" alt="Comerica bank logo">
              <h3>Site Reliability Engineer Intern, Comerica Bank</h3>
              <p>
                Led observability and automation initiatives across 5,000+ servers, standardizing monitoring, logging,
                and alerting practices while developing API-driven workflows supporting 25,000+ deployment records to
                improve consistency, reduce operational overhead, and advance enterprise observability modernization.
              </p>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/cmu.png" alt="Central Michigan University logo">
              <h3>Student Technician, Central Michigan</h3>
              <p>
                Provided technical support for 1,000+ devices and 300+ faculty members, troubleshooting hardware,
                software, and infrastructure issues while maintaining reliable technology services across campus.
              </p>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/seds.jpg" alt="SEDS USA Logo">
              <h3>Vice President, SEDS RSO</h3>
              <p>
                Co-founded and led a 20+ member aerospace engineering organization, coordinating multidisciplinary teams
                to design, build, and test rocket systems while fostering hands-on engineering experience and technical
                leadership.
              </p>
            </DynamicImageSplit>
          </div>
        </PageBlock>
        <PageBlock>
          <div>
            <h2>Technology</h2>
            <DynamicImageSplit image="/images/home/openshift.png" alt="OpenShift logo">
              <FlexSpaceBetween>
                <div>
                  <h3>OpenShift</h3>
                  <p>
                    Built and operated applications on enterprise OpenShift platforms, supporting production workloads,
                    application migrations, platform governance, and architecture initiatives. Through participation in
                    platform steering groups and day-to-day operations, I have developed expertise in Kubernetes-based
                    platforms, container orchestration, and large-scale application modernization.
                  </p>
                </div>
                <SkillLevel amount={7}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/docker.webp" alt="Docker logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Containers; Docker, CRI-O, containerd</h3>
                  <p>
                    Containers fundamentally changed how software is delivered and operated. From running Docker in my
                    home lab to supporting CRI-O on OpenShift and experimenting with containerd across different
                    environments, I have worked extensively with containerized workloads, image lifecycle management,
                    and the technologies that power modern cloud-native platforms.
                  </p>
                </div>
                <SkillLevel amount={7}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/argo.png" alt="Argo logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Argo</h3>
                  <p>
                    GitOps quickly became one of my favorite approaches to platform engineering. I have used Argo CD to
                    manage application deployments, improve configuration consistency, and enable reproducible
                    infrastructure and application management through declarative workflows.
                  </p>
                </div>
                <SkillLevel amount={5}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/ansible.png" alt="Ansible logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Ansible</h3>
                  <p>
                    Ansible has been a core component of both my professional work and personal projects. I use it to
                    automate server provisioning, configuration management, application deployment, and infrastructure
                    standardization across Linux and Windows environments.
                  </p>
                </div>
                <SkillLevel amount={9}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/terraform.jpg" alt="Terraform logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Terraform</h3>
                  <p>
                    Terraform introduced me to managing infrastructure through APIs and code. I have used it to
                    provision and manage cloud resources, SaaS integrations, and supporting infrastructure while
                    applying software engineering practices to infrastructure management.
                  </p>
                </div>
                <SkillLevel amount={4}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/ubuntu.png" alt="ubuntu logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Linux; RHEL and Ubuntu</h3>
                  <p>
                    Linux has been the foundation of nearly every platform I have worked with. Whether supporting
                    enterprise Red Hat environments, managing Ubuntu systems in my home lab, or deploying containerized
                    workloads, I am comfortable administering, troubleshooting, and automating Linux-based systems.
                  </p>
                </div>
                <SkillLevel amount={9}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/splunk.png" alt="Splunk logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Observability; Splunk, Dynatrace, Instana, Grafana</h3>
                  <p>
                    Observability has been a major focus throughout my career. I have designed monitoring and logging
                    solutions, led observability standardization efforts, and used tools such as Splunk, Dynatrace,
                    Instana, Grafana, Prometheus, and Loki to improve platform reliability, troubleshooting, and
                    operational visibility.
                  </p>
                </div>
                <SkillLevel amount={8}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/tekton.png" alt="Tekton Logo">
              <FlexSpaceBetween>
                <div>
                  <h3>CI/CD</h3>
                  <p>
                    Building reliable software delivery platforms has become a major focus of my career. I have worked
                    extensively with GitOps, Tekton, Argo CD, GitHub Actions, and enterprise OpenShift platforms to
                    automate application delivery, standardize deployment practices, and enable engineering teams to
                    move software from development to production efficiently and consistently.
                  </p>
                </div>
                <SkillLevel amount={8}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
          </div>
        </PageBlock>
        <PageBlock>
          <div>
            <h2>Programming</h2>
            <DynamicImageSplit image="/images/home/python.png" alt="Python logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Python</h3>
                  <p>
                    Python has been my primary programming language for automation, data engineering, machine learning,
                    and infrastructure tooling. I have used it to build API integrations, observability workflows, ETL
                    pipelines, automation utilities, and machine learning systems ranging from personal projects to
                    enterprise-scale initiatives.
                  </p>
                </div>
                <SkillLevel amount={9}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/tensorflow.png" alt="Tensorflow logo">
              <FlexSpaceBetween>
                <div>
                  <h3>Machine Learning; TensorFlow, Keras, Pandas</h3>
                  <p>
                    My graduate studies introduced me to large-scale machine learning workflows using TensorFlow, Keras,
                    and Python. Through projects involving weather prediction and MLOps pipelines, I gained experience
                    in model training, hyperparameter tuning, data processing, experiment tracking, and
                    production-oriented machine learning workflows.
                  </p>
                </div>
                <SkillLevel amount={6}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/react.png" alt="React Logo">
              <FlexSpaceBetween>
                <div>
                  <h3>React</h3>
                  <p>
                    React enables the development of responsive, data-driven web applications with reusable components
                    and modern development practices. I have used React and Next.js to build personal projects,
                    dashboards, and web applications while gaining experience with frontend architecture, APIs,
                    authentication, and state management.
                  </p>
                </div>
                <SkillLevel amount={7}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
            <DynamicImageSplit image="/images/home/js.png" alt="JavaScript Logo">
              <FlexSpaceBetween>
                <div>
                  <h3>JavaScript and TypeScript</h3>
                  <p>
                    While much of my professional work centers on infrastructure and platform engineering, JavaScript
                    and TypeScript have allowed me to build the applications and tooling that sit on top of those
                    platforms. From React and Next.js applications to APIs, dashboards, and automation utilities, I have
                    used them to bridge software development and platform operations.
                  </p>
                </div>
                <SkillLevel amount={8}></SkillLevel>
              </FlexSpaceBetween>
            </DynamicImageSplit>
          </div>
        </PageBlock>
        <PageBlock>
          <div>
            <h2>Recent Posts</h2>
            <RecentPosts allPostsData={allPostsData} postsPerPage={1} scrollToTop={false} topButtons={false} />
          </div>
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
      blurDataURL: await getBlurData(titleImage),
    },
  };
}
