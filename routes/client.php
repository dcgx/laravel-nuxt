
<?php

use App\Http\Controllers\Client\ClientController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
|
|
*/

Route::get('{path}', ClientController::class)->where('path', '(.*)');