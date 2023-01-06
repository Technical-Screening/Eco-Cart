
# EcoCart - Challenge Part 01 (code)

Senior BE Engineer (NodeJS) Assessment by Boomer




## Tech Stack

Node, Express, Typescript, DynamoDB, Lambda Serverless.


## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
    npm start -> start the app locally with nodemon
    npm run build -> build the app
    npm run buildStart -> build the and and start the app
```


## API Reference

#### Login
Login first to access other end-points


```http
  POST /api/login
```

| Body                                       | Type   | Description       |
| :----------------------------------------- | :----- | ------------------|
|{"username": "admin","password": "password"}| `JSON` | **Required**.     |

it will set the cookie with token. Now you can access the get meals api.

#### Get meals using the main ingredient.

```http
  GET /api/meals
```
| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `key`     | `string` | **Required**. search key to fetch. eg:chicken |

#### Sample Response
[
    {
        "id": "52795",
        "name": "Chicken Handi",
        "instructions": "Take a large pot or wok...",
        "thumbUrl": "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
        "youtubeUrl": "https://www.youtube.com/watch?v=IO0issT0Rmc",
        "ingredients": [
            {
                "ingredient": "Chicken",
                "measurement": "1.2 kg"
            },
            {
                "ingredient": "Onion",
                "measurement": "5 thinly sliced"
            },
        ]
    }
]

