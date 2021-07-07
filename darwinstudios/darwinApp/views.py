from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import EmailMultiAlternatives
from .models import Production, ProductionPics, Venue, VenuePics
from .forms import FormContacto
import json


def index(request):
    return render(request,"index.html")

def venues(request):
    venues=Venue.objects.all()
    return render(request,"venues.html", {"venues": venues})

def venues_info(request, venue_id):
    picsList=[]
    try:
        venue=Venue.objects.get(venue_id=venue_id)
        pics=VenuePics.objects.filter(venueName=venue)
        if pics:
            for p in pics:
                picsList.append(p.imageUrl)

    except ValueError:
        return HttpResponse(status=400)

    if request.method == "GET":
        response_data = {} 
        response_data['name'] = venue.name
        response_data['sketch'] = venue.sketch
        response_data['pics'] = picsList

        return HttpResponse(json.dumps(response_data), content_type="application/json") 

def productions(request, venue_id):
    venues=Venue.objects.all().order_by('venue_id')

    if venue_id !=0 :
        venue=Venue.objects.get(venue_id=venue_id)
        productions=Production.objects.filter(venue=venue).order_by('-prod_id')
    else :
        productions=Production.objects.all().order_by('-venue_id')

    return render(request,"productions.html", {"productions": productions, "venues": venues })


def prod_info(request, prod_id):
    picsList=[]
    try:
        production=Production.objects.get(prod_id=prod_id)
        pics=ProductionPics.objects.filter(production=production)
        if pics:
            for p in pics:
                picsList.append(p.imageUrl)
    except ValueError:
        return HttpResponse(status=400)

    if request.method == "GET":
        response_data = {} 
        response_data['name'] = production.name
        response_data['video'] = production.video
        response_data['pics'] = picsList
        
        return HttpResponse(json.dumps(response_data), content_type="application/json") 


def aboutUs(request):
    return render(request,"aboutUs.html")

def contact(request):
    if request.method=="POST":
        confirmation=""
        formulario=FormContacto(request.POST)   
        if formulario.is_valid():
            formulario.save()
            nombre=formulario.cleaned_data['nombre']
            email=formulario.cleaned_data['email']
            telefono=str(formulario.cleaned_data['telefono'])
            mensaje=formulario.cleaned_data['mensaje']
            text_content = "Nombre: "+nombre+"\n Email: "+email+"\n Teléfono: "+telefono+"\n Mensaje: "+mensaje
            html_content = "<div style='padding:2rem;background:black;color:white;font-size:1rem'><h1 style='color:#f8a52d'>Darwin Studios</h1><p>Nombre: "+nombre+"</p><p>Email: "+email+"</p><p>Teléfono: "+telefono+"</p><p>Mensaje:<br>"+mensaje+"</p></div>"
            msg = EmailMultiAlternatives("Consulta de "+nombre, text_content, "", ["mer-vs@hotmail.com"])
            msg.attach_alternative(html_content, "text/html")
            msg.send(fail_silently=False)
            confirmation="Thank you for the message!"
            return render(request,"contacto.html", {"formulario": FormContacto(), "confirmacion":confirmation})
        else:
            confirmation="Mensaje no enviado. Revisá que que tu e-mail esté escrito correctamente."
            return render(request,"contacto.html", {"formulario": FormContacto(request.POST), "confirmation":confirmation})
    else:
        formulario=FormContacto()
        mensaje=""
        return render(request,"contact.html",{"formulario": formulario})