#!/bin/sh
npm install

sudo cp tweetfetcher.service /etc/systemd/system/tweetfetcher.service
sudo systemctl daemon-reload
sudo systemctl enable tweetfetcher
sudo systemctl start tweetfetcher
sh ./start.sh