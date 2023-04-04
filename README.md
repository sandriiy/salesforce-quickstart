## Custom Lightning Web Components: Salesforce Spring’23

https://www.salesforce.com//form/signup/prerelease-spring23/
### GraphQL API

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more. GraphQL enables what is known as “declarative data fetching”. In this method, clients can specify the exact data they need from an API.
```
{
  hero {
    name
    height
  }
}
```
```
{
  "hero": {
      "name": "Luke Skywalker",
      "height": 1.72
  }
}
```

- ***How does GraphQL querying work?***

GraphQL enables what is known as “declarative data fetching”. In this method, clients can specify the exact data they need from an API.
For example, with REST, an API endpoint may have existed in an application when there was a limited amount of data to be extracted. Since REST frequently fetches too much data from an endpoint, it can become difficult to ensure that the frontend is receiving the correct data set. With GraphQL on the other hand, the exact data set is declared, removing any doubt that the correct information is present.

- ***REST can do much of what GraphQL does***

It’s important to keep in mind that GraphQL is an alternative to REST for developing APIs, not a replacement.

The main benefit of using GraphQL is the ability to send a query that specifies only the information you need and receiving exactly that. However, you can achieve this same effect using REST, by passing the name of the fields you want to use in the URL, then implementing the parsing and returning logic yourself:
```
GET /books/1492030716?fields=title,pageCount
```

- ***Benefits of GraphQL***

GraphQL can speed up development and automation in comparison to REST. GraphQL queries themselves are not faster than REST queries, but because you can pick the fields you want to query, GraphQL requests will always be smaller and more efficient.

Since REST returns all of the data from an endpoint once queries are made, there are instances when the API request limit is hit. When this happens, no data is returned from the query request, resulting in a paused application and potential software downtime. GraphQL, on the other hand, doesn’t encounter call limits as quickly since it uses fewer queries and only returns what the client asked for specifically.

As previously mentioned, it’s common for REST to return too much data following a query request. By only returning the specified data set, developers can spend less time going through excess data to find the result they were looking for with GraphQL, and more time on things that move the needle.

### Template Refs API & Improved Conditional Directives

```
lightningDocumentModel
```