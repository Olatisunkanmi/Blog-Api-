# Pizza App

This is an api for a pizza app

---

## Requirements

1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user) ✅
2. A user should be able to sign up and sign in into the blog app ✅
3. Use JWT as authentication strategy and expire the token after 1 hour✅
4. A blog can be in two states; draft and published ✅
5. Logged in and not logged in users should be able to get a list of published blogs created✅
6. Logged in and not logged in users should be able to to get a published blog ✅
7. Logged in users should be able to create a blog. ✅
8. When a blog is created, it is in draft state ✅
9. The owner of the blog should be able to update the state of the blog to published ✅
10. The owner of a blog should be able to edit the blog in draft or published state ✅
11. The owner of the blog should be able to delete the blog in draft or published state ✅
12. The owner of the blog should be able to get a list of their blogs. ✅
13. The endpoint should be paginated
14. It should be filterable by state
15. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body. ✅
16. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, default it to 20 blogs per page.
17. Test application

---

## Setup

- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`

---

## Base URL

- https://sore-tan-seal-wrap.cyclic.app/api/v1/

## Models

---

### User

| field            | data_type | constraints |
| ---------------- | --------- | ----------- |
| id               | string    | required    |
| username         | string    | required    |
| firstname        | string    | optional    |
| lastname         | string    | optional    |
| email            | string    | optional    |
| password         | string    | required    |
| password_confirm | string    | required    |

### Post

| field       | data_type | constraints                            |
| ----------- | --------- | -------------------------------------- |
| id          | string    | required                               |
| title       | string    | required                               |
| description | string    | required                               |
| author      | string    | required                               |
| state       | number    | required, enum: ['draft', 'published'] |
| readCount   | number    | required, : default : 0                |
| readingTime | number    | required, : default : 0                |
| tags        | string    | required, : default : 0                |
| item.price  | number    | required                               |

| created_at | date | required |

## APIs

---

### Signup User

- Route: /users/signup
- Method: POST
- Body:

```
{
    "lastName": "lazy User",
    "firstName" : "lazy Admin",
    "email" : "lazy@gmail.com",
    "password" : "lazy",
    "password_confirm" : "lazy",
    "username" : "lazy"
}
```

- Responses

Success

```
{
    "status": "success",
    "data": {
        "username": "lazy",
        "firstName": "lazy Admin",
        "lastName": "lazy User",
        "email": "lazy@gmail.com",
        "password": "$2a$12$yF0a1GQ0aXIsjgPB.EKqEOCte3XqTnCK2P0HLVRnLP2nVKwwTuqXS",
        "password_confirm": "$2a$12$DBIWWKb7UAgEYM5UnxxYyu4wHtaFi4Z5i8BdEsDpYtUiLUPEzq2mO",
        "profilePicture": "",
        "_id": "6365c066f594e393a8591a36",
        "createdAt": "2022-11-05T01:46:14.158Z",
        "updatedAt": "2022-11-05T01:46:14.158Z",
        "__v": 0
    }
}
```

---

### Login User

- Route: /users/login
- Method: POST
- Body:

```
{
    "email" : "lazy@gmail.com",
    "password" : "lazy"
}
```

- Responses

Success

```
{
    "status": "success",
    "TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjc1OGMyZjM3NGYyYTJlMTI0ZTBiOCIsImlhdCI6MTY2Nzc1MjgzMiwiZXhwIjoxNjY3NzU2NDMyfQ.tSmcnRUpu7rxV-xPGyPU8ORU17o1XBdFAZV3_j2GDY4",
    "data": {
        "_id": "636758c2f374f2a2e124e0b8",
        "password": "$2a$12$rYIFXixVx4tKVdxjUmxYSe7usx4iHQB4vFGsqPJhYfYZRnOCqhl9W"
    }
}
```

---

### DELETE USER

- Route: /posts/:id
- Method: DELETE
- Header

  - Authorization: Bearer {token}

- Responses

Success

```
    {
    "status": "success",
    "data": {}
}

```

---

### Create Post

- Route: /posts/
- Method: POST
- Header
  - Authorization: Bearer {token}
- Body:

```
{
   "title": "Js is better",
   "desc" : "Old  description",
    "body" : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribr-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribr-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less ",
    "tags" : "read, write"

}
```

- Responses

Success

```
{
    "status": "success",
    "data": {
        "title": "Js is better",
        "description": "Old  description",
        "body": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribr-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribr-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less ",
        "author": "user",
        "state": "draft",
        "readCount": 0,
        "readingTime": 2,
        "tags": [
            "read, write"
        ],
        "_id": "6368299d05fb6d01bc39459f",
        "__v": 0
    }
}
```

---

### Get Post

- Route: /posts/:id
- Method: GET
- Header
  - Authorization: Bearer {token}
- Responses

Success

```
{
    "status": "success",
    "data": {
        "_id": "63675bc358ecc015c6efd868",
        "title": " Hello world",
        "description": "Old  description",
        "body": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a has a more-or-less normal distribr-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribr-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less ",
        "author": "user",
        "state": "published",
        "readCount": 0,
        "readingTime": 3,
        "tags": [
            "read, write"
        ]
    }
}
```

### Publish Post

- Route: /posts/publish/:id
- Method: POST
- Header
  - Authorization: Bearer {token}
- Responses

Success

```
{
    "status": "success",
    "data": {
        "_id": "63675bc358ecc015c6efd868",
        "title": " Hello world",
        "description": "Old  description",
        "body": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a has a more-or-less normal distribr-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribr-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less ",
        "author": "user",
        "state": "published",
        "readCount": 0,
        "readingTime": 3,
        "tags": [
            "read, write"
        ]
    }
}
```

---

### Get Posts

- Route: /posts/
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Query params:
  - page (default: 1)
  - per_page (default: 20)
  - sort (default: -readCount, -readingTime, -created_at)
  - sort (options: asc | desc, default: desc)
  - state (default : published)
- Responses

Success

```
[
    "Lists of all Posts in the Database"
]
```

---

### Get all Posts by Authenticated User

- Route: /posts/
- Method: GET
- Header:
  - Authorization: Bearer {token}
  - Query params:
    - page (default: 1)
  - per_page (default: 20)
  - sort (default: -readCount, -readingTime, -created_at)
  - order (options: asc | desc, default: desc)
- author ( default : Username )

- Responses

Success
...

### Update Post Content

- Route: /posts/:id
- Method: POST
- Header:

  - Authorization: Bearer {token}

  Body

  ```
  {
    "title" : "A New Title",
    "body": "Hello again to the new good"
  }
  ```

-Response

Success

```
{
    "status": "success",
    "data": {
        "_id": "63675bd158ecc015c6efd86b",
        "title": "A New Title",
        "description": "Old  description",
        "body": "Hello again to the new good",
        "author": "user",
        "state": "draft",
        "readCount": 0,
        "readingTime": 1,
        "tags": [
            "read, write"
        ]
    }
}
```

### DELETE A POST

- Route: /posts/:id
- Method: POST
- Header:
  - Authorization: Bearer {token}

-Response

Success

```
{
    "status": "success",
    "data": {}
}
```

## Lesson Lerned

- Steep understanding of OOP in NodeJS
  Database Modelling
  Database Management
  Debugging
  User Authentication
  Documentation
  User Authorization
  Proper Construction of Routes
