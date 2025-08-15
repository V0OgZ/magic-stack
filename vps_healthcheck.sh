#!/bin/bash

echo "VPS Healthcheck - heroesoftime.online"
echo "======================================="

# Root page
echo -n "/ : "
curl -m 2 -sS --fail-with-body https://heroesoftime.online/ -o /dev/null -w "%{http_code}\n" || echo "FAIL"

# Frontpage
echo -n "/FRONTPAGE/index.html : "
curl -m 2 -sS --fail-with-body https://heroesoftime.online/FRONTPAGE/index.html -o /dev/null -w "%{http_code}\n" || echo "FAIL"

# World Editor
echo -n "/world-editor : "
curl -m 2 -sS --fail-with-body https://heroesoftime.online/world-editor/ -o /dev/null -w "%{http_code}\n" || echo "FAIL"

# Engine health
echo -n "/engine/health : "
curl -m 2 -sS --fail-with-body https://heroesoftime.online/engine/health -o /dev/null -w "%{http_code}\n" || echo "FAIL"

# API health
echo -n "/api/health : "
curl -m 2 -sS --fail-with-body https://heroesoftime.online/api/health -o /dev/null -w "%{http_code}\n" || echo "FAIL"

echo "======================================="
