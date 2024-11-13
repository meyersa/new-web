--- 
title: 'Making a NextJS Blog Site' 
exerpt: 'Creating a spot to post projects, such as making this website, using NextJS and other technologies'
image: '/images/projects/nextjs-blog/initial-code.png'
date: '2/20/2024'
--- 

# Intro/Inspo

Technical writing is something that is very common in Computer Science and Information Technology. Without it no one would really know what is happening, except the person who wrote it. For a while the things I hosted did not need any technical writing, because I was the one making it. Until it started to get to the point where I couldn't even remember what I had done. Then I knew it was time to make a blog of sorts. 

Instead of just spinning up another wordpress instance which I inevitably run into issues with styling, I decided it would be easier to make something more complicated. Introducing NextJS with remark to have the easy writing of Wordpress (kind of) in the style of markdown, but with the granularity of NextJS. 

# Process 

This can be broken down into a couple major phases 

## Research 

The first step was to research what technology to use. At this point I was in a sort of web phase, after working on a senior project [Institution Penguin](https://github.com/meyersa/institution-penguin). Our senior design project revolved heavily around a React router project called NextJS. It was pretty easy to use and it could do everything I wanted. 

With something like Wordpress the process of making a page is simply loading the site in your browser, logging in, and posting the page. However I felt like that was a little too easy, but at the same time making a whole page everytime I wanted to post also seemed too complicated. That's where Markdown came in. Using remark with NextJS I could make Markdown posts which would automatically get rendered into HTML pages. 

Now that I found the technology, the first step was to play around with it. The first generations were rough, basic code from other projects such as the NextJS documentation and other blog sites such as [Tina.io](https://tina.io/blog/simple-markdown-blog-nextjs/). This turned out to be rather useful, and I realized that this would not be too bad of a project to code. 

![Initial Code](/images/projects/nextjs-blog/initial-code.png)

## Implementation 

With some examples and guidelines found it was time to assemble a general NextJS site using my other projects as a reference point. This honestly took a lot longer than working with the JS for the posting since I had to dial everything into a point that I was happy with. 

> Working with the HTML/CSS of this project makes me consider another project, working on an asset hosting site that would allow me to standardize content between multiple websites with the ability to change CSS across multiple sites instantly. Sort of like an ansible but for websites. 

One of the first problems I ran into was that I didn't know NextJS as well as I figured. Combing through the documentation everything seemed familiar, until I tried to link to an external host for content (this time being github). While NextJS has great support for loading assets from the web, it turns out you have to explicity define that in the next.config.js file. Once that was figured out that problem was solved. 

Another problem I ran into was I had been working with Python so long that JavaScript syntax became a little confusing. Everything in Python just makes sense, its like writing English, but it's code. JSX with Next also did not help with this, it takes that syntax to even more complicated places. Especially when trying to pass arrays in to functions, which ends up being a mess of curly braces. 

## Styling 

At this point I almost feel like being a developer makes you into a part time UX designer. Websites never look good to me until I mess with them for a while. They start off with nice and neat CSS files broken up by module in Next, but end with random small fixes thrown in all over the place. (Part of the reason I want to get that asset host up is to remediate this problem). 

I really wanted to distinguish post locations, but using shadows or different colored boxes felt overdone after some of the other projects I worked on. My inspiration for this really came from the [Apache Kafka](https://kafka.apache.org) and [Apache Spark](https://spark.apache.org) websites. They look so clean, but are easily navigatable. It makes you appreciate the Apache foundations insane number of projects. 

Once again this process made me reflect on my other projects. Apache has so many websites, but they are not consistently themed. I have multiple, and it made me think about themeing them all the same, but maybe the color changes per site, but the rest is the same? Something about that sounds so satisfying. 

## Deployment 

NextJS provides some Dockerfiles that easily get the job done. Simply adding them and specifying the build directory took no time at all. 

And again I had Github workflows for deployment that I can reuse to have it get autobuilt on pushes. 

> Something I also want to consider is building images and pushing them to the Github container repo instead of building images locally. This would allow for more testing in something like a Jenkins pipeline before pushing, and also being able to then use that image in multiple places instead of having to build it in those places. 

And for now adding a route is easy, deploying with Cloudflare tunnels is just typing in the container name in the CF dashboard. In the future though, this will get moved into my Traefik mesh network on Oracle for better deployment standards and reliability.

## Making content 

With this blog site mostly done, it was time to consider content for it. I had unfortunately not really taken good notes of assembling this site, since it happened at random times and my memory isn't great, but now I had somewhere I could easily start writing a markdown file, or even just copy in from somewhere else, which should make the documentation process a lot easier. 