<?php

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/PHPClass.php to edit this template
 */

namespace App\DocuSign\Facades;
use DocuSign\eSign\Configuration;
use DocuSign\eSign\Client\ApiClient;
use DocuSign\eSign\Api\EnvelopesApi;
use DocuSign\eSign\Model\EnvelopeDefinition;
use DocuSign\eSign\Model\Document;
use DocuSign\eSign\Model\Recipients;
use DocuSign\eSign\Client\ApiException; # $envelope_api->createEnvelope throw this

class ApiFacade {
  private $apiClient, $envelopeApi;

  public function __construct() {
    $config = new Configuration();
    $config->setHost(session('ds_base_path'));
    $config->addDefaultHeader('Authorization', 'Bearer ' . session('ds_access_token'));
    $this->apiClient = new ApiClient($config);
  }
  
  public function getApiClient() {
    return $this->apiClient;
  }
  
  /**
   * Getter for the EnvelopesApi
   */
  public function getEnvelopeApi(): EnvelopesApi {
    if (!$this->envelopeApi) {
      $this->envelopeApi = new EnvelopesApi($this->apiClient);
    }
    return $this->envelopeApi;
  }

  public function signingViaEmail(string $name, string $path, Recipients $recipients) {
    # 1. Create the envelope definition
    $envelope_definition = new EnvelopeDefinition([
      'email_subject' => $name,
    ]);
    $envelope_definition->setStatus('sent');
    $envelope_definition->setBrandId(env('DS_BRAND_ID'));
    $content_bytes = file_get_contents($path);
    $documentB64 = base64_encode($content_bytes);
    $document = new Document([  # create the DocuSign document object
      'document_base64' => $documentB64,
      'name' => $name,  # can be different from actual file name
      'file_extension' => 'pdf',  # many different document types are accepted
      'document_id' => '1'  # a label used to reference the doc
    ]);
    $envelope_definition->setDocuments([$document]);
    $envelope_definition->setRecipients($recipients);
    # 2. Create the envelope request object
    $envelope_api = $this->getEnvelopeApi();
    # 3. call Envelopes::create API method
    # Exceptions will be caught by the calling function
    try {
      $envelopeResponse = $envelope_api->createEnvelope(session('ds_account_id'), $envelope_definition);
    } catch (ApiException $ex) {
      throw new ApiException($ex->getMessage());
    }
    # 4. return envelope id
    return ['envelope_id' => $envelopeResponse->getEnvelopeId()];
  }
}
