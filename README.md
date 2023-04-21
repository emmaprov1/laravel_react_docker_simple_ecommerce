<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Simple ecommerce with laravel, reactjs and docker

This project is a basic ecommerce application with laravel V10, ReactJs V18 and Docker.

### Features

-   List product
-   Create customers
-   List customers
-   Create orders
-   List of customers order
-   Seeders to create demo product
-   Default super admin user
-   3 user role access (ROLE_ADMIN, ROLE_SUPERADMIN, ROLE_CUSTOMER)

## How to install

-   Git clone this repo
-   Run your docker composer: docker compose up -d
-   Run to install laravel php modules: composer install
-   Now you can kill your container: docker compose down
-   Then use sail normally: ./vendor/bin/sail up
-   Run migration using the this command: docker exec -it [YOUR CONTINER NAME] php artisan migrate
-   docker exec -it [YOUR CONTINER NAME] php artisan db:seed
-   Install node module: npm install
-   Start local node dev server: npm run dev

If you have completed the above succesfuly your project should have start running on http://localhost

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Some useful commands

-   docker compose up -d
-   ./vendor/bin/sail up
-   docker exec -it lifepage_laravel.test_1 php artisan migrate
-   docker exec -it lifepage_laravel.test_1 php artisan db:seed
