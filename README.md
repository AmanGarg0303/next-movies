I'm using `docker` to run `postgres` and `redis`.

Using `prisma ORM` for requests.

Using `zod` for validations.

Using `tailwind` and `shadcn-ui` for styling.

It is a movies website where you have to `login with google` first to see the list of movies. The home page has `infinite scroll` enabled so that we only fetch desired movies and then they are cached using `redis` to reduce response time. Homepage also has categories list.

The explore page has a `react-terminal` where we can play with some commands.

The admin has the ability to add a new movie or category. Whenever a new movie or category is added, the redis cache is cleared. Admin has a `paginated` list of categories, movies, users.

The admin routes are also protected using the `middleware.ts` file.

.env includes:

> DATABASE_URL=

> AUTH_SECRET=

> GOOGLE_CLIENT_ID=

> GOOGLE_CLIENT_SECRET=

> NEXT_PUBLIC_APP_URL="http://localhost:3000"

After adding these to .env file, run `npm run dev` in terminal.
