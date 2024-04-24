<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
//
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Auth\Notifications\ResetPassword;
use App\Mail\EmailVerificationNotification;
use App\Mail\PasswordResetEmail;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(
            fn (object $notifiable, string $url) => (new EmailVerificationNotification($url))
                ->to($notifiable->email)
        );
        ResetPassword::toMailUsing(
            fn (object $notifiable, string $token) => (new PasswordResetEmail($token, $notifiable->email))
                ->to($notifiable->email)
        );
    }
}
