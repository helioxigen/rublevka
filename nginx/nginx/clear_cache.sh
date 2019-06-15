#!/usr/bin/env sh

cache_path="/var/cache/nginx/proxy_temp/"
for dir in $(ls $cache_path); do rm -r $cache_path$dir; done
