#!/usr/bin/env bash

# go to node_modules
mkdir -p node_modules
cd node_modules

# remove gutenberg if it already exists
rm -rf gutenberg

# clone gutenberg repo to node_modules
git clone https://github.com/WordPress/gutenberg.git

cd gutenberg

# checkout to version we want
git checkout tags/v4.0.0

# remove git references
# GUTENBERG HAS A SUBMODULE NOW
# rm -rf .git

# install gutenberg dependencies
npm i
