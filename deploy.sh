#!/bin/bash

cd ~/production/frontend
sed -i "s/bot-aaimx:.*/bot-aaimx:$1/g" docker-compose.override.yaml
docker-compose up -d
yes | docker system prune -a