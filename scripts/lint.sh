#!/bin/bash
set -e
set -v

cd backend
python -m flake8 --config=.flake8