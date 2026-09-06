#!/bin/bash

# this file is basically just for the banner.

mode="dev"
title="
> $(date)
> node $(node -v) and npm v$(npm -v) on $(uname)
> Starting Application ...                                                
                                 ▄▄    ▄▄          ▄▄ 
                                 ██    ██          ██ 
▄█▀▀▀ ▄████ ████▄  ▀▀█▄ ███▄███▄ ████▄ ██ ▄█▀█▄ ▄████ 
▀███▄ ██    ██ ▀▀ ▄█▀██ ██ ██ ██ ██ ██ ██ ██▄█▀ ██ ██ 
▄▄▄█▀ ▀████ ██    ▀█▄██ ██ ██ ██ ████▀ ██ ▀█▄▄▄ ▀████ 
                                                      
                                                      "

echo "$title"

if [[ $1 == "$mode" ]]; then

  echo "> $mode mode"

  npm run register && \
  npm run dev

else
  echo "> production mode"

  npm run start

fi


