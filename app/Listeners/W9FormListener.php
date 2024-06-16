<?php

namespace App\Listeners;

use App\Events\DocumentCreated;
use App\PdfFormFillerBuilder;
use App\Events\DocumentRendered;

class W9FormListener {
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
    if ($event->name === 'w9.process') {
      $data = $event->data;
      /* W4 Page *********************************************************************************************************************** */
      $fillables = [
        'name' => $data['name'],
        'business_name' => $data['business_name'],
        'exempt_payee_code' => $data['exempt_payee_code'],
        'exemption_from_fatca_reporting_code' => $data['exemption_from_fatca_reporting_code'],
        'list_account_number' => $data['list_account_number'],
        'requesters_name_requesters_address' => $data['requesters_name'].' '.$data['requesters_address'],
        'phone_address_unit_apt_suite' => $data['phone'].' '.$data['address'].' '.$data['unit_apt_suite'],
        'city_or_town_state_zip' => $data['city_or_town'].' '.$data['state'].' '.$data['zip'],
      ];
      /** Federal Classification */
      $checksFederalClassifications = [
        'check_proprietorship',
        'check_llc',
        'check_c_corporation',
        'check_s_corporation',
        'check_partnership',
        'check_trust',
        'check_other',
      ]; $federalClassificationSelected = '';
      switch ($data['federal_tax_classification']) {
        case 'Individual/sole proprietor or single-member LLC':
          $federalClassificationSelected = $checksFederalClassifications[0];
          break;
        case 'C Corporation':
          $federalClassificationSelected = $checksFederalClassifications[1];
          break;
        case 'S Corporation':
          $federalClassificationSelected = $checksFederalClassifications[2];
          break;
        case 'Partnership':
          $federalClassificationSelected = $checksFederalClassifications[3];
          break;
        case 'Trust/estate':
          $federalClassificationSelected = $checksFederalClassifications[4];
          break;
        case 'Limited liability company':
          $federalClassificationSelected = $checksFederalClassifications[5];
          $fillables['limited_liability_company_clasification'] = $data['limited_liability_company_clasification'];
          break;
        case 'Other':
          $federalClassificationSelected = $checksFederalClassifications[6];
          $fillables['other_federal_classification'] = $data['other_federal_classification'];
          break;
      }
      foreach ($checksFederalClassifications as $check) {
        if ($check !== $federalClassificationSelected) {
          $fillables[$check] = '0';
        }
      }
      /** Federal Identification */
      $ssn_ein = $data['ssn_ein'];
      if ($data['ssn_or_ein'] === 'SSN') {
        $fillables['ssn_1'] = $ssn_ein[0];
        $fillables['ssn_2'] = $ssn_ein[1];
        $fillables['ssn_3'] = $ssn_ein[2];
        $fillables['ssn_4'] = $ssn_ein[3];
        $fillables['ssn_5'] = $ssn_ein[4];
        $fillables['ssn_6'] = $ssn_ein[5];
        $fillables['ssn_7'] = $ssn_ein[6];
        $fillables['ssn_8'] = $ssn_ein[7];
        $fillables['ssn_9'] = $ssn_ein[8];
      } else { // EIN
        $fillables['ein_1'] = $ssn_ein[0];
        $fillables['ein_2'] = $ssn_ein[1];
        $fillables['ein_3'] = $ssn_ein[2];
        $fillables['ein_4'] = $ssn_ein[3];
        $fillables['ein_5'] = $ssn_ein[4];
        $fillables['ein_6'] = $ssn_ein[5];
        $fillables['ein_7'] = $ssn_ein[6];
        $fillables['ein_8'] = $ssn_ein[7];
        $fillables['ein_9'] = $ssn_ein[8];
      }
      /* Contractor Information Sheet ************************************************************************************************** */
      $fillables['date'] = date('Y/d/m');
      $fillables['name_or_business_name'] = empty($data['business_name']) ? $data['name'] : $data['business_name'];
      $fillables['ssn_ein'] = $data['ssn_ein'];
      $fillables['city_or_town'] = $data['city_or_town'];
      $fillables['state'] = $data['state'];
      $fillables['zip'] = $data['zip'];
      $fillables['bird_date'] = substr($data['bird_date'], 0, 10);
      $fillables['email'] = $data['email'];
      $fillables['phone'] = $data['phone'];
      /* Payment method */
      $checksPaymentMethods = [
        'payment_method_check',
        'payment_method_deposit',
        'payment_method_card',
      ]; $paymentMethodSelected = '';
      switch ($data['payment_method']) {
        case 'Check':
          $paymentMethodSelected = $checksPaymentMethods[0];
          break;
        case 'Direct Deposit':
          $paymentMethodSelected = $checksPaymentMethods[1];
          break;
        case 'Payroll Card':
          $paymentMethodSelected = $checksPaymentMethods[2];
          break;
      }
      foreach ($checksPaymentMethods as $check) {
        if ($check !== $paymentMethodSelected) {
          $fillables[$check] = '0';
        }
      }
      if ($data['payment_method'] === 'Direct Deposit') {
        $fillables['bank_name'] = $data['bank_name'];
        $fillables['routing'] = $data['routing'];
        $fillables['account'] = $data['account'];
      }
      /* Fill ************************************************************************************************************************** */
      $source = public_path('storage/documents');
      $outputPath = PdfFormFillerBuilder::fillAndFlattenFromArray("$source/fw9.pdf", $fillables);
      event(new DocumentRendered('w9.process', $event->data, $outputPath));
    }
  }
}
