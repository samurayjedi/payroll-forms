<?php

namespace App\Listeners;

use DocuSign\eSign\Model\Recipients;
use App\Events\DocumentRendered;
use App\DocuSign\Facades\ApiFacade;
use App\DocuSign\Builders\ServiceAgreement\CustomerSignerBuilder;
use App\DocuSign\Builders\ServiceAgreement\SalesRepSignerBuilder;



class SigningServiceAgreement {
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
      if ($data['sign_with_docusign'] === true) {
        /** Signature */
        $customerEmail = array_key_exists('customer_email', $data) ? $data['customer_email'] : '';
        $customerName = array_key_exists('customer_name', $data) ? $data['customer_name'] : '';
        $companyName = array_key_exists('company_name', $data) ? $data['company_name'] : '';
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
        $this->apiClientContainer->signingViaEmail("$companyName Payroll Agreement", $filePath, $recipients);
        // remove document after signing, temporal....
        unlink($filePath);
      }
    }
  }
}

