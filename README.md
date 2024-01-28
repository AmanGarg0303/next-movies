It is a movies website where you have to login with google first, then you will redirected to the home page, which list of movies. The admin account can add a movie too.

The postgres and redis database are Containerized using docker.

We are using zod to check the addMovie schema.

The movies are cached to reduce the response time. Whenever a new movie is added then the cache is cleared.

.env includes:

> DATABASE_URL=

> AUTH_SECRET=

> GOOGLE_CLIENT_ID=

> GOOGLE_CLIENT_SECRET=

> NEXT_PUBLIC_APP_URL="http://localhost:3000"

After adding these to .env file, run `npm run dev` in terminal.
