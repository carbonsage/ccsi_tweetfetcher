#!/bin/sh
npm install

sudo cp twitfetcher.service /etc/systemd/system/twitfetcher.service
sudo systemctl daemon-reload
sudo systemctl enable twitfetcher
sudo systemctl start twitfetcher
sh ./start.sh