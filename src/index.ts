import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { movies } from "./movies";
import {
  movieQuerySchema,
  getMoviesAtTime,
  getMovie,
  type FullMoviesResponse,
  type DateMoviesResponse,
  type TimeFilteredResponse,
  type SingleMovieResponse,
} from "./lib";

const app = new Hono();

app.get("/", (c) =>
  c.text(
    "Welcome to the 2025 King's Cross Cinema API. Check out how to use the endpoints at https://github.com/LukeberryPi/kings-cross-cinema-api. This API is not official or affiliated with King's Cross Cinema or Everyman on the Canal.",
  ),
);

app.get("/movies", zValidator("query", movieQuerySchema), async (c) => {
  const { date, time } = c.req.valid("query");

  if (!date && !time) {
    return c.json<FullMoviesResponse>(movies);
  }

  if (date && !time) {
    const dateSchedule = movies[date];
    return c.json<DateMoviesResponse>(dateSchedule);
  }

  if (!date && time) {
    const moviesAtTime = getMoviesAtTime(time);
    return c.json<TimeFilteredResponse>(moviesAtTime);
  }

  if (date && time) {
    const movie = getMovie(date, time);
    if (movie) {
      const response: SingleMovieResponse = { date, time, movie };
      return c.json<SingleMovieResponse>(response);
    }
    return c.json({ error: "No movie found at this date and time" }, 404);
  }
});

// defaults to 3000 == bad
export default {
  port: process.env.PORT || 8080,
  fetch: app.fetch,
};
