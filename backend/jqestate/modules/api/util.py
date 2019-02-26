import six
import typing
import datetime
import requests

from xml.etree import ElementTree as etree


def is_it_necessary_to_update_exchange_rates():
    storage = is_it_necessary_to_update_exchange_rates
    now = datetime.datetime.now()

    if not hasattr(storage, 'last_date_measurement'):
        storage.last_date_measurement = now
        return True

    is_spend_time_more_than_a_day = (now - storage.last_date_measurement).days > 0
    if is_spend_time_more_than_a_day:
        storage.last_date_measurement = now
    return is_spend_time_more_than_a_day


def feel_MultiCurrencyPrice(currency, price):
    from .models.multi_currency_price import MultiCurrencyPrice
    if currency is None or price is None:
        return MultiCurrencyPrice(usd=None, eur=None, rub=None)
    storage = feel_MultiCurrencyPrice

    if is_it_necessary_to_update_exchange_rates():
        response = requests.get('http://www.cbr.ru/scripts/XML_daily.asp')
        root = etree.fromstring(response.text)
        storage.usd = float(root.find(".//Valute[@ID='R01235']/Value").text.replace(',', '.'))
        storage.eur = float(root.find(".//Valute[@ID='R01239']/Value").text.replace(',', '.'))

    if currency == 'RUB':
        return MultiCurrencyPrice(
            rub=price,
            usd=price / storage.usd,
            eur=price / storage.eur,
        )
    elif currency == 'USD':
        return MultiCurrencyPrice(
            rub=price * storage.usd,
            usd=price,
            eur=price * storage.usd / storage.eur,
        )
    elif currency == 'EUR':
        return MultiCurrencyPrice(
            rub=price * storage.eur,
            usd=price * storage.eur / storage.usd,
            eur=price,
        )


def _deserialize(data, klass):
    """Deserializes dict, list, str into an object.

    :param data: dict, list or str.
    :param klass: class literal, or string of class name.

    :return: object.
    """
    if data is None:
        return None

    if klass in six.integer_types or klass in (float, str, bool):
        return _deserialize_primitive(data, klass)
    elif klass == object:
        return _deserialize_object(data)
    elif klass == datetime.date:
        return deserialize_date(data)
    elif klass == datetime.datetime:
        return deserialize_datetime(data)
    elif type(klass) == typing._GenericAlias:
        if klass._name.lower() == 'list':
            return _deserialize_list(data, klass.__args__[0])
        if klass._name.lower() == 'dict':
            return _deserialize_dict(data, klass.__args__[1])
    else:
        return deserialize_model(data, klass)


def _deserialize_primitive(data, klass):
    """Deserializes to primitive type.

    :param data: data to deserialize.
    :param klass: class literal.

    :return: int, long, float, str, bool.
    :rtype: int | long | float | str | bool
    """
    try:
        value = klass(data)
    except UnicodeEncodeError:
        value = six.u(data)
    except TypeError:
        value = data
    return value


def _deserialize_object(value):
    """Return an original value.

    :return: object.
    """
    return value


def deserialize_date(string):
    """Deserializes string to date.

    :param string: str.
    :type string: str
    :return: date.
    :rtype: date
    """
    try:
        from dateutil.parser import parse
        return parse(string).date()
    except ImportError:
        return string


def deserialize_datetime(string):
    """Deserializes string to datetime.

    The string should be in iso8601 datetime format.

    :param string: str.
    :type string: str
    :return: datetime.
    :rtype: datetime
    """
    try:
        from dateutil.parser import parse
        return parse(string)
    except ImportError:
        return string


def deserialize_model(data, klass):
    """Deserializes list or dict to model.

    :param data: dict, list.
    :type data: dict | list
    :param klass: class literal.
    :return: model object.
    """
    instance = klass()

    if not instance.openapi_types:
        return data

    for attr, attr_type in six.iteritems(instance.openapi_types):
        if data is not None \
            and instance.attribute_map[attr] in data \
            and isinstance(data, (list, dict)):
            value = data[instance.attribute_map[attr]]
            setattr(instance, attr, _deserialize(value, attr_type))

    return instance


def _deserialize_list(data, boxed_type):
    """Deserializes a list and its elements.

    :param data: list to deserialize.
    :type data: list
    :param boxed_type: class literal.

    :return: deserialized list.
    :rtype: list
    """
    return [_deserialize(sub_data, boxed_type)
            for sub_data in data]


def _deserialize_dict(data, boxed_type):
    """Deserializes a dict and its elements.

    :param data: dict to deserialize.
    :type data: dict
    :param boxed_type: class literal.

    :return: deserialized dict.
    :rtype: dict
    """
    return {k: _deserialize(v, boxed_type)
            for k, v in six.iteritems(data)}


def bounds(min_val, max_val, value):
    return max(min_val, min(max_val, value))


def with_pagination(items, total, limit, offset):
    from .models.pagination import Pagination
    from .models.pagination_wrapper import PaginationWrapper
    return PaginationWrapper(list(items), Pagination(total, limit, offset))
