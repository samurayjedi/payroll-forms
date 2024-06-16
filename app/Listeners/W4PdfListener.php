<?php

namespace App\Listeners;

use DocuSign\eSign\Model\Recipients;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Events\DocumentRendered;
use App\DocuSign\Builders\W4\EmployeeSignerBuilder;
use App\DocuSign\Builders\W4\ManagerSignerBuilder;
use App\DocuSign\Builders\AbstractSignerBuilder;
use App\DocuSign\Facades\ApiFacade;
use App\Mail\AttachmentMail;

class W4PdfListener {
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
    if ($event->name === 'w4.process') {
      $document = $event->data;
      $name = $document['first_name_and_middle_initial'].' '.$document['last_name'].' W4.';
      if ($document['sign_with_docusign'] === true) {
        # 1 Owner Signature =============================================== >
        $employeeSigner = EmployeeSignerBuilder
          ::builder()
          ->prepareSignatures()
          ->create([
          'email' => $document['email'],
          'name' => $document['first_name_and_middle_initial'].' '.$document['last_name'],
          'recipient_id' => "1",
          'routing_order' => "1",
        ]);
        $managerSigner = ManagerSignerBuilder
          ::builder()
          ->prepareSignatures()
          ->create([
          'email' => $document['manager_email'],
          'name' => $document['manager_full_name'],
          'recipient_id' => "2",
          'routing_order' => "2",
        ]);
        # 2. Recipient
        $recipients = new Recipients([
          'signers' => [$employeeSigner, $managerSigner],
          'carbon_copies' => AbstractSignerBuilder::getCaborCopies(3),
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
          Mail
            ::to($emails)
            ->send(new AttachmentMail($name, $event->path));
          // remove document after send, temporal....
          unlink($event->path);
      }
    }
  }
}
