from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from .forms import FileForm
from .models import File
from django.db.models import Q
# Create your views here.

def main(request):
    content = File.objects.all()
    template = 'index.html'
    context = {
        'content': content
    }
    return render(request, template, context)

def admin(request):
    
    file_form = FileForm()
    content = File.objects.all()
    
    if request.method == 'POST':
        file_form = FileForm(request.POST)
    
        if file_form.is_valid():
            file_form.save()
            return redirect("admin")
    
    template = 'admin.html'
    context = {
        'file_form': file_form,
        'content': content
    }
    return render(request, template, context)

def search(request):
    query = request.GET.get("q")
    content = File.objects.all()
    
    if query != '': 
        content = File.objects.filter(
            Q(name__icontains=query) | Q(content__name__icontains=query) | Q(content__semester__id__icontains=query)
            )
            
    context = {
        'content': content
    }
        
    template = 'search.html'
        
    return render(request, template, context)


def admin_search(request):
    query = request.GET.get("q")
    content = File.objects.all()
    
    if query != '': 
        content = File.objects.filter(
            Q(name__icontains=query) | Q(content__name__icontains=query) | Q(curator__name__icontains=query) | Q(content__semester__id__icontains=query)
            )
            
    context = {
        'content': content
    }
        
    template = 'admin_search.html'
        
    return render(request, template, context)