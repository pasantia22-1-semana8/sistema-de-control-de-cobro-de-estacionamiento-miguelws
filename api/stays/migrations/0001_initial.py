# Generated by Django 4.0.4 on 2022-05-09 00:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('vehicles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Estancia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('esta_de_alta', models.BooleanField(default=False)),
                ('hora_entrada', models.DateTimeField(auto_now_add=True)),
                ('hora_salida', models.DateTimeField(auto_now=True)),
                ('esta_activo', models.BooleanField(default=True)),
                ('vehiculo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vehicles.vehiculo')),
            ],
        ),
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(auto_now_add=True)),
                ('esta_activo', models.BooleanField(default=True)),
                ('estancia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stays.estancia')),
            ],
        ),
        migrations.CreateModel(
            name='ProxyPago',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('stays.pago',),
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=255)),
                ('esta_activo', models.BooleanField(default=True)),
                ('pago', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stays.proxypago')),
            ],
        ),
    ]