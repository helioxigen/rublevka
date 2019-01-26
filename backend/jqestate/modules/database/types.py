import re
import sqlalchemy.dialects

from citext import CIText

__all__ = ['ArrayForEnum', 'CIText']


class ArrayForEnum(sqlalchemy.dialects.postgresql.ARRAY):

    def bind_expression(self, bindvalue):
        return sqlalchemy.cast(bindvalue, self)

    def result_processor(self, dialect, coltype):
        super_rp = super(ArrayForEnum, self).result_processor(
            dialect, coltype)

        def handle_raw_string(value):
            inner = re.match(r"^{(.*)}$", value).group(1)
            return inner.split(",") if inner else []

        def process(value):
            if value is None:
                return None
            return super_rp(handle_raw_string(value))

        return process

    def __repr__(self):
        return 'my array'
