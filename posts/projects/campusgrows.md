--- 
title: 'CampusGrows.CMU' 
excerpt: 'Website to show awareness for sustainability/gardens on campus'
image: '/images/projects/campusgrows/background.png'
date: '9/22/2024'
--- 

# Links 

[Github](https://github.com/meyersa/campusgrows)
[Live](https://campusgrows.com)

# Images 

![What it ended up looking like](/images/projects/campusgrows/background.png)

# Intro/Inspo

One of my friends jokingly mentioned making a website for their RSO to raise awareness and I felt the need to take that seriously. While also having some fun. 

Another one of my hobbies is photography, so the idea of making a website with a lot of original assets sounded like a fun time. The result ended up being pretty nice. 

## Automation 

This project outlined a lot of cool parts (at least I think) of my infrastructure that made this more than possible. To start, having Github actions build a docker image automatically means that when I deploy (manually in this case) all I have to do is specify an image instead of building one. With the existing Traefik router on the main hosts, this also means that Cloudflare was pointing at the right place to begin with, making it possible to build this website and deploy it all within a single day. 

# Technologies 

- Nginx
- LR
- Photography 
- Docker