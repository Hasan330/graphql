# Sample Mutation:
```
mutation {
  post(
    url: "www.prisma.io"
    description: "Prisma replaces traditional ORMs"
  ) {
    id
  }
}
```

# Sample query:
```
query{
  feed{
    id
    description
    url
  }
}
```