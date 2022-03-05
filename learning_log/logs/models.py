from django.db import models

# Create your models here.
class Topic(models.Model):
    """A topic the user is learning about"""
    text = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """Return a string representation of the model"""
        return self.text

class Entry(models.Model):
    """Something specific learned about a topic"""
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='entry')
    text = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        """
        META class holds extra information for managing a model
        This is telling Django to use Entries when it needs to refer to more than one entry in Admin; default is Entrys.
        """
        verbose_name_plural = 'entries'

    def __str__(self):
        """Return a string representation of the model with the first 50 characters"""
        return f"{self.text[:50]}..."