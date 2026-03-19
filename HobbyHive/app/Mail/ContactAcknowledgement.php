<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactAcknowledgement extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
   public function __construct(
        public string $firstName,
        public string $teamMemberName
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'We received your message'
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-ack',
            with: [
                'firstName' => $this->firstName,
                'teamMemberName' => $this->teamMemberName,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
