from django import forms
from django.db import models
from django.forms import fields
from .models import Topic, Entry

class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ['text']
        # tells django not to generate a label for the text field
        labels = {'text' : ''}

class EntryForm(forms.ModelForm):
    class Meta:
        model = Entry
        fields = ['text']
        labels = {'text' : ''}
        widgets = {'text': forms.Textarea(attrs={'cols': 80})}

