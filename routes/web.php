<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FormSetupController;
use App\Http\Controllers\FormBuilder;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'password.confirm'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    /** Form/Setup */
    Route::get('/form-setup', [
        FormSetupController::class,
        'create',
    ])->name('form-setup');

    Route::post('/form-setup', [
        FormSetupController::class,
        'process',
    ])->name('form-setup.process');
    /** Form Builder */
    Route::get('/form-builder', [
        FormBuilder::class,
        'create',
    ])->name('form-builder');
});

Route::get('/locales/{language}/translation.json', [LocaleController::class, 'handle']);
Route::get('/locales/change/{language}', [LocaleController::class, 'changeLanguage'])->name('locale.change');

require __DIR__.'/auth.php';
