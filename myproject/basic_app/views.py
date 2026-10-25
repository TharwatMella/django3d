from django.shortcuts import render

# Create your views here.
def landingPage(request):
    return render(request,"main.html")
def designPage(request):
    return render(request,"design.html")