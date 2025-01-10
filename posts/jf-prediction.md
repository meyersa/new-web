---
title: 'Jellyfin Predictions'
excerpt: 'Predicting movie recommendations with Random Forest'
image: '/images/projects/jf-prediction/background.jpg'
date: '1/10/2025'
type: 'projects'
---

# Jellyfin Predictions
Predicting movie recommendations with Random Forest

[Github](https://github.com/meyersa/jf-prediction)

## Contents 


# Goal 

Finding movies to watch is often a difficult task for me, nothing sounds appealing anymore, despite there being plenty of good options. I had the idea - what if I could take tons of metadata about movies I had liked in the past, and then train a machine learning algorithm on it to understand movies that could be similar without me even knowing? 

With that in mind, movie metadata such as: 

- PremiereDate
- CriticRating
- OfficialRating
- Overview
- TagLines
- Genres
- CommunityRating
- ProductionYear
- People
- Studios

And lots more will be used to try and find patterns. 

## Jellyfin? 

Jellyfin is a media library frontend, but more importantly, it's home to a lot of metadata. Basically, I can connect to Jellyfin and read information about lots of movies - similar to Trakt but I can host it on my own hardware, meaning I can go crazy with API queries. 

Importantly, this is just a home to metadata for me, to build a "watch history" to make predictions on where I can then watch the movies `legally`. 

# Procurement

The first step was to find a way to gather all of the movie information, hopefully with an API. While Jellyfin does not have much documentation on the underlining API, Emby - the platform Jellyfin is forked on - [does](https://swagger.emby.media/?staticview=true). From here the ItemService route was located and a query was set up. 

![Swagger UI](/images/projects/jf-prediction/swagger.png)

P.S. Swagger is a literal lifesaver when it comes to any kind of API work 

Similarly, to enrich the movie data, Jellyfin groups movies into Collections, or series, which can be polled separately. 

And when doing this I found a neat trick to preserve order while iterating without using a count variable. This also helped me avoid a double iteration loop, theoretically reducing computation by a lot by somehow making it a little slower in practice. Who knows... Maybe it's scalable now.

```Python
for order, movie_data in enumerate(movies_in_collection, start=1)
```

# Processing

Due to the wide variety of data, many types of processing will have to be utilized as well as feature engineering to have a better understanding. 

## Fast Text 
Text vectoring for values such as: 

- Title
- Overview
- Tagline

```Python
combined_embeddings = np.vstack(combined_text.apply(lambda x: get_fasttext_vector(x, self.fasttext_combined_model)))
combined_embeddings_sparse = csr_matrix(combined_embeddings)
```

Adds a lot of computation but theoretically grabs possibly useful ties from information in the text. 

## Date Engineering

Taking the premiere date, converting it to a Pandas date, and then abstracting things such: 

- Year
- Month
- Day
- If it is a weekend
- The week of the year
- And the day of the year 

```Python
df["PremiereDate"] = pd.to_datetime(df['PremiereDate'], errors='coerce')
```

Pulling out these other values from the date could lead to more patterns being uncovered by the model.

## Scalar 

Numerical data such as: 

- Community Rating
- Collection Size 
- Production Year 
- Age since the last movie
- Length of the movie 

This can then be flattened with a normalizer, but with giant data such as FastText involved there probably is no point. 

## Onehot

Values consistent across multiple entries such as: 

- Community rating 

This allows for the model to understand abstract values without converting them into numerical values. 

## MultiLabelBinarizer

Values sort of consistent but in lists such as: 

- Actors
- Genres
- Studios

These values are all "consistent" but they are in lists rather than strings, so it creates many Onehot values. 

## Ordinal 

Ranked values, such as: 

- Ranking of movies in the collection 

This does a sort of scalar value, but in a way that the model can see and preserve order. 

## Binary

The simplest value, just 0 or 1, for things such as: 

- Favorite
- Is Weekend
- First in collection 

## Finally 

For the model to understand this, it's also converted into a sparse matrix and stacked, which has the unfortunate property of removing column names making it hard to understand. 

```Python
final_sparse_matrix = hstack([
 scaled_numerical,               # Scaled numerical data
 combined_embeddings_sparse,     # Unified FastText embeddings
 role_features,                  # Role count features
 date_features,                  # Date encoding features
 official_rating_encoded,        # One-hot encoded Official Rating
 collection_name_encoded,        # One-hot encoded Collection Name
 genres_encoded,                 # Multi-label binarized Genres
 people_encoded,                 # Multi-label binarized People
 studios_encoded,                # Multi-label binarized Studios
 binary_features_sparse,         # Binary features for first in Collection
 ordinal_features_sparse         # Ordinal Features for Collection Order
])
```
After MLB and Onehot, there are far too many features to be usable, so this can be reduced with TruncatedSVD. 

> This greatly improved F1

# Training

Using a standard 80/20 split, a Random Forest model will train on the dataset since it provides a good balance of accuracy and speed. 

To ensure the best hyperparams, a grid search will try all relevant parameters. 

```Python
# Hyperparameter grid
param_dist = {
    'n_estimators': [200, 500, 1000],
    'max_depth': [10, 20, 50, None],
    'min_samples_split': [1, 2, 8, 16],
    'min_samples_leaf': [1, 2, 4, 8],
    'bootstrap': [True, False],
    'criterion': ['gini', 'entropy']
}

# Model and scoring
rf = RandomForestClassifier(class_weight="balanced", random_state=42)

# RandomizedSearchCV
random_search = RandomizedSearchCV(
    estimator=rf,
    param_distributions=param_dist,
    scoring='f1',
    n_iter=20,
    cv=5,
    verbose=2,
    n_jobs=-1,
)
```

On a 9900K 100 fits took about 30 seconds with TruncatedSVD, without it took about 2 minutes. The optimal model was found to be `200` estimators, `2` minimum sample split, `8` minimum samples per leaf, `20` max depth, with `entropy` and `bootstrap`. It didn't end up being as complex as I was thinking, but that does mean it won't suffer as hard from overfitting (in theory).  

# Pipeline 

With the end goal of this project to be able to use it real world, everything was made with a sklearn Pipeline, allowing for the whole project to be easily called. 

```Python
data_pipeline = Pipeline([
 ("jellyfin_client", JellyfinClient(URL, USER_ID, API_KEY, played_status="IsPlayed")),
 ("data_cleaner", MovieDataCleaner(columns_to_keep)),
 ('feature_engineer', MovieFeatureEngineerWithFastText()),
 ('TSVD', TruncatedSVD(n_components=X_train.shape[0]))
])
```

Theoretically, this also scales well so that is another plus. 

# Results

Immediately going into this, there are some big doubts. For example, why do I like certain movies? Who knows. So the trends are probably nonexistent. Surprisingly though, it trained pretty well... 

| Evaluation Metric | Value | 
| ----------------- | ----- |
| **Accuracy**      | 0.6944|
| **Precision**     | 0.6375|
| **Recall**        | 0.9273| 
| **F1**            | 0.7556| 
| **AUC**           | 0.7966| 


| Confusion Matrix | Predicted False | Predicted True |
|----------------- |-----------------|----------------|
| **Actual False** | 24              | 29             |
| **Actual True**  | 4               | 51             |

For guessing movie recommendations with little to no consistency this ended up being impressive. An F1 of 0.76 means that it isn't quite guessing, it's actually making real decisions. An accuracy of 0.69 means that it also is decent at making those decisions. Looking at the Confusion Matrix, it does very well at predicting the true positives but suffers from false positives. 

Early iterations before I had included collection (Movie series) information suffered much worse in this department. Overall it seems with the added information it predicts pretty well. 

I am a little disappointed though as I was hoping this would have achieved an F1 of 0.8 and it felt like it was so close to crossing that bridge for a while. In the end, I do really think it just comes down to this being random guesses so it even boggles my mind a little that it can form these predictions. 

Aligning with my suspicions are the real recommendations, which only score as high as 0.67 and as low as 0.37 meaning that it really has no strong ideas. 

# Discussion

With FastText for text vectoring the model is a little sluggish on preprocessing, but the actual predictions are fast. This makes me believe it could be integrated into Jellyfin as a plugin that occasionally runs to build recommendations - not like the "You watched this, try this" recommendations, but because you've watched everything you have, this different thing could be cool - something I would find very useful. And since most Jellyfin servers are already pretty beefy, this could easily run in the background. 