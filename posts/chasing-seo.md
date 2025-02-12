---
title: "Chasing SEO"
excerpt: "The never ending cycle to improve search ranking and website approval"
image: "/images/projects/chasing-seo/dalle-background.webp"
date: "2/12/25"
type: "projects"
demo: "https://meyersa.com"
github: "https://github.com/meyersa/new-web"
---

# Having a website

When my portfolio site was basic and [just a single page of HTML](https://github.com/meyersa/meyersa-v1/), things were a lot simpler. There was really no concern about page load time, impressions, or overall appeal. Instead, it just functioned on it's own. 

Nowadays, this website ranks on Google for random topics and I have it linked everywhere - there's pressure for it to look somewhat enjoyable. Throughout my struggles with the writeup site there was never focus on readability, even now there still is a great lack. But things are changing, I'm by no means a UX or UI person but I've worked on enough web projects to build up some skills and I think it's time they get applied. 

# The plan 

With the site on NextJS, it was no longer reasonable to just tear it down and start from the beginning, as much as I wanted to. The v3 site had some lackluster design choices and needed *another* refresh. 

![V3 "Modern" Design :(](/images/projects/new-meyersa/v3.png)

The plan this time was to ditch all of the aesthetic single pallete automatic darkmode, and just nail one palete. This time, with better spacing, better load times, better usability, and now - better SEO. 

## Improving Spacing 

The first goal was to go through and identify all cases of margin and padding - or at this point **most** cases and either remove them in favor of flex gap or set them to a global variable. The reasoning here being a flex container has the same, margin aided, width between all elements. And global variables (gap is still a global variable) can be changed easily depending on future needs or browser viewports. 

For example, 

```css
.wrapper > div > * {
  margin: var(--small-pad) 0;
}
```

This replaces a static margin with now a dynamic one -- which can be changed for the component, page, or whole site easily. 

Along with this came some planning, my least favorite part about web design. Luckily there were some tools to help - firstly [Figma](https://figma.com) - a pretty industry standard Photoshop-esque tool for making layouts. And secondly - the new age AI version [Relume](https://www.relume.io/) (I found this to be a little cluttered and gave ShadCDN vibes with it not really creating unique components). But Figma was better. My idea had evolved to something more padding aligned and continuous, and thus came the easier part, implementing it and using consistent padding for things to align. 

## Fast Loading

In my experience, two things hinder loading speed the most: images and scripts. Using NextJS, these are both theoretically already account for - except it's more complicated than that.

### Scripts 

Next can optimize scripts by loading them after the content and prevent blocking. This was all good, but I figured since I was only really using jQuery this wouldn't be possible. I instead switched to the slim library and Cloudflare's CDJS and thought it was good. On second look, I realized I wasn't actually using JQuery - so I did the most optimal thing for optimizations and removed it entirely. 

The other large library being called was FontAwesome, which packaged up all of their icons despite not using them all. Luckily there is another strategy for optimizing this, loading it into the project and only packaging icons that are actually used. 

> npm install @fortawesome/react-fontawesome

And now the speed issues would be floated on to build instead of loading! (Great success) These are then easily called later

```js
<FontAwesomeIcon icon={faLinkedin} className="fa-solid"/>
```

### Images 

By default, Next applies lazy loading, image height/width metadata, and blur\*. However this only applies to images that are statically imported - so anything on the dynamic side would suffer from not being optimized. 

OK - so for images are out of the way but close to the top of the page, I was able to fix this by lazy loading their components since they would otherwise be rendered immediately. 

```js 
// Dynamic import slide
import dynamic from 'next/dynamic'
const DynamicImageSwiper = dynamic(() => import("../components/ImageSwiper") , {
  loading: () => <FontAwesomeIcon icon={faSpinner} className="fa-spinner" spinPulse />

})
```

This ended up working pretty well and I was surprised by it's functionality. From there the new component can just be called with `<DynamicImageSwiper />`. 

And for the real kickers - the title images - some additional routes were taken. The first was seemingly something that I believe should have been done by default, dynamic blurring with `plaiceholder`. 

```js
export async function getBlurData(imagePath) {
  const photoPath = path.join(photoDirectory, imagePath);

  try {
    console.log(`Reading file: ${photoPath}`);

    // Read the file as a buffer
    const buffer = fs.readFileSync(photoPath);

    // Generate base64 placeholder
    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (error) {
    console.error("Error generating blurDataURL:", error);
    return null; // Fallback to no blur if something goes wrong
  }
}
```

This then allows all images, regardless of import or lack of import, to have a blur effect on load. Which greatly sped up LCP times. 

## Better Usability

The main component of improving the usability was ensurable the website was readable. Instead of having a mess of different size fonts and spacing - now things were consistent and elegant and didn't distract from content. 

Before for example a lot of boxes were outlined, something that seems almost toyish looking back. Now, sections are flat on the background, making it feel much more thoughout and modern. 

This also comes with a higher use of icons, something about them really just adds more depth. 

## SEO

The important part - getting things on Google - the pinnacle of writing things online. The benchmark for this being a simple search for `site:meyersa.com` and the builtin lighthouse tests on Chrome. These are broken down into a couple of major areas: 

### Load Times (Reprise) 

Back again are load times, always causing problems. Just kidding, it makes sense when no one has the attention span for a slow website (I sure don't). 

When it comes to load times, an important metric is Largest Contentful Pain - or the time it takes for the majority of the first view to load. In this case, they are images, and after previous optimizations mentioned, they are better but not quite perfect. 

![Lighthouse performance score](/images/projects/chasing-seo/performance.png)
![Network image sizes](/images/projects/chasing-seo/image-sizes.png)

After this is the shift, but luckily most things on this site already had defined height/width so that was a nonissue. 

With the removal of JQuery and optimizations of FontAwesome, scores were looking good. High `90s`, but mainly due to just having such an ambitous goal of a fast loading image as the background. 

### Metadata

Something I haven't really ever used on a website before is metadata options. To start, things like excplicitly setting language in the HTML body, wouldn't even have occured to me until now. 

Taking this a step further, each page not only has a title but also a metadata title. This I found I could set globally in the `_app.js` specifier and then also override per page to ensure page titles. 

```js
<Head>
  <title>Photography - August Meyers</title>
  <meta name="description" content="Showcase of one of my main hobbies - Photography" />
</Head>
```

Finally more broadly are the OpenGraph specifications - but I wasn't even that sure of which ones to use. Frankly I came to the conclusion that these are really only for the big sites where things like ARIA specifications are also being implemented. I set the theme color to hopefully help with embeds and that was about it. 

I also ran into an issue of page naming, for example the site is named after me, but how do I name the home page? Titled August Meyers with the site title also August Meyers? This is where the branding really came into an issue.. 

### Search Agents 

Finally, to make Google happy and make use of all the SEO tweaks is actually getting the crawler on the site. In this case a couple things were missing, such as the Robots.txt file, headers, and a sitemap. 

I ended up making a simple robots.txt file and putting it in the public directory, eliminating that pretty easily. 

```txt
# Allow all crawlers
User-agent: *
Allow: /
```

In the future this should probably get updated to filter out bots though as they can easily hit websites offline at this point. 

The next were headers - and apparently I had noindex set globally(!!) which was not helping things. I removed this on Traefik and I was off to the races. 

Well except for helping Google find the posts pages. Instead of updating this manually, I created an API route and a rewrite to expose a custom document. This ended up being pretty hacky, but the site is actually able to be interpretted by bots now, so that's good. 

![Boring XML contents](/images/projects/chasing-seo/xml-view.png)

# Results 

With all that work done, you would hope the website would be doing better. And you would be hoping right 😎

The page now tracks on Google 

![Google search results](/images/projects/chasing-seo/search-results.png)
![Searching for Jellyfin predictions](/images/projects/chasing-seo/jf-results.png)

And it has a perfect desktop score, with a near perfect mobile score

![Lighthouse final score](/images/projects/chasing-seo/lighthouse.png)

Mission accomplished. Except there are still some more pending issues that I'll have to work on, but that's another story. 