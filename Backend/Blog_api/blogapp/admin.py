from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Blog

# Register your models here.
class CustomuserAdmin(UserAdmin):
    list_display = ("username","first_name","last_name","bio","profile_picture","facebook","youtube","instagram","twitter")
    
admin.site.register(CustomUser, CustomuserAdmin)



class BlogAdmin(admin.ModelAdmin):
    list_display =("title","is_draft","Category","created_at")
admin.site.register(Blog, BlogAdmin)

