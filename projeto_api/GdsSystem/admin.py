from django.contrib import admin

# Register your models here.

from .models import Profile
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class PerfilInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'


class UserAdmin(BaseUserAdmin):
    inlines = (PerfilInline, )


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
