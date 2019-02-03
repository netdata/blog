#!/usr/bin/env sh

hugo
gcloud config set project netdata-site
gsutil rsync -R public gs://uat.netdata.cloud
