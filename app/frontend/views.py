from django.shortcuts import render


def index(request):
    # Django automatically looks for templates inside the templates folder
    return render(request, 'frontend/index.html')
