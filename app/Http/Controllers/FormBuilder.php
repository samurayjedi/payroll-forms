<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class FormBuilder extends Controller {

  /**
   * Display the Form Builder view.
   *
   * @return \Inertia\Response
   */
  public function create() {
    return Inertia::render('FormBuilder');
  }
}
