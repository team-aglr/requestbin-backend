# Request Bin Backend API

- [Create a new bin](#creating-a-new-bin)
- [Fetch a list of all bins](#getting-a-list-of-all-bins)
- [Delete a bin](#deleting-a-bin)
- [Request collection](#request-collection)
- [Fetch requests received by a bin](#getting-a-list-of-requests-for-a-bin)
- [Fetch a specific request's data](#getting-a-specific-request)

## Bins

### Creating a New Bin

`POST` to `/api/bins/` creates a new bin in PostgreSQL DB and returns a 200 response with the newly created bin as JSON. For example:

```json
{
    "id": 22,
    "uuid": "4543c4ef",
    "created_at": "2023-01-27T08:39:51.429Z"
}
```

### Getting a List of All Bins

`GET` to `/api/bins/` returns a response of status 200 whose body contains a list of all the bins in JSON format. The bin which received the most recently made request will appear first in the list, and the list will progress in chronological order until the bin which received the least recent request. Bins which have yet to be sent any requests will be ordered at the end of the list. For example:

```json
[
    {
        "id": 2,
        "uuid": "60f44419",
        "created_at": "2023-01-26T10:47:21.621Z",
        "most_recent_request_date": "2023-01-26T10:47:21.634Z"
    },
    {
        "id": 3,
        "uuid": "b817dd11",
        "created_at": "2023-01-26T10:47:21.623Z",
        "most_recent_request_date": "2023-01-26T10:47:21.634Z"
    },
    {
        "id": 1,
        "uuid": "4bc247d6",
        "created_at": "2023-01-26T10:47:21.618Z",
        "most_recent_request_date": "2023-01-26T10:47:21.634Z"
    },
    {
        "id": 9,
        "uuid": "d83fde47",
        "created_at": "2023-01-26T10:47:21.631Z",
        "most_recent_request_date": null
    },
    {
        "id": 21,
        "uuid": "83fdaf81",
        "created_at": "2023-01-27T08:35:04.818Z",
        "most_recent_request_date": null
    },
]
```

If no bins have been created, an empty list is returned.

### Deleting a Bin

`DELETE` to `/api/bins/{BIN_ID}` returns a response of 204, and deletes the specified bin. Currently this accepts the integer PK of the bin in question, but we'd like to change it to take the `BIN_UUID` (see [issue #47](https://github.com/team-aglr/requestbin-backend/issues/47)).

If the `BIN_ID` is improperly formatted or does not exist, we also return a response with 204.

## Request Collection

Once a bin has been created, a URL is generated for that bin, which the user can use to subscribe to webhook providers and listen for requests. This URL takes the format `https://host/collect/{BIN_UUID}`. The UUID is randomly generated and provided by the application when it creates a new bin.

## Requests

### Getting a List of Requests for a Bin

`GET` to `/api/bins/{BIN_UUID}/requests` returns a response of 200 whose body contains a list of requests that pertain to the given `BIN_UUID` in JSON format. For example:

```json
[
    {
        "id": 6,
        "http_method": "GET",
        "created_at": "2023-01-26T10:51:32.851Z",
        "uuid": "3d4c85c8"
    },
    {
        "id": 7,
        "http_method": "GET",
        "created_at": "2023-01-26T10:56:20.405Z",
        "uuid": "3d4c85c8"
    }
]
```

If the bin associated with the given `BIN_UUID` has yet to receive any requests, an empty list is returned. If the `BIN_UUID` is improperly formatted or does not exist, a response of 404 is returned.

### Getting a Specific Request

`GET` to `/api/bins/{BIN_UUID}/requests/{REQUEST_ID}` returns a response of 200 whose body contains the details of the specified request object. For example:

```json
{
    "id": 10,
    "http_method": "POST",
    "created_at": "2023-01-27T09:22:16.342Z",
    "bin_id": 1,
    "headers": {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.30.0",
        "accept": "*/*",
        "postman-token": "ba188d98-ac36-4bb9-a92a-ab412a22134a",
        "host": "localhost:3001",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "content-length": "39"
    },
    "body": "{\r\n    \"mesage\": \"Hello to the bin!\"\r\n}"
}
```

If the bin UUID is invalid or does not exist, returns a response with status 404. If the request id does not exist, returns a response with status 404.
