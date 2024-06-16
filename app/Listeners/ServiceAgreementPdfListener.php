<?php

namespace App\Listeners;

use DocuSign\eSign\Model\Recipients;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Events\DocumentRendered;
use App\DocuSign\Facades\ApiFacade;
use App\DocuSign\Builders\ServiceAgreement\CustomerSignerBuilder;
use App\DocuSign\Builders\ServiceAgreement\SalesRepSignerBuilder;
use App\Mail\AttachmentMail;



class ServiceAgreementPdfListener {
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
    if ($event->name === 'service-agreement.process') {
      $data = $event->data;
      $companyName = array_key_exists('company_name', $data) ? $data['company_name'] : '';
      $name = "$companyName Payroll Agreement";
      if ($data['sign_with_docusign'] === true) {
        $customerEmail = array_key_exists('customer_email', $data) ? $data['customer_email'] : '';
        $customerName = array_key_exists('customer_name', $data) ? $data['customer_name'] : '';
        $companyState = array_key_exists('company_state', $data) ? $data['company_state'] : '';
        $repName = array_key_exists('sales_rep_name', $data) ? $data['sales_rep_name'] : '';
        $repEmail = array_key_exists('sales_rep_email', $data) ? $data['sales_rep_email'] : '';
        # 1 Customer Signature =============================================== >
        $customerSigner = CustomerSignerBuilder::builder()
          ->prepareSignatures($companyState)
          ->create([
            'email' => $customerEmail,
            'name' => $customerName,
            'recipient_id' => "1",
            'routing_order' => "1",
          ]);
        # 2. Sales rep sign ================================================== >
        $salesRepSign = SalesRepSignerBuilder::builder()
          ->prepareSignatures($data['company_state'])
          ->create([
            'email' => $repEmail,
            'name' => $repName,
            'recipient_id' => "2",
            'routing_order' => "2",
          ]);
        # 3. Recipient
        $recipients = new Recipients([
          'signers' => [$customerSigner, $salesRepSign],
          'carbon_copies' => SalesRepSignerBuilder::getCaborCopies(3),
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

