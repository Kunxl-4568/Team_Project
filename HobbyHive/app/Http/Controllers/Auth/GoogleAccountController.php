<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleAccountController extends Controller
{
    public function redirect()
    {
        Log::info('Google redirect called');
        
        try {
            Log::info('Google config check', [
                'client_id_set' => !empty(config('services.google.client_id')),
                'client_secret_set' => !empty(config('services.google.client_secret')),
                'redirect_uri' => config('services.google.redirect'),
            ]);
            
            $redirectUrl = Socialite::driver('google')->redirect();
            
            Log::info('Google redirect URL generated successfully');
            
            return $redirectUrl;
            
        } catch (\Exception $e) {
            Log::error('Google redirect error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect('/login')->with('error', 'Google login unavailable: ' . $e->getMessage());
        }
    }

    public function callback()
    {
        Log::info('Google callback received');
        
        try {
            Log::info('Attempting to get Google user');
            $googleUser = Socialite::driver('google')->user();
            
            Log::info('Google user retrieved', [
                'id' => $googleUser->getId(),
                'email' => $googleUser->getEmail(),
                'name' => $googleUser->getName(),
            ]);

            // Check if user exists with this Google ID
            $user = User::where('google_id', $googleUser->getId())->first();

            if ($user) {
                Log::info('Existing Google user found', ['user_id' => $user->id]);
                Auth::login($user);
                return redirect()->intended('/');
            }

            // Check if user exists with this email
            $existingUser = User::where('email', $googleUser->getEmail())->first();

            if ($existingUser) {
                Log::info('Linking Google to existing email user', ['user_id' => $existingUser->id]);
                
                $existingUser->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]);

                Auth::login($existingUser);
                return redirect()->intended('/');
            }

            // Create new user
            Log::info('Creating new user from Google');
            
            $newUser = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'password' => Hash::make(Str::random(24)),
                'email_verified_at' => now(),
            ]);

            Log::info('New user created', ['user_id' => $newUser->id]);

            Auth::login($newUser);
            return redirect()->intended('/');

        } catch (\Exception $e) {
            Log::error('Google callback error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            // return redirect('/login')->with('error', 'Failed to login with Google: ' . $e->getMessage());
        }
    }
}