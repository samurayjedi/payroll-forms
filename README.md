## About

This project intend show the functionality of the samurayjedi/laravel-docusign package, uses laravel (obviously :p) for backend, frontend with react, @emotion, @mui, etc, the bundler is webpack, contains severals forms that, once filled out, the data is passed to a document in format pdf and used for fill fields in it, later, the pdf is flattened and sended to docusign if the check 'Fill with docusign is enabled', otherwise is sended to email.

## How to use it

Create two directories, ~/storage/app/public/tmp and ~/storage/app/docusign, into '~/storage/app/docusign' put your private.key file (read samurayjedi/laravel-docusign readme to find how to get it), finally, create your .env file, configure mysql ENV variables, and put your docusign api keys into (same, read samurayjedi/laravel-docusign readme :D), finally, run:

```bash
composer install
npm install
php artisan storage:link
php artisan migrate
```

Its done, create your user in the app and start to test the forms.

## Examples




