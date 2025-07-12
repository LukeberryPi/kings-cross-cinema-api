FROM oven/bun:1

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN bun install

# Expose port
EXPOSE 8080

# Run the app
CMD ["bun", "run", "src/index.ts"]