<?php

namespace App\Listeners;

use App\Events\DocumentCreated;
use App\PdfFormFillerBuilder;
use App\Events\DocumentRendered;

class W4FormListener {
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
    if ($event->name === 'w4.process') {
      $data = $event->data;
      $firstName = array_key_exists('first_name_and_middle_initial', $data) ? $data['first_name_and_middle_initial'] : '';
      $lastName = array_key_exists('last_name', $data) ? $data['last_name'] : '';
      $address = array_key_exists('address', $data) ? $data['address'] : '';
      $city = array_key_exists('city_or_town', $data) ? $data['city_or_town'] : '';
      $state = array_key_exists('state', $data) ? $data['state'] : '';
      $zip = array_key_exists('zip', $data) ? $data['zip'] : '';
      $ssn = array_key_exists('social_security_number', $data) ? $data['social_security_number'] : '';
      $otherIncome = array_key_exists('other_income', $data) ? $data['other_income'] : '';
      $deductions = array_key_exists('deductions', $data) ? $data['deductions'] : ''; 
      $withholding = array_key_exists('extra_withholding', $data) ? $data['extra_withholding'] : '';
      $childrens = array_key_exists('number_of_children', $data) ? $data['number_of_children'] : 0;
      $dependents = array_key_exists('number_of_other_dependents', $data) ? $data['number_of_other_dependents'] : 0;
      $civilState = array_key_exists('civil_state', $data) ? $data['civil_state'] : '';
      $twoJobs = array_key_exists('two_jobs_with_similar_pay', $data) ? $data['two_jobs_with_similar_pay'] : '';
      $bird = array_key_exists('bird_date', $data) ? $data['bird_date'] : '';
      $email = array_key_exists('email', $data) ? $data['email'] : '';
      $phone = array_key_exists('phone', $data) ? $data['phone'] : '';
      $payMethod = array_key_exists('payment_method', $data) ? $data['payment_method'] : '';
      $bank = array_key_exists('bank_name', $data) ? $data['bank_name'] : '';
      $account = array_key_exists('account', $data) ? $data['account'] : '';
      $routing = array_key_exists('routing', $data) ? $data['routing'] : '';
      $companyName = $data['company_name'];
      $jobPosition = $data['job_position'];
      $hiredDate = $data['hired_date'];
      $rateOfPay = $data['rate_of_pay'];
      $managerEmail = $data['manager_email'];
      /* W4 Page *********************************************************************************************************************** */
      $fillables = [
        'first_name_and_middle_initial' => $firstName,
        'last_name' => $lastName,
        'address' => $address,
        'city_or_tow_state_zip' => "$city $state $zip",
        'social_security_number' => $ssn,
        'other_income' => $otherIncome,
        'deductions' => $deductions,
        'extra_withholding' => $withholding,
        'company_name' => $companyName,
        'job_position' => $jobPosition,
        'hired_date' => $hiredDate,
        'rate_of_pay' => $rateOfPay,
        'manager_email' => $managerEmail,
      ];
      /** If your total income will be $200,000 or less ($400,000 or less if married filing jointly): */
      $vacas = $childrens * 2000; // Multiply the number of qualifying children under age 17 by $2,000
      $pollitos = $dependents * 500; // Multiply the number of other dependents by $500
      $total = $vacas + $pollitos; // Add the amounts above and enter the total here
      if ($data['have_dependents'] === 'Yes') {
        $fillables['number_of_children'] = $vacas;
        $fillables['number_of_other_dependents'] = $pollitos;
        $fillables['total_dependants'] = $total;
      }
      /** Civil state */
      $checksCivilStates = [
        'single_check', // Single or Married filing separately
        'married_check', // Married filing jointly or Qualifying widow(er)
        'head_check', // Head of household
      ]; $civilStateSelected = '';
      switch ($civilState) {
        case 'Single or Married filing separately':
          $civilStateSelected = $checksCivilStates[0];
          break;
        case 'Married filing jointly or Qualifying widow(er)':
          $civilStateSelected = $checksCivilStates[1];
          break;
        case 'Head of household':
          $civilStateSelected = $checksCivilStates[2];
          break;
      }
      foreach ($checksCivilStates as $check) {
        if ($check !== $civilStateSelected) {
          $fillables[$check] = '0';
        }
      }
      /** If there are only two jobs total, you may check this box bla bla bla.... */
      if ($twoJobs !== 'true') {
        $fillables['two_jobs_similar_check'] = '0';
      }
      /* Employee Information Sheet Page *********************************************************************************************** */
      $fillables['date'] = date('Y/d/m');
      $fillables['first_name_and_middle_initial_last_name'] = "$firstName $lastName";
      $fillables['city_or_town'] = $city;
      $fillables['state'] = $state;
      $fillables['zip'] = $zip;
      $fillables['bird_date'] = substr($bird, 0, 10);
      $fillables['email'] = $email;
      $fillables['phone'] = $phone;
      /** Martial state */
      switch ($civilState) {
        case 'Single or Married filing separately':
        case 'Head of household':
          $fillables['married_check_2'] = '0';
          break;
        case 'Married filing jointly or Qualifying widow(er)':
          $fillables['single_check_head_check'] = '0';
          break;
      }
      /* Payment method */
      $checksPaymentMethods = [
        'payment_method_check',
        'payment_method_deposit',
        'payment_method_card',
      ]; $paymentMethodSelected = '';
      switch ($payMethod) {
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
      if ($payMethod === 'Direct Deposit') {
        $fillables['bank_name'] = $bank;
        $fillables['routing'] = $routing;
        $fillables['account'] = $account;
      }
      /* Fill ************************************************************************************************************************** */
      $source = public_path('storage/documents');
      $outputPath = PdfFormFillerBuilder::fillAndFlattenFromArray("$source/fw4.pdf", $fillables);

      event(new DocumentRendered($event->name, $event->data, $outputPath));
    }
  }
}
