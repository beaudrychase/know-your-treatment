#!/bin/bash

cd idb*/*front*
git stash
git pull origin master

killall node
npm run build
sudo npm install -g serve
serve -s build > stdout.txt 2> stderr.txt &

