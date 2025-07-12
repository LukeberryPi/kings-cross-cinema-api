import { z } from "zod";
import { movies } from "./movies";

export type Movies = typeof movies;
export type MovieDates = keyof Movies;
export type MovieTimes =
  Movies[MovieDates] extends Record<infer T, any> ? T : never;
export type MovieTitles = Movies[MovieDates][MovieTimes];

export type MovieSchedule = {
  [date in MovieDates]: Partial<Record<MovieTimes, string>>;
};

const movieDatesList = Object.keys(movies) as [MovieDates, ...MovieDates[]];
const allTimes = Array.from(
  new Set(
    Object.values(movies).flatMap(
      (schedule) => Object.keys(schedule) as MovieTimes[],
    ),
  ),
) as [MovieTimes, ...MovieTimes[]];

export const movieDateSchema = z.enum(movieDatesList);
export const movieTimeSchema = z.enum(allTimes);
export const movieTitleSchema = z.string();

export const dayScheduleSchema = z.record(movieTimeSchema, movieTitleSchema);

export const movieScheduleSchema = z.record(movieDateSchema, dayScheduleSchema);

export const movieQuerySchema = z.object({
  date: movieDateSchema.optional(),
  time: movieTimeSchema.optional(),
});

export type FullMoviesResponse = typeof movies;
export type DateMoviesResponse = Movies[MovieDates];
export type TimeFilteredResponse = Partial<
  Record<MovieDates, Partial<Record<MovieTimes, string>>>
>;
export type SingleMovieResponse = {
  date: MovieDates;
  time: MovieTimes;
  movie: string;
};

export const isValidDate = (date: unknown): date is MovieDates => {
  return movieDateSchema.safeParse(date).success;
};

export const isValidTime = (time: unknown): time is MovieTimes => {
  return movieTimeSchema.safeParse(time).success;
};

export const getMoviesAtTime = (time: MovieTimes): TimeFilteredResponse => {
  const result = {} as TimeFilteredResponse;

  for (const [date, schedule] of Object.entries(movies)) {
    const movie = schedule[time];
    if (movie) {
      result[date as MovieDates] = { [time]: movie };
    }
  }

  return result;
};

export const getMovie = (
  date: MovieDates,
  time: MovieTimes,
): string | undefined => {
  return movies[date]?.[time];
};
