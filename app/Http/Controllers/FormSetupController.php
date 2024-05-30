<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Lib\FormSetupPdfBuilder;
use App\Events\DocumentCreated;

/**
 * Description of FormSetupController
 *
 * @author samurayjedi
 */
class FormSetupController extends Controller {
  /**
   * Display the form/setup view.
   *
   * @return \Inertia\Response
   */
  public function create() {
    return Inertia::render('Setup');
  }
  
  /**
   * Process form and generate PDF with the info.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\RedirectResponse
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function process(Request $request) {
    /* Validations */
    $request->validate([
      'company_name' => 'required|string|max:255',
      'company_type' => 'required',
      'company_type_other' => 'required_if:company_type,==,Other',
      'taxes_company_type' => 'required|string|max:255',
      'taxes_company_activity' => 'required|string|max:255',
      'ein_file' => 'required|nullable|array',
      'ein_file.*' => 'mimes:pdf,jpg,bmp,png',
      'state_registration_file' => 'required|nullable|array',
      'state_registration_file.*' => 'mimes:pdf,jpg,bmp,png',
      // Payroll Setup
      'want_payroll' => 'required',
      'kind_of_document' => 'required_if:want_payroll,==,Yes',
      'payroll_frequencies' => 'required_if:want_payroll,==,Yes',
      'report_methods' => 'required_if:want_payroll,==,Yes',
      'kind_of_payments' => 'required_if:want_payroll,==,Yes',
      // 'first_check_date' => 'required_if:want_payroll,==,Yes|date',
      'preferred_day_to_process' => 'required_if:want_payroll,==,Yes',
      'preferred_pickup_method' => 'required_if:want_payroll,==,Yes',
      // 'pickup_day' => 'required_if:want_payroll,==,Yes|required_if:preferred_pickup_method,==,Pick up',
      'report_delivery_method' => 'required_if:want_payroll,==,Yes',
      'employees' => 'required_if:want_payroll,==,Yes', // numeric
      'employees_has_deductions' => 'required_if:want_payroll,==,Yes',
      'employess_deductions' => 'required_when:want_payroll,==,Yes,&&,employees_has_deductions,==,Yes',
      // 'tax_impound_interval' => 'required_if:want_payroll,==,Yes|required_if:employees_has_deductions,==,Yes',
      // 'prefer_day_to_be_charged_from_bank' => 'required_if:want_payroll,==,Yes|required_if:employees_has_deductions,==,Yes',
      // 'period_start_date' => 'required_if:want_payroll,==,Yes|date',
      // 'period_end_date' => 'required_if:want_payroll,==,Yes|date|after:period_start_date',
      'has_divisions' => 'required_if:want_payroll,==,Yes',
      'divisions' => 'required_when:want_payroll,==,Yes,&&,has_divisions,==,Yes',
      // 'payments_separated_by_divisions' => 'required_if:want_payroll,==,Yes|required_if:has_divisions,==,Yes',
      'has_departaments' => 'required_if:want_payroll,==,Yes',
      'departaments' => 'required_when:want_payroll,==,Yes,&&,has_departaments,==,Yes',
      'employees_by_charges' => 'required_if:want_payroll,==,Yes',
      'employees_charges' => 'required_when:want_payroll,==,Yes,&&,employees_by_charges,==,Yes',
      // Previous Payroll
      'payroll_done_last_six_month' => 'required',
      'last_company_name_used' => 'required_if:payroll_done_last_six_month,==,Yes',
      'system_access' => 'required_if:payroll_done_last_six_month,==,Yes',
      'system_access_user' => 'required_when:payroll_done_last_six_month,==,Yes,&&,system_access,==,Yes',
      'system_access_password' => 'required_when:payroll_done_last_six_month,==,Yes,&&,system_access,==,Yes',
      'did_collect_reports' => 'required_if:payroll_done_last_six_month,==,Yes',
      'payroll_summary_report_file' => 'required_when:payroll_done_last_six_month,==,Yes,&&,did_collect_reports,==,Yes|nullable|array',
      'payroll_summary_report_file.*' => 'mimes:pdf,jpg,bmp,png',
      'pay_stub_copy_file' => 'required_when:payroll_done_last_six_month,==,Yes,&&,did_collect_reports,==,Yes|nullable|array',
      'pay_stub_copy_file.*' => 'mimes:pdf,jpg,bmp,png',
      'report_941_file' => 'required_when:payroll_done_last_six_month,==,Yes,&&,did_collect_reports,==,Yes|nullable|array',
      'report_941_file.*' => 'mimes:pdf,jpg,bmp,png',
      'has_unemployment_id_license' => 'required_if:payroll_done_last_six_month,==,Yes',
      'unemployment_license_file' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_unemployment_id_license,==,Yes|nullable|array',
      'unemployment_license_file.*' => 'mimes:pdf,jpg,bmp,png',
      'unemployment_report_file' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_unemployment_id_license,==,Yes|nullable|array',
      'unemployment_report_file.*' => 'mimes:pdf,jpg,bmp,png',
      'has_unemployment_id_access' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_unemployment_id_license,==,Yes',
      'unemployment_id_user' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_unemployment_id_license,==,Yes,&&,has_unemployment_id_access,==,Yes',
      'unemployment_id_password' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_unemployment_id_license,==,Yes,&&,has_unemployment_id_access,==,Yes',
      'has_withholding_id' => 'required_if:payroll_done_last_six_month,==,Yes',
      'withholding_id_license_file' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_withholding_id,==,Yes|nullable|array',
      'withholding_id_license_file.*' => 'mimes:pdf,jpg,bmp,png',
      'withholding_report_file' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_withholding_id,==,Yes|nullable|array',
      'withholding_report_file.*' => 'mimes:pdf,jpg,bmp,png',
      'has_withholding_id_access' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_withholding_id,==,Yes',
      'withholding_id_user' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_withholding_id,==,Yes,&&,has_withholding_id_access,==,Yes',
      'withholding_id_password' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_withholding_id,==,Yes,&&,has_withholding_id_access,==,Yes',
      'has_had_problems_with_payroll' => 'required_if:payroll_done_last_six_month,==,Yes',
      'problem_with_payroll' => 'required_when:payroll_done_last_six_month,==,Yes,&&,has_had_problems_with_payroll,==,Yes',
      // Sales Tax
      'need_sales_tax' => 'required',
      'has_sales_tax_license' => 'required_if:need_sales_tax,==,Yes',
      'salex_tax_license_file' => 'required_when:need_sales_tax,==,Yes,&&,has_sales_tax_license,==,Yes|nullable|array',
      'salex_tax_license_file.*' => 'mimes:pdf,jpg,bmp,png',
      'has_sales_tax_license_access' => 'required_when:need_sales_tax,==,Yes,&&,has_sales_tax_license,==,Yes',
      'sales_tax_license_user' => 'required_when:need_sales_tax,==,Yes,&&,has_sales_tax_license,==,Yes,&&,has_sales_tax_license_access,==,Yes',
      'salex_tax_license_password' => 'required_when:need_sales_tax,==,Yes,&&,has_sales_tax_license,==,Yes,&&,has_sales_tax_license_access,==,Yes',
      'has_previous_sales_tax_reports' => 'required_if:need_sales_tax,==,Yes',
      'salex_tax_reports_file' => 'required_when:need_sales_tax,==,Yes,&&,has_previous_sales_tax_reports,==,Yes|nullable|array',
      'salex_tax_reports_file.*' => 'mimes:pdf,jpg,bmp,png',
      'is_salex_tax_up_date' => 'required_if:need_sales_tax,==,Yes',
      'sales_tax_problems_description' => 'required_when:need_sales_tax,==,Yes,&&,is_salex_tax_up_date,==,No',
      'sales_tax_management_method' => 'required_if:need_sales_tax,==,Yes',
      'sales_tax_day_of_month_to_emit_payment' => 'required_when:need_sales_tax,==,Yes,&&,sales_tax_management_method,==,PuntualPayroll is responsible for submitting the reports and pay the taxes.',
      'salex_tax_payment_method' => 'required_when:need_sales_tax,==,Yes,&&,sales_tax_management_method,==,PuntualPayroll is responsible for submitting the reports and pay the taxes.',
      // Taxes
      'did_taxes_payment_the_last_year' => 'required',
      'taxes_files' => 'required_if:did_taxes_payment_the_last_year,==,Yes|nullable|array',
      'taxes_files.*' => 'mimes:pdf,jpg,bmp,png',
      'has_taxes_problems' => 'required_if:did_taxes_payment_the_last_year,==,Yes',
      'has_taxes_problems_description' => 'required_when:did_taxes_payment_the_last_year,==,Yes,&&,has_taxes_problems,==,Yes',
      // Final
      // 'sales_rep_note' => 'required',
      'additional_requisites_file' => 'nullable|array',
      'additional_requisites_file.*' => 'mimes:pdf,jpg,bmp,png',
    ]);
    
    event(new DocumentCreated(request()));
    
    return redirect('dashboard');
  }
}
