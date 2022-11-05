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

- somehostsite.com

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

- Route: /api/v1/signup
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

- Route: /api/v1/login
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
    "data": {
        "_id": "6360f290cdaa378f2c9090e4",
        "password": "$2a$12$K.nq8E2.7NWNzoqXlrK/yOKHNwisxQR9sI8sM/9a8Xzm9nqoxqCCe"
    }
}
```

---

### Create Order

- Route: /api/v2/posts/
- Method: POST
- Header
  - Authorization: Bearer {token}
- Body:

```
{
   "title": "What are we ?",
    "desc" : ".shsu uueuuc ueceb Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur  fugiat, temporibus enim commodi iusto libero magni deleniti quod quam  consequuntur! Commodi minima excepturi repudiandae velit hic maxime"

}
```

- Responses

Success

```
{
    "status": "success",
    "data": {
        "title": "What are we ?",
        "description": ".shsu uueuuc ueceb Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur  fugiat, temporibus enim commodi iusto libero magni deleniti quod quam  consequuntur! Commodi minima excepturi repudiandae velit hic maxime",
        "author": "lazy@gmail.com",
        "state": "draft",
        "readCount": 0,
        "readingTime": 0,
        "tags": [],
        "_id": "6365fdee7803b829990c2894",
        "__v": 0
    }
}
```

---

### Get Order

- Route: /orders/:id
- Method: GET
- Header
  - Authorization: Bearer {token}
- Responses

Success

```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

---

### Get Orders

- Route: /orders
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Query params:
  - page (default: 1)
  - per_page (default: 10)
  - order_by (default: created_at)
  - order (options: asc | desc, default: desc)
  - state
  - created_at
- Responses

Success

```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

---

...

## Contributor

- Daniel Adesoji
