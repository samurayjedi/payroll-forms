<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ServiceAgreement extends Mailable
{
    use Queueable, SerializesModels;
    
    private $data, $path;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $data, string $path) {
      $this->data = $data;
      $this->path = $path;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build() {
      return $this
        ->markdown('mail.serviceagreement')
        ->with($this->data)
        ->attach($this->path);
    }
}
