from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Blog

User = get_user_model()


# ============================
# User Registration
# ============================
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


# ============================
# Update User Profile
# ============================
class UpdateUserprofileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id", "email", "username", "first_name", "last_name",
            "bio", "job_title",
            "profile_picture",
            "facebook", "youtube", "instagram", "twitter"
        ]

    def get_profile_picture(self, obj):
        return obj.profile_picture.url if obj.profile_picture else None


# ============================
# Simple Author Serializer (FOR BLOG)
# ============================
class SimpleAuthorSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "profile_picture"]

    def get_profile_picture(self, obj):
        return obj.profile_picture.url if obj.profile_picture else None


# ============================
# Blog Serializer
# ============================
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
            "Category",
            "content",
            "featured_image",
            "published_date",
            "created_at",
            "is_draft",
        ]

    def get_featured_image(self, obj):
        return obj.featured_image.url if obj.featured_image else None


# ============================
# User Profile Info (Profile Page)
# ============================
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
        blogs = Blog.objects.filter(author=user)[:9]
        return BlogSerializer(blogs, many=True).data
