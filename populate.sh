#!/bin/bash

read -ra countries < <(jq -r 'keys | @tsv' <src/lib/countries.json)

# curl -s localhost:5173/populate > /dev/null
# echo "Populated global"

function populate() {
    curl -s "localhost:5173/$1/populate" > /dev/null
    echo "Populated $1"
}

export -f populate
xargs -I {} -P 4 -n 1 bash -c "populate {}" < <(printf "%s\n" "${countries[@]}")
