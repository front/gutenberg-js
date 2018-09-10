#!/usr/bin/env bash

# go to node_modules
mkdir -p node_modules
cd node_modules

# remove gutenberg if it already exists
rm -rf gutenberg

# clone gutenberg repo to node_modules
git clone git@github.com:WordPress/gutenberg.git

cd gutenberg

# checkout to version we want
git checkout tags/v3.7.0

# remobe git references
rm -rf .git

# install gutenberg dependencies
npm i
