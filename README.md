# Npm Runtime Search API

This API allows you to search for npm packages and determine if they are compatible with various runtime environments, such as Node, browser, worker, and Deno.

## Installation and Deployment

To use this API, you first need to install the library and deploy it. Follow the steps below to install and deploy the API:

1. Install the library by running:

```bash
yarn install
```

2. Deploy the API by running:

```bash
yarn run deploy
```

After deploying the API, the domain for the API will be displayed in the terminal. Copy this domain to make requests to the API.

## How to use

### Request

Make a GET request to the following endpoint:

```
https://<your-api-domain>/
```

#### Query Parameters

- `q` (required): The name of the npm package you want to search for.
- `page` (optional): The page number you want to fetch. Default is 1. Each page contains 10 results.

### Example

To search for a package named "example-package" and fetch the first page of results, send a GET request to:

```
https://<your-api-domain>/?q=example-package&page=1
```

If you don't provide a `page` parameter, the default value (1) will be used:

```
https://<your-api-domain>/?q=example-package
```


### Response

The API will return a JSON object containing the search results and compatibility information for each package. The response will include the following fields:

- `total`: The total number of results found for the search query.
- `results`: An array of objects, each representing a package and its compatibility with various runtime environments. Each object will include the following fields:
    - `name`: The name of the npm package.
    - `description`: A short description of the package.
    - `version`: The latest version of the package.
    - `date`: The date when the latest version was published.
    - `link`: A link to the package on the npm website.
    - `publisher`: The name of the publisher of the package.
    - `unstable`: A boolean indicating if the package is marked as unstable.
    - `deprecated`: A boolean indicating if the package is marked as deprecated.
    - `runtimes`: An object containing the compatibility information for various runtime environments, with the following fields:
        - `node`: A boolean indicating if the package is compatible with the Node runtime.
        - `browser`: A boolean indicating if the package is compatible with the browser runtime.
        - `worker`: A boolean indicating if the package is compatible with the worker runtime.
        - `deno`: A boolean indicating if the package is compatible with the Deno runtime.
        - `bun`: A boolean indicating if the package is compatible with the Bun runtime.
    - `score`: An object containing the package's score information, with the following fields:
        - `final`: The final score of the package.
        - `detail`: An object containing the detailed score information, with the following fields:
            - `quality`: The quality score of the package.
            - `popularity`: The popularity score of the package.
            - `maintenance`: The maintenance score of the package.

#### Example Response

```json
{
  "total": 488,
  "results": [
    {
      "name": "jose",
      "description": "'JSON Web Almost Everything' - JWA, JWS, JWE, JWT, JWK, JWKS with no dependencies using runtime's native crypto",
      "version": "4.8.1",
      "date": "2022-05-02T08:37:29.120Z",
      "link": "https://www.npmjs.com/package/jose",
      "publisher": "panva",
      "unstable": false,
      "deprecated": false,
      "runtimes": {
        "node": true,
        "browser": true,
        "worker": true,
        "deno": false,
        "bun": false
      },
      "score": {
        "final": 0.8051178829650747,
        "detail": {
          "quality": 0.8464094502755721,
          "popularity": 0.5748429939497233,
          "maintenance": 1
        }
      }
    },
    {
      "name": "ecdsa-sig-formatter",
      "description": "Translate ECDSA signatures between ASN.1/DER and JOSE-style concatenation",
      "version": "1.0.11",
      "date": "2019-01-25T21:32:13.447Z",
      "link": "https://www.npmjs.com/package/ecdsa-sig-formatter",
      "publisher": "d2l-travis-deploy",
      "unstable": false,
      "deprecated": false,
      "runtimes": {
        "node": false,
        "browser": false,
        "worker": false,
        "deno": false,
        "bun": false
      },
      "score": {
        "final": 0.8339114394988127,
        "detail": {
          "quality": 0.9852425540292743,
          "popularity": 0.5382041118068577,
          "maintenance": 0.9999063833075152
        }
      }
    },
    ...
  ]
}
```       
