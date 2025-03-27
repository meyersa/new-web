# New Portfolio Website 

React website to showcase my skills, projects, and hobbies 😊

## Features 
- React (Next.js) framework for reusability and featureset 
- CI/CD to build to Docker for deployments 
- Logging via Pino 
- Cloudflare CDN for static files 
- Cloudflare Transformations for images 
- Full Screen Image galleries 
- Markdown parsing with Remark/Rehype 

## ENVs

`NODE_ENV` = Environment to run (production/development)

When running development, images will be served locally, whereas on production Cloudflare will be leveraged. 

## Prod Build 

1. Install NPM Packages 

> npm install 

2. Build the production server 

> npm run build 

3. Start the standalone server 

> node run .next/standalone/server.js 

## Dev Build 
1. Install NPM packages 

> npm install

2. Run the Next Dev environment

> npm run dev

This will launch a local instance at localhost:3000 that will rebuild live for development purposes