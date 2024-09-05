**Django OTP Registration and Payment App**


**Overview**

This Django web application allows users to register for an account, receive a one-time password (OTP) via email, and verify their identity by entering the OTP. Upon successful verification, users are redirected to the dashboard. Additionally, the application integrates with Stripe to facilitate secure payments for exam purchases.
Features

User Registration: Users can sign up for an account by providing their email address and password.

OTP Verification: After registration, a one-time password (OTP) is sent to the user's email address. Users must enter the OTP within 1 minute to successfully verify their identity.

Dashboard: Upon successful OTP verification, users are redirected to the dashboard, where they can access various features and information.

Stripe Integration: The application utilizes Stripe for secure payment processing. Users can purchase exams by providing payment details through the integrated Stripe payment gateway.

Installation

Clone the repository:
        https://github.com/KontinuumKode/WorkSample.git
Navigate to the project directory:



    cd django-otp-registration-payment

Install the required dependencies:


    pip install -r requirements.txt

Apply database migrations:


    python manage.py migrate

Set up your Stripe API keys:

    Obtain your Stripe API keys from the Stripe Dashboard.
    Update the STRIPE_PUBLIC_KEY and STRIPE_SECRET_KEY in the settings.py file with your own keys.

Run the development server:

    python manage.py runserver

    Access the application in your web browser at http://127.0.0.1:8000/.

Usage

**Register for an account by providing your email address and password.**

**Check your email for the OTP sent to you.**

**Enter the OTP within 1 minute to successfully verify your identity.**

**Once verified, you will be redirected to the dashboard.**

**Navigate to the exam purchase section and make a payment using the integrated Stripe payment gateway.**
