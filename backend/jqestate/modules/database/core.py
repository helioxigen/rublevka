import json

import sqlalchemy

from flask_sqlalchemy import SQLAlchemy as BaseSQLAlchemy, \
    _EngineConnector, _record_queries, _EngineDebuggingSignalEvents
from sqlalchemy.engine.url import make_url

from .encoder import JSONEncoder


class EngineConnector(_EngineConnector):
    def get_engine(self):
        with self._lock:
            uri = self.get_uri()
            echo = self._app.config['SQLALCHEMY_ECHO']
            if (uri, echo) == self._connected_for:
                return self._engine
            info = make_url(uri)
            options = {'convert_unicode': True,
                       'json_serializer': lambda el, *args, **kwargs: json.dumps(el, *args, cls=JSONEncoder, **kwargs)}
            self._sa.apply_pool_defaults(self._app, options)
            self._sa.apply_driver_hacks(self._app, info, options)
            if echo:
                options['echo'] = echo
            self._engine = rv = sqlalchemy.create_engine(info, **options)
            if _record_queries(self._app):
                _EngineDebuggingSignalEvents(self._engine,
                                             self._app.import_name).register()
            self._connected_for = (uri, echo)
            return rv


class SQLAlchemy(BaseSQLAlchemy):
    def make_connector(self, app=None, bind=None):
        """Creates the connector for a given state and bind."""
        return EngineConnector(self, self.get_app(app), bind)


db = SQLAlchemy()
