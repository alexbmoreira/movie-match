import factory
from faker import Faker
from profiles.models import WatchlistMovie

from .user_factory import UserFactory

fake = Faker()


class WatchlistMovieFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = WatchlistMovie

    user = factory.SubFactory(UserFactory)
    movie = 4995
