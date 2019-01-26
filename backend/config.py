# pylint: disable=too-few-public-methods,invalid-name,missing-docstring
import os


class BaseConfig:
    SECRET_KEY = os.getenv('SECRET_KEY')

    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

    # POSTGRESQL
    SQLALCHEMY_DATABASE_URI = 'postgresql://{user}:{password}@{host}:{port}/{name}'.format(
        user=os.getenv('POSTGRES_USER', ''),
        password=os.getenv('POSTGRES_PASSWORD', ''),
        host=os.getenv('POSTGRES_HOST', ''),
        port=os.getenv('POSTGRES_PORT', 5432),
        name=os.getenv('POSTGRES_DB', ''),
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
        'api',
        'database',
    )

    SWAGGER_UI_JSONEDITOR = True
    SWAGGER_UI_OAUTH_CLIENT_ID = 'documentation'
    SWAGGER_UI_OAUTH_REALM = "Authentication for Jqestate server documentation"
    SWAGGER_UI_OAUTH_APP_NAME = "Jqestate server documentation"

    # TODO: consider if these are relevant for this project
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProductionConfig(BaseConfig):
    SECRET_KEY = os.getenv('PRODUCT_SECRET_KEY') or BaseConfig.SECRET_KEY
    SQLALCHEMY_DATABASE_URI = os.getenv('PRODUCT_DATABASE_URI') or BaseConfig.SQLALCHEMY_DATABASE_URI


class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI') \
                              or 'postgresql://postgres:@192.168.99.100:32768/jqestate'
    DEBUG = True


class TestingConfig(BaseConfig):
    TESTING = True

    # Use in-memory SQLite database for testing
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
