<?php

namespace App\DocuSign\Builders\BusinessRegistrationForm;
use DocuSign\eSign\Model\SignHere;
use DocuSign\eSign\Model\DateSigned;
use App\DocuSign\Builders\AbstractSignerBuilder;
use RuntimeException;

class OwnerSignerBuilder extends AbstractSignerBuilder {
  private static $instance = null;
  
  /**
   * Bootstrap any application services.
   *
   * @return OwnerSignerBuilder
   */

  public static function builder() {
    if (self::$instance === null) {
      self::$instance = new OwnerSignerBuilder;
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
    $this->signerTabs[] = new SignHere([
      'anchor_string' => 'Signature:',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '10',
      'anchor_x_offset' => '50',
    ]);
  }
  
  protected function defaultsSignaturesDates() {
    // Service Agreement
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => 'Date:',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-3',
      'anchor_x_offset' => '23',
    ]);
  }

  public function prepareSignatures(string $variant = '', bool $withSigningDates = true) {
    $this->defaultSignatures();
    if ($withSigningDates) {
      $this->defaultsSignaturesDates();
    }
    return $this;
  }
}
