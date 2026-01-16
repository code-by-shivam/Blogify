from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Blog


# ==================================================
# Custom User Admin
# ==================================================
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):

    model = CustomUser

    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "is_staff",
    )

    fieldsets = UserAdmin.fieldsets + (
        ("Additional Information", {
            "fields": (
                "bio",
                "job_title",
                "profile_picture",
                "facebook",
                "youtube",
                "instagram",
                "twitter",
                "linkedin",
            )
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Additional Information", {
            "fields": (
                "bio",
                "job_title",
                "profile_picture",
            )
        }),
    )


# ==================================================
# Blog Admin
# ==================================================
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "category",
        "is_draft",
        "created_at",
    )

    list_filter = ("category", "is_draft")
    search_fields = ("title",)
    prepopulated_fields = {"slug": ("title",)}
