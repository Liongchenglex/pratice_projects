# Generated by Django 3.2.8 on 2022-01-16 13:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0002_item'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='invoice',
            options={'ordering': ('-created_at',)},
        ),
    ]