<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class SessionI18nextLanguageProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $locale = session('locale', 'en');
        $fakerLocale = session('faker_locale', 'en_US');
        config([
            'locale' => $locale,
            'faker_locale' => $fakerLocale,
        ]);
    }
}
