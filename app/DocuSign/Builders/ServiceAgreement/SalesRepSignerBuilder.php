<?php

namespace App\DocuSign\Builders\ServiceAgreement;
use DocuSign\eSign\Model\SignHere;
use DocuSign\eSign\Model\DateSigned;
use App\DocuSign\Builders\AbstractSignerBuilder;

class SalesRepSignerBuilder extends AbstractSignerBuilder {
  private static $instance = null;
  
  /**
   * Bootstrap any application services.
   *
   * @return SalesRepSignerBuilder
   */

  public static function builder() {
    if (self::$instance === null) {
      self::$instance = new SalesRepSignerBuilder;
    }
    return self::$instance;
  }

  public function __construct() {
    parent::__construct();
    if (self::$instance !== null) {
      throw new \RuntimeException('Only one instance of ' . self::class . ' is allowed.');
    }
  }
  
  protected function defaultSignatures() {
    $this->signerTabs[] = new SignHere([
      'anchor_string' => 'Sales Rep Signature',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-10',
      'anchor_x_offset' => '0',
    ]);
  }
  
  protected function mtSignatures() {
    // Third party authorization form
    $this->signerTabs[] = new SignHere([
      'anchor_string' => "'#L5/", // e-Response 
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '475',
      'anchor_x_offset' => '30',
    ]);
  }

  protected function mtSignaturesDates() {
    // Third party authorization form
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => "'#L5/", // e-Response 
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '475',
      'anchor_x_offset' => '205',
    ]);
  }

  public function prepareSignatures(string $variant, bool $withSigningDates = true) {
    $this->defaultSignatures();
    switch ($variant) {
      case 'CA':
      case 'CO':
        break;
      case 'MT':
        $this->mtSignatures();
        if ($withSigningDates) {
          $this->mtSignaturesDates();
        }
        break;
      default:
        throw new \RuntimeException('Invalid service agreement variant ' . $variant . '.');
    }
    return $this;
  }
}
