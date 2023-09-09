from django.db import models

# Create your models here.

class Semester(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length= 100, null=False)
    
    def __str__(self):
        return f"{self.id}{self.name}"

class Curator(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=300, null=False)
    email = models.EmailField(null=False)
    
    def __str__(self):
        return f"{self.name}"
    
class Content(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False)
    semester = models.ForeignKey(Semester, verbose_name= "", on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.semester} - {self.name}"
    
class File(models.Model):
    
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=355, null=False, verbose_name="")
    sender = models.CharField(max_length=355, null=False, verbose_name="")
    curator = models.ForeignKey(Curator, verbose_name="", on_delete= models.CASCADE)
    content = models.ForeignKey(Content, verbose_name= "", on_delete=models.CASCADE)
    uploadDate = models.DateField(null=False, verbose_name="")
    
    def __str__(self):
        return f"{self.content.semester} - {self.name}"