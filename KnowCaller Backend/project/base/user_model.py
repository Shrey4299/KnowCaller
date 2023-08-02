from django.db import models


# Create your models here.
class User(models.Model):
    id = models.AutoField("user id", primary_key=True)
    email = models.CharField(max_length=50)
    name = models.CharField(max_length=50, null=False, blank=False)
    phone_number = models.IntegerField(null=False,blank=False)
    spam = models.BooleanField(default=False)

    def __str__(self):
        return self.name
