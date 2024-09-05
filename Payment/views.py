from django.shortcuts import render
from datetime import datetime
from django.utils import timezone
import stripe
from django.http import JsonResponse
from django.conf import settings
from payment.models import Exam_prices
from exam.models import Exams
from datetime import date
import json
from .models import Subscription_details
from django.contrib.auth.decorators import login_required
import requests
stripe.api_key = settings.STRIPE_SECRET_KEY

@login_required(login_url='/accounts/login/')
def get_exam_prices(request):
    """ 
    user will get the price of the selected exam's
    """
    selected_exam = request.GET.get('exam_name')
    try:
        exam = Exam_prices.objects.get(exam=selected_exam)
        prices = {
            "monthly": exam.monthly,
            "quarterly": exam.quarterly,
            "yearly": exam.yearly,
        }
        return JsonResponse(prices)
    except Exam_prices.DoesNotExist:
        error_response = {
            "error": f"Exam with name {selected_exam} does not exist."
        }
        return JsonResponse(error_response, status=404)

def show_plans(request):
    """ 
    This is to show the exam plan to the user
    """
    user = request.user
    subscribed_exams = Subscription_details.objects.filter(user_name=user)
    subscribed_exam_ids = [subscribed_exam.exam_name.id for subscribed_exam in subscribed_exams]
    exams = Exam_prices.objects.exclude(exam__id__in=subscribed_exam_ids)

    current_date = date.today()

    for subscription in subscribed_exams:
        if subscription.expiry_date and current_date > subscription.expiry_date:
            exams = exams | Exam_prices.objects.filter(exam=subscription.exam_name)
    for exam in exams:
        exam.monthly = f'£{exam.monthly/100:.2f}'
        exam.yearly = f'£{exam.yearly/100:.2f}'
        exam.quarterly = f'£{exam.quarterly/100:.2f}'
    for detail in subscribed_exams:
        detail.amount_gbp = detail.amount /100
    return render(request, "subscription.html", {'exams': exams, 'my_exams': subscribed_exams})

@login_required(login_url='/accounts/login/')
def create_checkout_session(request):
    """ 
    this method hold the code to make the payment 
    """
    data = json.loads(request.body)
    stripe_token = data.get('stripeToken')
    selected_price = data.get('selectedPrice')
    if selected_price is None:
        return JsonResponse({'error': 'selected_price is missing'})
    try:
        selected_price = int(float(selected_price) * 100)
        
        charge = stripe.Charge.create(
            amount=selected_price,
            currency='eur',
            source=stripe_token, 
            description='Custom Payment', 
        )
        return JsonResponse({'success': True, 'charge_id': charge.id})
    except stripe.error.StripeError as e:
        return JsonResponse({'error': str(e)})

def payment_details(request):
    """
    here system will get the payment details which he has made for that per
    """
    try:
        data = json.loads(request.body)
        charge_id = data.get('charge_Id')
        paymentTime = data.get('paymentTime')
        subcriptionType = data.get('subcriptionType')
        exam_id = data.get('examName')
        url = f"https://api.stripe.com/v1/charges/{charge_id}"
        headers = {
            'Authorization': 'Bearer '
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        payment_data = response.json()
        
        # Pass paymentTime, subcriptionType, and exam_id to the function
        save_payment_details(request, payment_data, paymentTime, subcriptionType, exam_id)

        return JsonResponse(payment_data)
    except requests.exceptions.RequestException as e:
        print('Error retrieving payment details:', e)
        return JsonResponse({'error': 'Failed to retrieve payment details'})
    except json.JSONDecodeError as e:
        print('Error decoding JSON:', e)
        return JsonResponse({'error': 'Failed to decode JSON response'})

def save_payment_details(request, payment_data, paymentTime, subcriptionType, exam_id):
    """this method will save the payment details to db

    Args:
        request (_type_): client to server request
        payment_data : system will get payment date
        paymentTime : system will get payment date
        subcriptionType : system will get Subscription type user has selected
        exam_id (int): id of the exam whose subscription user has buyed
    """
    user = request.user
    payment_date = datetime.now().date()
    exam_instance = Exams.objects.get(id=exam_id)
    payment_time_str = paymentTime
    try:
        payment_time_obj = datetime.strptime(payment_time_str, '%I:%M:%S %p')
    except ValueError:
        try:
            payment_time_obj = datetime.strptime(payment_time_str, '%H:%M:%S')
        except ValueError as e:
            return JsonResponse({'error': f'Invalid value: {str(e)}'}, status=400)
    formatted_payment_time = payment_time_obj.strftime('%H:%M:%S')
    if subcriptionType == "monthlyRadio":
        expiry_date = payment_date + timezone.timedelta(days=30)
    elif subcriptionType == "quarterlyRadio":
        expiry_date = payment_date + timezone.timedelta(days=122)
    elif subcriptionType == "yearlyRadio":
        expiry_date = payment_date + timezone.timedelta(days=365)
    else:
        return JsonResponse({'error': 'Invalid subscription type'}, status=400)
    Subscription_details.objects.create(
        subscription_type=subcriptionType,
        amount=payment_data.get('amount'),
        card_type=payment_data.get('payment_method_details', {}).get('card', {}).get('funding'),
        payment_date=payment_date,
        payment_time=formatted_payment_time,
        user_name=user,
        expiry_date=expiry_date,
        exam_name=exam_instance,
    )
    return JsonResponse({'success': 'Data saved'})

