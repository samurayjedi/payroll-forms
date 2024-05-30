<?php
Route::middleware(['web', 'auth', 'auth.docusign'])->group(function () {
    
    Route::get('/dashboard/service-agreement', [
        App\Http\Controllers\ServiceAgreementController::class,
        'create',
    ])->name('service-agreement');

    Route::post('/dashboard/service-agreement', [
        App\Http\Controllers\ServiceAgreementController::class,
        'process',
    ])->name('service-agreement.process');

    Route::get('/dashboard/business-registration-form', [
        App\Http\Controllers\BusinessRegistrationController::class,
        'create',
    ])->name('business-registration-form');

    Route::post('/dashboard/business-registration-form', [
        App\Http\Controllers\BusinessRegistrationController::class,
        'process',
    ])->name('business-registration-form.process');

    Route::get('/dashboard/w4', [
        App\Http\Controllers\W4Controller::class,
        'create',
    ])->name('w4');
    Route::post('/dashboard/w4', [
        App\Http\Controllers\W4Controller::class,
        'process',
    ])->name('w4.process');
    
    Route::get('/dashboard/w9', [
        App\Http\Controllers\W9Controller::class,
        'create',
    ])->name('w9');
    Route::post('/dashboard/w9', [
        App\Http\Controllers\W9Controller::class,
        'process',
    ])->name('w9.process');

});
