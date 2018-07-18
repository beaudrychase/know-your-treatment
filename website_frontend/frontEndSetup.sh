#!/bin/bash

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y htop

# Install node.js
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Configure routing tables to redirect incoming http traffic to port 5000
sudo iptables -N PREROUTING
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-ports 5000

# Import current website
git clone https://gitlab.com/cmibarnwell/idb-project-swe
(cd idb* && git config credential.helper store && git pull)
cp idb*/*front*/update.sh . && chmod +x update.sh

# Run server
./update.sh

