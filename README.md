# GraphQL-Learn
Hands on projects to get up to speed with GraphQL from the back to the front end.

## Demos
Authentication with json web tokens:
- Client: https://github.com/kunal-mandalia/graphql-client-auth
- Server: https://github.com/kunal-mandalia/graphql-server-auth

## Core Concepts

### Schema
Model of the data that can be fetched through GraphQL server. Defines
- Queries clients can make
- Types of data which can be fetched
- Relationships between types 

#### Type definitions
Built-in scalar types consist of `Int, String, ID, ...`
Custom types are defined:
```
Type Message {
  id: ID!
  content
  author: String!
}
```

#### Query
Server:
```
type Query {
  getMessage(id: Int!): Message
}
```

Client:
```
query {
  getMessage(id: 2) {
    id
    content
    author
  }
}
```

#### Mutation
Server:
```
type Mutation {
  createMessage(input: MessageInput!): Message
}

# input type definition
input MessageInput {
  content
  author
}
```

Client:
```
mutation {
  createMessage(input: {
    content: 'a new message',
    author: 'Kunal'
  })
  # Return Message properties
  {
    id
    author
  }
}
```

### Resolver
Resolve functions define how types and fields in the schema are connected to various backends

```
getMessage: ({id}) => {
    if (!fakeDatabase[id]) {
      # returns { errors: [...], data: ... }
      throw new Error(`Message not found (id: ${id})`)
    }
    return new Message(id, fakeDatabase[id])
  }
```

### Query execution
1. Parse string query into AST (abstract syntax tree)
2. Validate query type, name, args, return type
3. Execute top down the resolve function on fields, waiting for promises to resolve

## Introspection
The types and queries available on a schema
```
query {
  __schema {
    types {
      name
      description
    }
  }
}
```

## Fragments
Reusable fields to help keep queries DRY

## Resources used
- http://graphql.org
- https://www.howtographql.com
- https://www.okgrow.com/posts/graphql-basics
- https://github.com/sogko/graphql-schema-language-cheat-sheet