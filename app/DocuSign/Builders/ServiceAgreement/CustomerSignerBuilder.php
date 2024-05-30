<?php

namespace App\DocuSign\Builders\ServiceAgreement;
use DocuSign\eSign\Model\SignHere;
use DocuSign\eSign\Model\DateSigned;
use App\DocuSign\Builders\AbstractSignerBuilder;
use RuntimeException;

class CustomerSignerBuilder extends AbstractSignerBuilder {
  private static $instance = null;
  
  /**
   * Bootstrap any application services.
   *
   * @return CustomerSignerBuilder
   */

  public static function builder() {
    if (self::$instance === null) {
      self::$instance = new CustomerSignerBuilder;
    }
    return self::$instance;
  }

  public function __construct() {
    parent::__construct();
    if (self::$instance !== null) {
      throw new RuntimeException('Only one instance of ' . self::class . ' is allowed.');
    }
  }
  
  protected function defaultSignatures() {
    // Service Agreement
    $this->signerTabs[] = new SignHere([
      'anchor_string' => 'Authorized Officer’s Signature',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '0',
      'anchor_x_offset' => '103',
    ]);
    // Deposit Account Verification & Bank Debit Authorization
    $this->signerTabs[] = new SignHere([
      'anchor_string' => 'Customer Signature',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-10',
      'anchor_x_offset' => '0',
    ]);
  }
  
  protected function caSignatures() {
    // Reporting Agent Authorization
    $this->signerTabs[] = new SignHere([
      'anchor_string' => 's^C>E;<75', // Signature of taxpayer
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-25',
      'anchor_x_offset' => '-70',
    ]);
    // Power of Attorney (CA version)
    $this->signerTabs[] = new SignHere([
      'anchor_string' => '78;783B579', // Attorney
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '550',
      'anchor_x_offset' => '-200',
    ]);
  }
  
  protected function mtSignatures() {
    // Power of Attorney (MT Version)
    $this->signerTabs[] = new SignHere([
      'anchor_string' => 'YZ[N', // Actc authorized by this form
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '95',
      'anchor_x_offset' => '-255',
    ]);
    // Third party authorization form
    $this->signerTabs[] = new SignHere([
      'anchor_string' => "'#L5/", // e-Response 
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '475',
      'anchor_x_offset' => '-290',
    ]);
  }
  
  protected function coSignatures() {
    // Colorado Tax Information Authorization 
    $this->signerTabs[] = new SignHere([
      'anchor_string' => 'M¾MC¿MI', // Taxpayer Signature
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-58',
      'anchor_x_offset' => '-15',
    ]);
    // Power of Attorney (CO Version)
    $this->signerTabs[] = new SignHere([
      'anchor_string' => "///'%", // Division of 
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '610',
      'anchor_x_offset' => '-230',
    ]);
  }
  
  protected function defaultsSignaturesDates() {
    // Service Agreement
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => 'Authorized Officer’s Signature',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-3',
      'anchor_x_offset' => '343',
    ]);
    // Deposit Account Verification
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => 'Account Authorization:',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '80',
      'anchor_x_offset' => '278',
    ]);
    // Bank Debit Authorization
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => 'your bank account',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '90',
      'anchor_x_offset' => '2',
    ]);
  }
  
  protected function caSignaturesDates() {
    // Reporting Agent Authorization (CA)
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => 's^C>E;<75', // Signature of taxpayer
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-25',
      'anchor_x_offset' => '300',
    ]);
    // Power of Attorney (CA)
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => '78;783B579', // Power of Attorney
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '581',
      'anchor_x_offset' => '13',
    ]);
  }
  
  protected function mtSignaturesDates() {
    // Power of Attorney (MT Version)
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => 'YZ[N', // Actc authorized by this form
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '95',
      'anchor_x_offset' => '-40',
    ]);
    // Third party authorization form
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => "'#L5/", // e-Response 
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '475',
      'anchor_x_offset' => '-50',
    ]);
  }
  
  protected function coSignaturesDates() {
    // Colorado Tax Information Authorization 
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => 'M¾MC¿MI', // Taxpayer Signature
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-63',
      'anchor_x_offset' => '200',
    ]);
    // Power of Attorney (CO Version)
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => "///'%", // Division of 
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '590',
      'anchor_x_offset' => '170',
    ]);
  }

  public function prepareSignatures(string $variant, bool $withSigningDates = true) {
    $this->defaultSignatures();
    if ($withSigningDates) {
      $this->defaultsSignaturesDates();
    }
    switch ($variant) {
      case 'CA':
        $this->caSignatures();
        if ($withSigningDates) {
          $this->caSignaturesDates();
        }
        break;
      case 'MT':
        $this->mtSignatures();
        if ($withSigningDates) {
          $this->mtSignaturesDates();
        }
        break;
      case 'CO':
        $this->coSignatures();
        if ($withSigningDates) {
          $this->coSignaturesDates();
        }
        break;
      default:
        throw new RuntimeException('Invalid service agreement variant ' . $variant . '.');
    }
    return $this;
  }
}
