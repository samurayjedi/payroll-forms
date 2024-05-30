<?php

namespace App\Listeners;

use App\Events\DocumentCreated;
use App\Events\DocumentRendered;
use App\PdfFormFillerBuilder;
use ArrayObject;

class GenerateBusinessRegistrationPdf {
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
    if ($event->name === 'business-registration-form.process') {
      /** Data */
      $data = $event->data;
      $ownerAddress = $data['owner_address'];
      $ownerCity = $data['owner_city'];
      $ownerState = $data['owner_state'];
      $ownerZip = $data['owner_zip'];
      // $ownerCountry = $data['owner_country'];
      $ownerPhone = $data['owner_phone'];
      $ownerEmail = $data['owner_email'];
      $companyName = implode(', ', $data['company_name']);
      $companyDba = implode(', ', $data['company_dba']);
      $companyAddress = $data['company_address'];
      $companyCity = $data['company_city'];
      $companyState = $data['company_state'];
      $companyZip = $data['company_zip'];
      // $companyCountry = $data['company_country'];
      $companyPhone = $data['company_phone'];
      $companyCounty = $data['company_county'];
      $companyFormationState = $data['state_of_incorporation_or_formation'];
      $companyActivity = $data['company_activity'];
      $companyActivityOther = $companyActivity === 'Other' ? $data['company_activity_other'] : '';
      $companyType = $data['company_type'];
      $companyMembers = (function () use ($companyType, $data)  {
        $ownerName = $data['owner_name'];
        $ownerIdentification = $data['ssn_tin_or_ein'];
        $firstOwner = [
          'name' => $ownerName,
          'ssn_tin_or_ein' => $ownerIdentification,
        ];
    
        switch ($companyType) {
          case 'Corporation':
            $companyCorporationMoreOneMember = $companyType === 'Corporation' ? $data['company_corporation_more_one_member'] : 'false';
            
            return $companyCorporationMoreOneMember === 'Yes' ? [$firstOwner, ...$data['company_corporation_members']] : [$firstOwner];
          case 'Partnership':
            $companyPartnershipMoreOneMember = $companyType === 'Partnership' ? $data['company_partnership_more_one_member'] : 'false';
            
            return $companyPartnershipMoreOneMember === 'Yes' ? [$firstOwner, ...$data['company_partnership_members']] : [$firstOwner];
          case 'Limited Liability Company':
            $companyLLcMoreOneMember = $companyType === 'Limited Liability Company' ? $data['company_more_of_one_member'] : 'false';

            return $companyLLcMoreOneMember === 'Yes' ? [$firstOwner, ...$data['company_llc_members']] : [$firstOwner];
        }
        
        return [$firstOwner];
      })();
      $companyTypeOther = $companyType === 'Other' ? $data['company_type_other'] : '';
      $package = $data['package'];
      $processTime = $data['process_time'];
      $licenses = array_key_exists('licenses', $data) ? $data['licenses'] : [];
      $needWholesaleLicense = in_array('Wholesale License', $licenses);
      $needCityLicense = in_array('City License', $licenses);
      $merchandiseLine = $data['line_of_merchandise'];
      $questions = array_key_exists('questions', $data) ? $data['questions'] : [];
      $salesOnlineRetail = in_array('Does the company sale any products online or retail?', $questions);
      $needSpecialLicense = in_array('Does the company need a especial license?', $questions);
      $whichLicense = $needSpecialLicense ? $data['which_license'] : 'No';
      $haveEmployees = in_array('Do you have or plan to have any employee?', $questions);
      $employees = $haveEmployees ? $data['employees'] : 'No';
      $paymentMethod = $haveEmployees ? $data['payment_method'] : 'No';
      $completeBy = $data['completed_by'];
      /** Output path */
      $outputDir = public_path('storage/tmp');
      $uniqId = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 10);
      $outputDocument = "$outputDir/$uniqId.pdf";
      /** Render */
      PdfFormFillerBuilder::builder()
        ->path(public_path('storage/documents').'/businessRegistrationForm.pdf')
        ->input('owner_name', implode(', ', array_map(function ($memberObject) {
            $member = new ArrayObject($memberObject);

            return $member['name'];
          }, $companyMembers)))
        ->input('ssn_tin_or_ein', implode(', ', array_map(function ($memberObject) {
            $member = new ArrayObject($memberObject);
            return $member['ssn_tin_or_ein'];
          }, $companyMembers)))
        ->input('owner_address', $ownerAddress)
        ->input('owner_city_state_zip', "$ownerCity $ownerState $ownerZip")
        ->input('owner_phone', $ownerPhone)
        ->input('owner_email', $ownerEmail)
        ->input('company_name', $companyName)
        ->input('company_dba', $companyDba)
        ->input('company_address', $companyAddress)
        ->input('company_city_state_zip', "$companyCity $companyState $companyZip")
        ->input('company_phone', $companyPhone)
        ->input('company_principal_state_and_county', "$companyCounty $companyFormationState")
        ->input('state_of_incorporation_or_formation', $companyFormationState)
        ->check('check_contructuion', $companyActivity === 'Construction')
        ->check('check_retail', $companyActivity === 'Retail')
        ->check('check_rental_leasing', $companyActivity === 'Rental & leasing')
        ->check('check_cleaning', $companyActivity === 'Cleaning services')
        ->check('check_transportation', $companyActivity === 'Transportation')
        ->check('check_restaurant', $companyActivity === 'Restaurant or food service')
        ->check('check_wholesale', $companyActivity === 'Wholesale')
        ->input('company_activity_other', $companyActivityOther)
        ->check('check_proprietorship', $companyType === 'Sole Proprietorship')
        ->check('check_trade_id', $companyType === 'Sole Proprietorship')
        ->check('check_partnership', $companyType === 'Partnership')
        ->input('company_number_of_parners', $companyType === 'Partnership' ? count($companyMembers) : 'N/A')
        ->check('check_nonprofit', $companyType === 'Non-Profit')
        ->check('check_corporation', $companyType === 'Corporation')
        ->check('check_llc', $companyType === 'Limited Liability Company')
        ->input('company_llc_number_of_members', $companyType === 'Limited Liability Company' ? count($companyMembers) : 'N/A')
        ->check('check_other_company_type', $companyType === 'Other')
        ->input('company_type_other', $companyTypeOther)
        ->check('check_basic', $package === 'Basic')
        ->check('check_corporate', $package === 'Corporate')
        ->check('check_normal', $processTime === 'Normal')
        ->check('check_24_hours', $processTime === '24 hours')
        ->check('check_wholesale_license', $needWholesaleLicense)
        ->check('check_city_license', $needCityLicense)
        ->input('line_of_merchandise', $merchandiseLine)
        ->input('online_retail', $salesOnlineRetail ? 'Yes' : 'No')
        ->check('check_salex_tax', $salesOnlineRetail)
        ->input('need_especial_license', $whichLicense)
        ->input('employees', $employees)
        ->input('w2_or_1099', $paymentMethod)
        ->check('check_unemployment', $haveEmployees && $paymentMethod === 'W2 form')
        ->check('check_wage_withholding', $haveEmployees && $paymentMethod === 'W2 form')
        ->input('completed_by', $completeBy)
        ->fillAndFlatten($outputDocument);
      /**  */
      event(new DocumentRendered($event->name, $data, $outputDocument));
    }
  }
}
