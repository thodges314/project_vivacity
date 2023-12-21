#!/bin/bash

set -o allexport && source ./.env && set +o allexport

export PGPASSWORD=$POSTGRES_PASSWORD

database=$POSTGRES_DB

echo "Configuring database $POSTGRES_DB"

dropdb -U $POSTGRES_USER $POSTGRES_DB
createdb -U $POSTGRES_USER $POSTGRES_DB

psql -U $POSTGRES_USER $POSTGRES_DB < ./bin/sql/jobs.sql

echo "$POSTGRES_DB configured"

exit 0