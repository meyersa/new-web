--- 
title: 'Shodan ETL Pipeline' 
excerpt: 'My first attempt at an ETL pipeline using Shodan.io APIs to gather information about previous scrapes to build a dashboard on ExpressJS to display the information'
image: '/images/projects/shodan-etl/background.png'
date: '9/13/2023'
--- 

# Shodan ETL Pipeline
My first attempt at an ETL pipeline using Shodan.io APIs to gather information about previous scrapes to build a dashboard on ExpressJS to display the information

[Github](https://github.com/meyersa/shodan-etl)
[Live](https://shodanetl.meyersa.com)

![What it ended up looking like](/images/projects/shodan-etl/background.png)

## Contents 

# Intro/Inspo

The inspiration for this project came from an assignment in one of my graduate classes, creating an ETL pipeline. ETL pipelines are common in data mining and other data science areas, basically extracting data, transforming, and then loading the data. 

Since I didn't want to just use a Kaggle dataset to operate this pipeline on, I chose instead to utilize Shodan.io and scrape information off there in batches and process it throughout the pipeline. 

> To continue with the ETL pipeline idea, I originally implemented it with Kafka connecting the steps. However, to make this more practical, the steps just send directly to eachother in a single container 

To further my web development experience, I templated this site with ExpressJS and I found it to be really intuitive and simple. 

# ETL 

## Extraction 

The first step, extraction, is taken care of with Shodan's own Python library. This just samples a query set in ENV and passes the information on to the next steps. 

## Transformation 

There are a couple steps inside of this step: flattening, cutting, and enriching. 

When the information originally comes in, it can be tons of different information per single record. To mitigate this, we flatten the incoming dictionary on IP and are able to save a lot of memory. 

To further knock this down, a lot of fields coming in may not be necessary. As such, they are dropped or concatenated when possible. 

Finally, incoming IPs are enriched with Data from Maxmind as well as Crowdsec to show more information about them. 

## Loading

Surprisingly, also another complicated step. We are regularly querying the same information and trying to store it, so a mechanism to only update the relevant information had to be implemented. Basically, if we have seen the IP before, we grab the current document in Mongo and compare it to the update. Generally, one piece of "data" changes and we can just modify the single field in the document. However, sometimes even the enrich data changes and in these instances it's easier to replace the whole document. 

# Technologies 

- ExpressJS
- Python
- Shodan.io 
- MongoDB
- Crowdsec 