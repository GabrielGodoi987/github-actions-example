#bin/bash

# Test database connection
echo "Testing database connection..."
if ! nc -z localhost 5432; then
  echo "Database is not running. Please start the database and try again."
  exit 1
fi

# run migrations - drizzleORM
echo "Running database migrations..."
npx drizzle-kit migrate:latest --schema src/db/schema.ts

