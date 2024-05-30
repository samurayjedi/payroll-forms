<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Events\DocumentCreated;
use App\Http\Controllers\Controller;

class BusinessRegistrationController extends Controller {
  
  const DOCUMENT_TYPE = 'business_registration';

  /**
   * Display the tactical security form view.
   *
   * @return \Inertia\Response
   */
  public function create() {
    return Inertia::render('BusinessRegistrationForm');
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
      // owner
      'owner_name' => 'required|string|max:255',
      'ssn_tin_or_ein' => 'required|string|max:9',
      'owner_address' => 'required|string|max:255',
      'owner_city' => 'required|string|max:255',
      'owner_state' => 'required|string|max:2',
      'owner_zip' => 'required|digits:5',
      'owner_country' => 'required|string|max:2',
      'owner_phone' => 'required|string|max:20',
      'owner_email' => 'required|email',
      // company
      'company_name' => 'required|array',
      'company_name.*' => 'string|max:255',
      'company_dba' => 'required|array',
      'company_dba.*' => 'string|max:255',
      'company_address' => 'required|string|max:255',
      'company_city' => 'required|string|max:255',
      'company_state' => 'required|string|max:2',
      'company_zip' => 'required|digits:5',
      'company_country' => 'required|string|max:2',
      'company_phone' => 'required|string|max:20',
      'company_county' => 'required|string|max:255',
      'state_of_incorporation_or_formation' => 'required|string|max:2',
      'company_activity' => 'required|string|max:30',
      'company_activity_other' => 'required_if:company_activity,==,Other|nullable|string|max:255',
      'company_type' => 'required|string|max:30',
      'company_corporation_more_one_member' => 'required_if:company_type,==,Corporation',
      'company_corporation_members' => 'required_when:company_type,==,Corporation,&&,company_corporation_more_one_member,==,Yes|array|min:1',
      'company_corporation_members.*.name' => 'required_when:company_type,==,Corporation,&&,company_corporation_more_one_member,==,Yes|nullable|string|max:255',
      'company_corporation_members.*.ssn_tin_or_ein' => 'required_when:company_type,==,Corporation,&&,company_corporation_more_one_member,==,Yes|nullable|string|max:255',
      'company_partnership_more_one_member' => 'required_if:company_type,==,Partnership',
      'company_partnership_members' => 'required_when:company_type,==,Partnership,&&,company_partnership_more_one_member,==,Yes|array|min:1',
      'company_partnership_members.*.name' => 'required_when:company_type,==,Partnership,&&,company_partnership_more_one_member,==,Yes|nullable|string|max:255',
      'company_partnership_members.*.ssn_tin_or_ein' => 'required_when:company_type,==,Partnership,&&,company_partnership_more_one_member,==,Yes|nullable|string|max:255',
      'company_more_of_one_member' => 'required_if:company_type,==,Limited Liability Company',
      'company_llc_members' => 'required_when:company_type,==,Limited Liability Company,&&,company_more_of_one_member,==,Yes|array|min:1',
      'company_llc_members.*.name' => 'required_when:company_type,==,Limited Liability Company,&&,company_more_of_one_member,==,Yes|nullable|string|max:255',
      'company_llc_members.*.ssn_tin_or_ein' => 'required_when:company_type,==,Limited Liability Company,&&,company_more_of_one_member,==,Yes|nullable|string|max:255',
      'company_type_other' => 'required_if:company_type,==,Other|nullable|string|max:255',
      'package' => 'required|string|max:30',
      'process_time' => 'required|string|max:30',
      'licenses' => 'array',
      'line_of_merchandise' => 'required|string|max:255',
      'questions' => 'array',
      'which_license' => 'required_if_in:questions,Does the company need a especial license?|nullable|string|max:255',
      'employees' => 'required_if_in:questions,Do you have or plan to have any employee?|nullable|numeric',
      'payment_method' => 'required_if_in:questions,Do you have or plan to have any employee?|string|max:30',
      'completed_by' => 'required|string|max:255',
      'sign_with_docusign' => 'required',
    ]);

    event(new DocumentCreated(request()));
    
    return redirect('dashboard');
  }
}
