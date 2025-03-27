---
title: "CloudFlare CDN"
excerpt: "Utilizing the Cloudflare Free tier image transformations to improve load times"
image: "/images/projects/cloudflare-cdn/dalle-background.png"
date: "3/27/25"
type: "projects"
demo: "https://meyersa.com"
github: "https://github.com/meyersa/new-web"
---

# Hero Images 
The only image I can come up with to appropriately head a "personal" website are hero images, you know, the large image background that takes up the whole page. 

![Hero Image on this website](/images/projects/cloudflare-cdn/home.png) 

They look modern, sleek, and capture the idea of the page (sometimes or are just aesthetic). The only problem is they are slow, very slow. Traditionally, the solution to this is through aggressive caching and edge CDNs, things that are also historically quite complex and expensive. However, probably my favorite company in Technology [Cloudflare](https://cloudflare.com) has changed things once again by making it both affordable and relatively easy to set up. 

# Cloudflare Images 
Cloudflare announced their [images/video service](https://www.cloudflare.com/developer-platform/products/cloudflare-images/) a while back which was great and all, but it had one large red flag to the average self-hoster like myself, it had a minimum plan price of $5!! While this is not that much, I was determined not to have to pay for these features. And as it turns out, they support just that, with 5,000 image transformations per month from a remote source for free! 

And the backend to store these images? Well in theory this could just be the website itself, for example using the Cloudflare Images proxy you simply append the snippet `/cdn-cgi/image` to your domain to have the worker process it-

> cdn.meyersa.com/cdn-cgi/image/https://meyersa.com/images/projects/cloudflare-cdn/dalle-background.webp 

Or I could do the even more overkill thing, and use R2 as the background so it appears cleaner-

> cdn.meyersa.com/cdn-cgi/image/images/projects/cloudflare-cdn/dalle-background.webp 

Simply by making an R2 bucket and by having the access URL be `cdn.meyersa.com` and since there are no egress fees on R2, this means it's basically free (probably like $0.01 a month for image hosting). 

# Performance Improvements 
Using Image Transformations does a couple of notable things 

1. Compression: Images are compressed into AVIF or WEBP making them substantially faster than traditional jpeg/jpg or whatever the original upload was.
2. Caching: Images processed by transformations are therefore cached on Cloudflare's edge. Making them quite fast. 
3. Resizing: Just like the NextJS loader, Cloudflare will adjust the quality and size of images, making them better fit the space they are filling - even using the same logic as the `<Image />` component. 

This ends up having images come out much smaller and faster (this is without local cache)

![Images on network tab](/images/projects/cloudflare-cdn/network-tab.png) 

# Static Assets 
With how NextJS bundles the program, Cloudflare can also be used to serve those assets. This can be added quickly in the `next.config.js` file.

```js
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  output: "standalone",
  images: {
    remotePatterns: [
 {
        hostname: 'cdn.meyersa.com',
 }
 ],
 },
  assetPrefix: isDev ? '' : 'https://cdn.meyersa.com',
};
```

Just make sure that when you sync your assets, you are keeping the JavaScript prefix `/_next/static` or Next will be unable to load them. 

# Integrating into CI/CD 
With static assets changing on, well, every change, keeping up with them could be a little difficult. However, CI/CD saves the day here with the possibility of running this during the build pipeline. I simply added another job on the main push for when features are deployed that pushes everything to my bucket via AWS CLI. 

```yml
# Build NextJS Prod...

- name: Sync static files to Cloudflare R2
  run: |
 aws s3 sync .next/static/ s3://${{ secrets.R2_BUCKET }}/_next/static \
 --endpoint-url ${{ secrets.R2_ENDPOINT }} \
 --checksum-algorithm CRC32
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.R2_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.R2_KEY }}

- name: Sync public files to Cloudflare R2
  run: |
 aws s3 sync public s3://${{ secrets.R2_BUCKET }} \
 --endpoint-url ${{ secrets.R2_ENDPOINT }} \
 --checksum-algorithm CRC32
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.R2_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.R2_KEY }}
```

# Results 
In the end, it seems page load times are the same as before around `250ms`. The reason for this is definitely that serving the static assets from R2 is not as fast as it should be, but the images make up for it. For me, this trade-off works as I can both be proud the site utilizes a CDN as well as serve slightly higher quality images without worrying about the overhead. So all in all, I would say this was still a success. 