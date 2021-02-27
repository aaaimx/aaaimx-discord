#!/bin/bash

cd ~/production/aaaimx/aaaimx-discord
sed -i "s/bot-aaimx:.*/bot-aaimx:$1/g" docker-compose.override.yaml
docker-compose up -d
yes | docker system prune -a