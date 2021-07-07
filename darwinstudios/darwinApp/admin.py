from django.contrib import admin
from .models import Contacto, Production, Venue, ProductionPics, VenuePics



# Register your models here.

class ContactoAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'nombre', 'email')
    readonly_fields = ['fecha']
    date_hierarchy = 'fecha'
    list_filter = ("email",)

class ProductionAdmin(admin.ModelAdmin):
    list_display = ('prod_id', 'name')

class VenueAdmin(admin.ModelAdmin):
    list_display = ('venue_id', 'name')

class ProductionPicsAdmin(admin.ModelAdmin):
    list_display = ('production', 'imageUrl')

class VenuePicsAdmin(admin.ModelAdmin):
    list_display = ('venueName', 'imageUrl')

admin.site.register(Contacto, ContactoAdmin)
admin.site.register(Production, ProductionAdmin)
admin.site.register(Venue, VenueAdmin)
admin.site.register(ProductionPics, ProductionPicsAdmin)
admin.site.register(VenuePics, VenuePicsAdmin)