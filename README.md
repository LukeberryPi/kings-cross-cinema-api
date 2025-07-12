# 2025 King's Cross Cinema API

Check the movie schedules at 2025 King's Cross Cinema for [Everyman on the Canal at King's Cross Canal](https://www.kingscross.co.uk/event/everyman-on-the-canal).

This is not an official API. Not affiliated with King's Cross Cinema or Everyman on the Canal.

## Running the API

### Using Docker

```bash
docker build -t cinema-api .
docker run -p 8080:8080 cinema-api
```

### Using Bun

```bash
bun install
bun run src/index.ts
```

The API will be available at `http://localhost:8080`

## Endpoints

### Get all movies

```bash
GET /movies
```

**Response:**

```json
{
  "2025-06-30": {
    "12:00": "The Championships Wimbledon",
    "14:30": "The Championships Wimbledon",
    "17:00": "Dirty Dancing",
    "19:30": "Top Gun (1986)"
  },
  "2025-08-14": {
    "12:00": "Shrek",
    "14:30": "The Wizard of Oz",
    "17:00": "Kings Cross Film Choice",
    "19:30": "Top Gun: Maverick"
  }
  // ... more dates
}
```

### Get movies for a specific date

```bash
GET /movies?date=2025-08-15
```

**Response:**

```json
{
  "12:00": "101 Dalmatians",
  "14:30": "Japanese Film Club: Your Name",
  "17:00": "Minute Shorts Presents: Rising + Live Q&A and DJ Set",
  "19:30": "Dune (2021)"
}
```

**Error Response (404):**

```json
{
  "error": "No movies found for this date"
}
```

### Get all movies at a specific time

```bash
GET /movies?time=14:30
```

**Response:**

```json
{
  "2025-06-30": {
    "14:30": "The Championships Wimbledon"
  },
  "2025-08-14": {
    "14:30": "The Wizard of Oz"
  },
  "2025-08-15": {
    "14:30": "Japanese Film Club: Your Name"
  }
  // ... more dates with movies at 14:30
}
```

### Get specific movie at date and time

```bash
GET /movies?date=2025-08-15&time=19:30
```

**Response:**

```json
{
  "date": "2025-08-15",
  "time": "19:30",
  "movie": "Dune (2021)"
}
```

**Error Response (404):**

```json
{
  "error": "No movie found at this date and time"
}
```

## Available Dates

The dates must be in YYYY-MM-DD format.

- 2025-06-30
- 2025-07-01
- 2025-07-02
- ...
- 2025-08-16
- 2025-08-17

## Available Times

The dates must be in hh:MM format.

- 12:00
- 14:30
- 17:00
- 19:30
