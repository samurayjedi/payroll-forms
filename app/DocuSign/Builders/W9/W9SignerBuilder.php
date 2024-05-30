<?php

namespace App\DocuSign\Builders\W9;
use DocuSign\eSign\Model\SignHere;
use DocuSign\eSign\Model\DateSigned;
use App\DocuSign\Builders\AbstractSignerBuilder;
use RuntimeException;

class W9SignerBuilder extends AbstractSignerBuilder {
  private static $instance = null;
  
  /**
   * Bootstrap any application services.
   *
   * @return CustomerSignerBuilder
   */

  public static function builder() {
    if (self::$instance === null) {
      self::$instance = new W9SignerBuilder;
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
      'anchor_string' => 'Signature of U.S. person',
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '10',
      'anchor_x_offset' => '40',
    ]);
  }
  
  protected function defaultsSignaturesDates() {
    // Service Agreement
    $this->signingDatesTabs[] = new DateSigned([
      'anchor_string' => 'Sign Here', // Date
      'anchor_units' => 'pixels',
      'anchor_y_offset' => '10',
      'anchor_x_offset' => '365',
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
