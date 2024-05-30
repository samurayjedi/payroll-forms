<?php

namespace App\DocuSign\Builders;

interface SignerBuilderInterface {
  public function prepareSignatures(string $variant, bool $withSigningDates);
  public function create(array $opts);
}
