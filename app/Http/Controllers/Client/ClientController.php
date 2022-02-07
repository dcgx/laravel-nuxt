<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Get the Client view.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        $path = public_path('_nuxt/index.html');

        abort_unless(file_exists($path), 400, 'Make sure to run npm run build!');

        return file_get_contents($path);
    }
}
