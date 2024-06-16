<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class W4Mail extends Mailable
{
    use Queueable, SerializesModels;

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
        ->markdown('mail.w4')
        ->with($this->data)
        ->attach($this->path);
    }
}
