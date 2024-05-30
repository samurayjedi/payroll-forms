<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Events\DocumentCreated;
use App\Http\Controllers\Controller;

class W9Controller extends Controller {
  
  const DOCUMENT_TYPE = 'w9';
  

  /**
   * Display the w4 form view.
   *
   * @return \Inertia\Response
   */
  public function create() {
    return Inertia::render('W9');
  }
  
  /**
   * Process form and fill PDF with the info.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\RedirectResponse
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function process(Request $request) {
    $request->validate([
      'name' => 'required|string|max:255',
      'business_name' => 'required|string|max:255',
      'federal_tax_classification' => 'required|string|max:50',
      'limited_liability_company_clasification' => 'required_if:federal_tax_classification,==,Limited liability company',
      'other_federal_classification' => 'required_if:federal_tax_classification,==,Other',
      // 'exempt_payee_code' => 'numeric',
      // 'exemption_from_fatca_reporting_code' => 'numeric',
      'country' => 'required|string|max:2',
      'phone' => 'required|string|max:20',
      'address' => 'required|string|max:255',
      'unit_apt_suite' => 'required|string|max:255',
      'city_or_town' => 'required|string|max:255',
      'state' => 'required|string|max:2',
      'zip' => 'required|string|max:5',
      'list_account_number' => 'required|string|max:255',
      // 'requesters_name' => 'string|max:255',
      // 'requesters_address' => 'string|max:255',
      'ssn_or_ein' => 'required|string|max:3',
      'ssn_ein' => 'required|digits:9',
      'email' => 'required|email',
      //
      'bank_name' => 'required_if:payment_method,==,Direct Deposit',
      'routing' => 'required_if:payment_method,==,Direct Deposit',
      'account' => 'required_if:payment_method,==,Direct Deposit',
    ]);
    
    event(new DocumentCreated(request()));
    
    return redirect('dashboard');
  }
}
