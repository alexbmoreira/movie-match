import factory
from faker import Faker
from profiles.models import Friendship

from .user_factory import UserFactory

fake = Faker()


class FriendshipFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Friendship

    user = factory.SubFactory(UserFactory)
    friend = factory.SubFactory(UserFactory)
