from django.db import models

# Create your models here.

class Contacto(models.Model):
    nombre=models.CharField(max_length=30)
    email=models.EmailField()
    telefono=models.IntegerField(blank=True, null=True)
    mensaje=models.TextField()
    fecha=models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural= 'Contacts'

class Venue(models.Model):
    venue_id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=30)
    imageUrl=models.CharField(max_length=60)
    sketch=models.CharField(max_length=30, null=True, blank=True)

    class Meta:
        verbose_name_plural= 'Venues'

    def __str__(self):
        return self.name

class Production(models.Model):
    prod_id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=30)
    artist=models.CharField(max_length=50, null=True, blank=True)
    venue = models.ForeignKey(Venue, related_name="venue", on_delete=models.DO_NOTHING, null=True, blank=True)
    imageUrl=models.CharField(max_length=60, default="img/Exteriores.jpg")
    video=models.CharField(max_length=80, null=True, blank=True)
    timestamp=models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural= 'Productions'
        ordering = ['-timestamp']

    def __str__(self):
        return self.name

class ProductionPics(models.Model):
    imageUrl=models.CharField(max_length=60, default="img/Exteriores.jpg")
    production = models.ForeignKey(Production, related_name="production", on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural= 'Production Pics'

class VenuePics(models.Model):
    imageUrl=models.CharField(max_length=60, default="img/Exteriores.jpg")
    venueName = models.ForeignKey(Venue, related_name="venueName", on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural= 'Venue Pics'