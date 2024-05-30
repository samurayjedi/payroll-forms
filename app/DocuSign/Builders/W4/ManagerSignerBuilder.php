<?php

namespace App\DocuSign\Builders\W4;
use DocuSign\eSign\Model\SignHere;
use DocuSign\eSign\Model\DateSigned;
use App\DocuSign\Builders\AbstractSignerBuilder;
use RuntimeException;

class ManagerSignerBuilder extends AbstractSignerBuilder {
  private static $instance = null;
  
  /**
   * Bootstrap any application services.
   *
   * @return ManagerSignerBuilder
   */

  public static function builder() {
    if (self::$instance === null) {
      self::$instance = new ManagerSignerBuilder;
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
      'anchor_string' => 'Manager Signature',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-10',
      'anchor_x_offset' => '0',
    ]);
  }
  
  protected function defaultsSignaturesDates() {
    // Service Agreement
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => 'Manager Signature', // Date
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '-15',
      'anchor_x_offset' => '380',
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
