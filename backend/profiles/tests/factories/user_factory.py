import factory
from faker import Faker
from profiles.models import User

fake = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    first_name = fake.first_name()
    last_name = fake.last_name()
    username = fake.simple_profile()['username']
    email = fake.ascii_email()
    is_staff = False
