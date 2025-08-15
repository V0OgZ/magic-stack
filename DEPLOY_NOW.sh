#!/bin/bash
# Deploy using Vincent's key from Desktop
rsync -avz -e "ssh -i ~/Desktop/HOT_VPS_KEY" FRONTPAGE/index.html hot@heroesoftime.online:/opt/hot/app/FRONTPAGE/
