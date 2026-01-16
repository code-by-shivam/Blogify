from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Blog

User = get_user_model()

# ==================================================
# User Registration Serializer
# ==================================================
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
        ]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        # create_user handles password hashing safely
        user = User.objects.create_user(**validated_data)
        return user


# ==================================================
# Update User Profile Serializer
# (Logged-in user profile edit)
# ==================================================
class UpdateUserProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "bio",
            "job_title",
            "profile_picture",
            "facebook",
            "youtube",
            "instagram",
            "twitter",
            "linkedin",
        ]

    def get_profile_picture(self, obj):
        return obj.profile_picture.url if obj.profile_picture else None


# ==================================================
# Simple Author Serializer (Used inside Blog)
# ==================================================
class SimpleAuthorSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "profile_picture",
        ]

    def get_profile_picture(self, obj):
        return obj.profile_picture.url if obj.profile_picture else None


# ==================================================
# Blog Serializer
# ==================================================
class BlogSerializer(serializers.ModelSerializer):
    author = SimpleAuthorSerializer(read_only=True)
    featured_image = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = [
            "id",
            "title",
            "slug",
            "author",
            "category",
            "content",
            "featured_image",
            "is_draft",
            "published_date",
            "created_at",
            "updated_at",
        ]

    def get_featured_image(self, obj):
        return obj.featured_image.url if obj.featured_image else None


# ==================================================
# Blog Create / Update Serializer
# (for POST / PUT)
# ==================================================
class BlogCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            "title",
            "content",
            "category",
            "featured_image",
            "is_draft",
        ]


# ==================================================
# User Profile Page Serializer
# (User info + recent blogs)
# ==================================================
class UserInfoSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()
    author_posts = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "job_title",
            "bio",
            "profile_picture",
            "author_posts",
        ]

    def get_profile_picture(self, obj):
        return obj.profile_picture.url if obj.profile_picture else None

    def get_author_posts(self, user):
        blogs = Blog.objects.filter(author=user, is_draft=False)[:9]
        return BlogSerializer(blogs, many=True).data
