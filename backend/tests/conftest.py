# encoding: utf-8
import pytest

from . import utils

from jqestate import create_app


@pytest.fixture(scope='session')
def app():
    app = create_app(app_config_name='testing')
    from jqestate.modules.database import db

    with app.app_context():
        # db.create_all()
        yield app
        # db.drop_all()


@pytest.fixture(scope='session')
def db(app):
    from jqestate.modules.database import db as db_instance
    yield db_instance


@pytest.fixture(scope='session')
def temp_db_instance_helper(db):
    def temp_db_instance_manager(instance):
        with db.session.begin():
            db.session.add(instance)

        yield instance

        mapper = instance.__class__.__mapper__
        assert len(mapper.primary_key) == 1
        instance.__class__.query \
            .filter(mapper.primary_key[0] == mapper.primary_key_from_instance(instance)[0]) \
            .delete()

    return temp_db_instance_manager


@pytest.fixture(scope='session')
def client(app):
    # app.test_client_class = utils.AutoAuthFlaskClient
    # app.response_class = utils.JSONResponse
    return app.test_client()


@pytest.fixture(scope='session')
def regular_user(temp_db_instance_helper):
    for _ in temp_db_instance_helper(
        utils.generate_user_instance(username='regular_user')):
        yield _


@pytest.fixture(scope='session')
def readonly_user(temp_db_instance_helper):
    for _ in temp_db_instance_helper(
        utils.generate_user_instance(username='readonly_user', is_regular_user=False)
    ):
        yield _


@pytest.fixture(scope='session')
def admin_user(temp_db_instance_helper):
    for _ in temp_db_instance_helper(
        utils.generate_user_instance(username='admin_user', is_admin=True)
    ):
        yield _


@pytest.fixture(scope='session')
def internal_user(temp_db_instance_helper):
    for _ in temp_db_instance_helper(
        utils.generate_user_instance(
            username='internal_user',
            is_regular_user=False,
            is_admin=False,
            is_active=True,
            is_internal=True
        )
    ):
        yield _
