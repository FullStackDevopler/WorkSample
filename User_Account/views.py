import random
import re
import random
from django.db.models import Q
from django.shortcuts import render, redirect
from .models import Registered_user
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from datetime import timedelta
from django.core.exceptions import ValidationError
from django.http import HttpResponseRedirect
from django.db.models import F
from django.contrib.auth import update_session_auth_hash



@csrf_exempt
def validate_password(password):
    """this method will hold the code the validate the password inputted by user

    Args:
        password (string): password inputted by user

    Raises:
        ValidationError
    """
    min_length = 8
    regex = re.compile(
        f'^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{{{min_length},}}$'
    )
    if not regex.match(password):
        raise ValidationError(
            "The password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and be at least 8 characters long."
        )

def registration(request):
    """This function have the code to register new user and send an OTP on inputted email
    """
    context = None
    if request.method == 'POST':
        token = random.randint(100000, 999999)
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password =  request.POST.get('confirm_password')
        ip_address = request.META.get('REMOTE_ADDR')
        context = {
            'name': name,
            'email': email,
        }
        if not name:
            messages.error(request, "Please input the name")
        elif Registered_user.objects.filter(email=email).exists():
            messages.error(request, "Email already used")    
        elif Registered_user.objects.filter(username=name).exists():
            messages.error(request, "Username already exists")
        elif not email:
            messages.error(request, "Please input the email")
        elif not password:
            messages.error(request, "Please input the password")
        elif password != confirm_password:
            messages.error(request, "Password and Confirm password does not match")
        else:
            try:
                validate_password(password)
            except ValidationError as e:
                messages.error(request, e.message)
                return render(request, "registration.html")
            hashed_password =  make_password(password)
            instance = Registered_user.objects.create(
                email=email,
                password=hashed_password,
                token=token,
                username =  name,
                ip_address = ip_address,
                is_normal_user =  True,
                token_expiry = timezone.now() + timedelta(seconds=60),
            )
            instance.save()
            send_registration_email.delay(
                'Welcome to Your Website',
                'verify_email.html',
                {'code': token},
                'study4medicine@gmail.com',
                [email]
            )
            return redirect("process_verify_otp", email=email)
        
    return render(request, "registration.html", {'values': context})
@csrf_exempt
def process_verify_otp(request, email):
    """This method have the code of processing the otp and varifying it si valid or not

    Args:
        request (httpsresponse): client to server request

    Returns:
    """
    if request.method == 'POST':
        otp = request.POST.get('full_otp')
        if not otp:
            messages.error(request, "Please input the otp")
        user = Registered_user.objects.filter(token=otp).first()
        if user is not None and user.token_expiry > timezone.now():
            user.token = None
            user.token_expiry = None
            user.token_used=True
            user.save()
            login(request, user)
            messages.success(request, "User verified successfully")
            return redirect('/sign_in/')
        elif user is None:
            messages.error(request, 'Invalid OTP')
        else:
            messages.error(request, 'OTP has expired or already been used')
    return render(request, "verify_otp.html", {'email': email})
@csrf_exempt
def process_sign_in(request):
    admin_user_obj = None
    if request.method == "POST":
        username = request.POST.get('email')
        password = request.POST.get('password')
        if not username:
            messages.error(request, "Please input your registered email or username")
        elif not password:
            messages.error(request, "Please input your password")
        else:
            admin_user_obj = Registered_user.objects.filter(Q(username__iexact=username) | Q(email__iexact=username)).first()
            if not admin_user_obj:
                messages.error(request, 'Account not found')
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
            if admin_user_obj.status == "True":
                messages.error(request, "Your account is currently inactive.")
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
            auth_user = authenticate(request, username=username, password=password)
            if auth_user is not None:
                if auth_user.is_superuser:
                    login(request, auth_user)
                    return redirect('/admin/')
                email = auth_user.email
                if auth_user.is_normal_user: 
                    if auth_user.status == False:
                        if not auth_user.token_used:
                            token = random.randint(100000, 999999)
                            auth_user.token = token
                            auth_user.token_expiry = timezone.now() + timedelta(seconds=60)
                            auth_user.save()
                            send_registration_email.delay(
                                'Welcome to Your Website',
                                'verify_email.html',
                                {'code': token},
                                'study4medicine@gmail.com',
                                [email]
                            )
                            messages.info(request, "Enter the OTP sent to your registered email to verify")
                            return redirect('process_verify_otp', email = email)
                        login(request, auth_user)
                        return redirect('/dashboard/')
                    else:
                        messages.error(request, "Your account has been blocked by admin")
            else:
                messages.error(request, "Invalid Credentials")
    return render(request, "login.html")

@csrf_exempt
def resend_otp_register(request):
    """This method hold the code to resend the otp while registration

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    if request.method == 'POST':
        email = request.POST.get('email')
        user = Registered_user.objects.filter(email=email).first()
        if user:
            token = random.randint(100000, 999999)
            user.token = token
            user.token_expiry = timezone.now() + timezone.timedelta(minutes=1)
            user.save()
            send_registration_email.delay(
                'Welcome to Your Website',
                'verify_email.html',
                {'code': token},
                'study4medicine@gmail.com',
                [email]
            )
            messages.success(request, "Enter the OTP sent to your inputted email to verify")
        return redirect('process_verify_otp', email = email)





