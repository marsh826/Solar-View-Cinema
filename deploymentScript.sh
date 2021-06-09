# Solar View Cinema Web App Deployment Script

!/bin/bash

# create sql
mysql -u root -e 'drop database solarviewcinema'
mysql -u root -e 'create database solarviewcinema'
mysql -u root solarviewcinema < api/sql/solarviewcinema.sql

# start server
#php -S localhost:8080
php -S localhost:8888


