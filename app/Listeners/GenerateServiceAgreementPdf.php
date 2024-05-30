<?php

namespace App\Listeners;

use App\Events\DocumentCreated;
use App\Events\DocumentRendered;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Queue\InteractsWithQueue;
use App\PdfFormFillerBuilder;

class GenerateServiceAgreementPdf {
  /**
   * Create the event listener.
   *
   * @return void
   */
  public function __construct() {
      //
  }

  /**
   * Handle the event.
   *
   * @param  \App\Events\DocumentCreated  $event
   * @return void
   */
  public function handle(DocumentCreated $event) {
    if ($event->name === 'service-agreement.process') {
      $data = $event->data;
      $companyEmail = $data['company_email'];
      $companyName = $data['company_name'];
      $companyDba = $data['company_dba'];
      $companyState = $data['company_state'];
      $companyCity = $data['company_city'];
      $companyZip = $data['company_zip'];
      $companyPhone = $data['company_phone'];
      $companyType = $data['company_type'];
      $companyTypeOther = $companyType === 'Other' ? $data['company_type_other'] : '';
      $ein = $data['ein'];
      $stateId = $data['state_id'];
      $tin = $data['tin'];
      $bank = $data['bank_name'];
      $routing = $data['routing'];
      $account = $data['account'];
      $customerName = $data['customer_name'];
      $repName = $data['sales_rep_name'];
      $fee = $data['fee'];
      // $feeDate = $data['fee_date'];
      $companyAddress1 = $data['company_address_1'];
      $companyAddress2 = $data['company_address_2'];
      $services = array_key_exists('services', $data) ? $data['services'] : [];
      $payrollService = in_array('Payroll', $services);
      $bookkeepingService = in_array('Bookkeeping', $services);
      $hrService = in_array('Basic HR', $services);
      /** Output path */
      $outputDir = public_path('storage/tmp');
      $uniqId = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 10);
      $outputDocument = "$outputDir/$uniqId.pdf";
      /** Render */
      PdfFormFillerBuilder
        ::builder()
        ->path(public_path('storage/documents')."/service_agreement/$companyState.pdf")
        ->input('company_email', $companyEmail)
        ->input('company_name', $companyName)
        ->input('company_dba', $companyDba)
        ->input('company_phone', $companyPhone)
        ->input('company_state', $companyState)
        ->input('company_city', $companyCity)
        ->input('company_zip', $companyZip)
        ->input('company_city_state_zip', "$companyCity $companyState $companyZip")
        ->input('company_address_1', $companyAddress1)
        ->input('company_address_2', $companyAddress2)
        ->input('company_address_1_2', "$companyAddress1 $companyAddress2")
        ->input('state_id', $stateId)
        ->input('tin', $tin)
        ->input('bank_name', $bank)
        ->input('routing', $routing)
        ->input('account', $account)
        ->input('ein', $ein)
        ->input('fee', $fee)
        // ->input('fee_date', $feeDate)
        ->check('check_payroll', $payrollService)
        ->check('check_bookkeeping', $bookkeepingService)
        ->check('check_hr', $hrService)
        ->check('check_proprietorship', $companyType === 'Sole Proprietorship')
        ->check('check_partnership', $companyType === 'General Partnership')
        ->check('check_limited_partnership', $companyType === 'Limited Partnership')
        ->check('check_nonprofit', $companyType === 'Non-Profit')
        ->check('check_corporation', $companyType === 'Corporation')
        ->check('check_llc', $companyType === 'Limited Liability Company')
        ->check('check_other', $companyType === 'Other')
        ->input('company_type_other', $companyTypeOther)
        ->input('customer_name', $customerName)
        ->input('customer_title', 'Owner')
        ->input('customer_name_title', "$customerName, Owner")
        ->input('sales_rep_name', $repName)
        ->fillAndFlatten($outputDocument);
      
      event(new DocumentRendered($event->name, $data, $outputDocument));
    }
  }
}
