<?php

namespace App\DocuSign\Builders;
use DocuSign\eSign\Model\Signer;
use DocuSign\eSign\Model\Tabs;
use DocuSign\eSign\Model\CarbonCopy;
use App\DocuSign\Builders\SignerBuilderInterface;

abstract class AbstractSignerBuilder implements SignerBuilderInterface {
  static function getCaborCopies(int $order): array {
    $adminEmails = explode(',', env('ADMIN_EMAILS'));
    $adminNames = explode(',', env('ADMIN_NAMES'));
    $i = $order; $ccs = [];
    foreach ($adminEmails as $index => $email) {
      $ccs[] = new CarbonCopy([
        'email' => $email,
        'name' => str_replace('_', ' ', $adminNames[$index]),
        'recipient_id' => "$i",
        'routing_order' => "$i",
      ]);
      $i++;
    }
    return $ccs;
  }
  
  protected $signerTabs, $signingDatesTabs;
  
  public function __construct() {
    $this->signerTabs = [];
    $this->signingDatesTabs = [];
  }

  protected function reset() {
    $this->signerTabs = [];
    $this->signingDatesTabs = [];
  }
  
  public function create(array $opts): Signer {
    $signer = new Signer($opts);
    $signer->setTabs(new Tabs([
      'sign_here_tabs' => $this->signerTabs,
      'date_signed_tabs' => $this->signingDatesTabs,
    ]));
    $this->reset();
    return $signer;
  }
}
