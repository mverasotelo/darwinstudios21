from django.forms import ModelForm
from darwinApp.models import Contacto

class FormContacto(ModelForm):
    class Meta:
        model= Contacto
        exclude = ['fecha']

def __init__(self, *args, **kwargs):
    super(FormContacto, self).__init__(*args, **kwargs)
    self.fields['nombre'].widget.attrs.update({'class' : 'claseinput'})
    self.fields['email'].widget.attrs.update({'class' : 'claseinput'})
    self.fields['telefono'].widget.attrs.update({'class' : 'claseinput'})