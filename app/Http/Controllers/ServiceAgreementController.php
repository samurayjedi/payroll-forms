<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Events\DocumentCreated;
use Illuminate\Support\Facades\Redirect;

class ServiceAgreementController extends Controller {
    public function create() {
        return Inertia::render('ServiceAgreement');
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
      'company_email' => 'required|email',
      'company_name' => 'required|string|max:255',
      'company_dba' => 'required|string|max:255',
      'country' => 'required|string|max:2',
      'company_phone' => 'required|string|max:20',
      'company_state' => 'required|string|max:2',
      'company_city' => 'required|string|max:255',
      'company_zip' => 'required|digits:5',
      'company_address_1' => 'required|string|max:255',
      'company_address_2' => 'required|string|max:255',
      'state_id' => 'required|digits_between:8,10',
      'tin' => 'required|digits:9',
      'bank_name' => 'required|string|max:255',
      'routing' => 'required|digits:9',
      'account' => 'required|digits_between:10,12',
      'ein' => 'required|digits:9',
      'fee' => 'required|numeric',
      'fee_date' => 'required|numeric',
      'services' => 'required|array|min:1',
      'company_type' => 'required|string|max:30',
      'company_type_other' => 'required_if:company_type,==,Other', // |string|max:20
      'customer_email' => 'required|email',
      'customer_name' => 'required|string|max:255',
      'sales_rep_email' => 'required|email',
      'sales_rep_name' => 'required|string|max:255',
      'sign_with_docusign' => 'required',
    ]);

    event(new DocumentCreated(request()));
    
    return redirect('dashboard')->with('status', __('I love wisadel!!!!!'));
  }
}
