# Example Server for GraphQL

Simple example of GraphQL Server with authentication, using Node.js with GraphQL Yoga and Prisma. 

## Dependencies

* [GraphQL Yoga](https://github.com/prisma-labs/graphql-yoga)
* [Prisma](https://www.prisma.io/)
* [JWT](https://github.com/auth0/node-jsonwebtoken#readme)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)

## Installation

1. Install all dependencies

    ```bash
    $ yarn install
    ```

1. Add Prisma configuration

    ```bash
    $ cp prisma/prisma.dist.yml prisma/prisma.yml
    ```

1. Setup Prisma

    ```bash
    $ yarn prisma:deploy
    ```
   
   Choose the "Demo server + MySQL Database" and follow explications

1. Generate Prisma Client

    ```bash
    $ yarn prisma:generate
    ```

## Run server

```bash
$ yarn start
```

Now you can go on http://localhost:4000/

Enjoy !

## Source

* Thanks to [HowToGraphQL](https://www.howtographql.com/)
