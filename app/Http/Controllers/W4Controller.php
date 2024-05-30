<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Events\DocumentCreated;

class W4Controller extends Controller {

  const DOCUMENT_TYPE = 'w4';

  /**
   * Display the w4 form view.
   *
   * @return \Inertia\Response
   */
  public function create() {
    return Inertia::render('W4');
  }
  
  /**
   * Process form and fill PDF with the info.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\RedirectResponse
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function process() {
    request()->validate([
      'first_name_and_middle_initial' => 'required|string|max:255',
      'last_name' => 'required|string|max:255',
      'address' => 'required|string|max:255',
      'unit_apt_suite' => 'required|string|max:255',
      'city_or_town' => 'required|string|max:255',
      'state' => 'required|string|max:2',
      'zip' => 'required|digits:5',
      'civil_state' => 'required|string|max:50',
      'social_security_number' => 'required|digits:9',
      'email' => 'required|email',
      'multiple_jobs' => 'required|string|max:4',
      'two_jobs_with_similar_pay' => 'required',
      'have_dependents' => 'required|string|max:3',
      'number_of_children' => 'required_if:have_dependents,==,Yes',
      'number_of_other_dependents' => 'required_if:have_dependents,==,Yes',
      'other_income' => 'numeric',
      'deductions' => 'numeric',
      'extra_withholding' => 'numeric',
      //
      'phone' => 'required|string|max:20',
      'bank_name' => 'required_if:payment_method,==,Direct Deposit',
      'routing' => 'required_if:payment_method,==,Direct Deposit',
      'account' => 'required_if:payment_method,==,Direct Deposit',
      'sign_with_docusign' => 'required',
      //
      'company_name' => 'required|string|max:255',
      'job_position' => 'required|string|max:255',
      'hired_date' => 'required|date',
      'rate_of_pay' => 'numeric',
      'manager_email' => 'required|email',
      'manager_full_name' => 'required|string',
    ]);
    
    event(new DocumentCreated(request()));
    
    return redirect('dashboard');
  }
}
