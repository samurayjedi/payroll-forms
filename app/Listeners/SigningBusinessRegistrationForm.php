<?php

namespace App\Listeners;

use DocuSign\eSign\Model\Recipients;
use App\Events\DocumentRendered;
use App\DocuSign\Builders\BusinessRegistrationForm\OwnerSignerBuilder;
use App\DocuSign\Facades\ApiFacade;

class SigningBusinessRegistrationForm {
  private $apiClientContainer;

  /**
   * Create the event listener.
   *
   * @return void
   */
  public function __construct(ApiFacade $container) {
    $this->apiClientContainer = $container;
  }

  /**
   * Handle the event.
   *
   * @param  \App\Events\DocumentRendered  $event
   * @return void
   */
  public function handle(DocumentRendered $event) {
    if ($event->name === 'business-registration-form.process') {
      $document = $event->data;
      if ($document['sign_with_docusign'] === true) {
        # 1 Owner Signature =============================================== >
        $ownerSigner = OwnerSignerBuilder
          ::builder()
          ->prepareSignatures()
          ->create([
          'email' => $document['owner_email'],
          'name' => $document['owner_name'],
          'recipient_id' => "1",
          'routing_order' => "1",
        ]);
        # 2. Recipient
        $recipients = new Recipients([
          'signers' => [$ownerSigner],
          'carbon_copies' => OwnerSignerBuilder::getCaborCopies(2),
        ]);
        $filePath = $event->path;
        $this->apiClientContainer->signingViaEmail(
            implode(', ', $document['company_dba']).' Business Registration Form',
            $filePath,
            $recipients,
        );
        // remove document after signing, temporal....
        unlink($filePath);
      }
    }
  }
}
