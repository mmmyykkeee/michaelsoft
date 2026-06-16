#!/bin/bash
# Ensure Supabase is running for portfolio-database.michaelsoft.co.ke
cd /home/maina/Projects/michaelsoft

# Check if Supabase is already running
if docker ps --format '{{.Names}}' | grep -q "supabase_db_michaelsoft"; then
  echo "Supabase already running"
else
  echo "Starting Supabase..."
  supabase start
fi

# Keep the process alive and health check
while true; do
  if ! docker ps --format '{{.Names}}' | grep -q "supabase_db_michaelsoft"; then
    echo "Supabase stopped, restarting..."
    supabase start
  fi
  sleep 30
done
