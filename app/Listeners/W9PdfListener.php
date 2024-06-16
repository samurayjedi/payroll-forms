<?php

namespace App\Listeners;

use DocuSign\eSign\Model\Recipients;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Events\DocumentRendered;
use App\DocuSign\Builders\W9\W9SignerBuilder;
use App\DocuSign\Facades\ApiFacade;
use App\Mail\AttachmentMail;

class W9PdfListener {
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
    if ($event->name === 'w9.process') {
      $document = $event->data;
      $name = $document['name'].' W9.';
      if ($document['sign_with_docusign'] === true) {
        # 1 Owner Signature =============================================== >
        $w9Signer = W9SignerBuilder
          ::builder()
          ->prepareSignatures()
          ->create([
            'email' => $document['email'],
            'name' => $document['name'],
            'recipient_id' => "1",
            'routing_order' => "1",
          ]);
        # 2. Recipient
        $recipients = new Recipients([
          'signers' => [$w9Signer],
          'carbon_copies' => W9SignerBuilder::getCaborCopies(2),
        ]);
        $filePath = $event->path;
        $this->apiClientContainer->signingViaEmail($name, $filePath, $recipients);
        // remove document after signing, temporal....
        unlink($filePath);
      } else {
          $emails = explode(',', env('ADMIN_EMAILS'));
          if (Auth::check()) {
            $emails[] = Auth::user()->email;
          }
          Mail::to($emails)
            ->send(new AttachmentMail($name, $event->path));
          // remove document after send, temporal....
          unlink($event->path);
      }
    }
  }
}
