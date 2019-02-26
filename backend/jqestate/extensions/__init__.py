# encoding: utf-8
"""
Extensions setup
================

Extensions provide access to common resources of the application.

Please, put new extension instantiations and initializations here.
"""


def init_app(app):
    """
    Application extensions initialization.
    """

    from .logging import Logging
    logging = Logging()

    from . import cors

    for extension in (logging, cors):
        extension.init_app(app)
