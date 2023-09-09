from django.contrib import admin
from .models import File, Curator, Content, Semester

# Register your models here.

admin.site.register(Semester)
admin.site.register(Content)
admin.site.register(Curator)
admin.site.register(File)