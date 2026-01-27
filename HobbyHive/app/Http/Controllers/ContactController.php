<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactAcknowledgement;
use App\Models\ContactPage;
use Illuminate\Support\Facades\Mail;


class ContactController extends Controller
{


 public function store(Request $request)
    {
        // request user data and validate
        $data = $request->validate([
            'Fname'   => ['required', 'string', 'max:255'],
            'Lname'   => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'phone'   => ['nullable', 'string', 'max:30'],
            'message' => ['required', 'string', 'max:5000'],
        ]);



        // Saves info to database
        $saved = ContactPage::create([
            'first_name' => $data['Fname'],
            'last_name'  => $data['Lname'],
            'email'      => $data['email'],
            'phone'      => $data['phone'] ?? null,
            'message'    => $data['message'],
        ]);

        // Email confirmation
        // Mail::to($saved->email)->send(new ContactAcknowledgement(
        //     firstName: $saved->first_name,
        //     teamMemberName: 'phil' 
        // ));

        return back()->with('Valid', 'Thanks! message recievd.');
    }
}

