# GraphQL-Learn
Hands on projects to get up to speed with GraphQL from the back to the front end.

## Resources used
- http://graphql.org
- https://www.howtographql.com

## Core Concepts

### Schema
Model of the data that can be fetched through GraphQL server. Defines
- Queries clients can make
- Types of data which can be fetched
- Relationships between types 

### Resolver
Resolve functions define how types and fields in the schema are connected to various backends

### Query execution
1. Parse string query into AST (abstract syntax tree)
2. Validate query type, name, args, return type
3. Execute top down the resolve function on fields, waiting for promises to resolve
