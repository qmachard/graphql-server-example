# GraphQL Tutorial

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
