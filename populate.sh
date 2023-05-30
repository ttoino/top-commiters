#!/bin/bash

read -ra countries < <(jq -r 'keys | @tsv' </app/countries.json)

function populate() {
    curl -s "$HOST:$PORT/$1/populate?key=$POPULATE_KEY" >/dev/null
    echo "Populated $1"
}

export -f populate
xargs -I {} -P 16 -n 1 bash -c "populate {}" < <(printf "%s\n" "${countries[@]}")
