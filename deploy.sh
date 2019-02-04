#!/usr/bin/env sh

hugo
gcloud config set project netdata-storage 
gsutil rsync -R public gs://blog.netdata.cloud
