#!/bin/bash

./thumbnail-generator-fam.sh

sleep 20

node family_vids_util.js

sleep 5

./famvideos.sh
