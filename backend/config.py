# pylint: disable=too-few-public-methods,invalid-name,missing-docstring
import os


class BaseConfig:
    SECRET_KEY = os.environ.get('SECRET_KEY')

    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

    SERVER_NAME = '0.0.0.0'

    # POSTGRESQL
    SQLALCHEMY_DATABASE_URI = 'postgresql://{user}:{password}@{host}:{port}/{name}'.format(
        user=os.environ.get('POSTGRES_USER'),
        password=os.environ.get('POSTGRES_PASSWORD'),
        host=os.environ.get('POSTGRES_HOST'),
        port=os.environ.get('POSTGRES_PORT', 5432),
        name=os.environ.get('POSTGRES_DB'),
    )

    # SQLITE
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///%s' % (os.path.join(PROJECT_ROOT, "example.db"))

    DEBUG = False
    ERROR_404_HELP = False

    REVERSE_PROXY_SETUP = os.getenv('API_REVERSE_PROXY_SETUP', False)

    AUTHORIZATIONS = {
        'oauth2_password': {
            'type': 'oauth2',
            'flow': 'password',
            'scopes': {},
            'tokenUrl': '/auth/oauth2/token',
        },
        # TODO: implement other grant types for third-party apps
        # 'oauth2_implicit': {
        #    'type': 'oauth2',
        #    'flow': 'implicit',
        #    'scopes': {},
        #    'authorizationUrl': '/auth/oauth2/authorize',
        # },
    }

    ENABLED_MODULES = (

    )

    SWAGGER_UI_JSONEDITOR = True
    SWAGGER_UI_OAUTH_CLIENT_ID = 'documentation'
    SWAGGER_UI_OAUTH_REALM = "Authentication for Jqestate server documentation"
    SWAGGER_UI_OAUTH_APP_NAME = "Jqestate server documentation"

    # TODO: consider if these are relevant for this project
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProductionConfig(BaseConfig):
    SECRET_KEY = os.getenv('EXAMPLE_API_SERVER_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('EXAMPLE_API_SERVER_SQLALCHEMY_DATABASE_URI')


class DevelopmentConfig(BaseConfig):
    DEBUG = True


class TestingConfig(BaseConfig):
    TESTING = True

    # Use in-memory SQLite database for testing
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
