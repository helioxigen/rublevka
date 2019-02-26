# encoding: utf-8
"""
Database
=======
Provide db and models to app
"""
__all__ = ['db', 'models']

from .core import db
from . import models as m_models
from . import tables
from . import views


def is_model(obj):
    return isinstance(obj, type) and issubclass(obj, db.Model)


class ModelStorage:
    def __init__(self):
        for name, cls in m_models.__dict__.items():
            if is_model(cls):
                setattr(self, name, cls)

    def model_names(self):
        return [name for name, cls in self.__dict__.items() if is_model(cls)]


models = ModelStorage()


def init_app(app, **kwargs):
    db.init_app(app)
    app.db = db
    app.models = models


__all__.extend(models.model_names())
