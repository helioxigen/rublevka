def test_get_countries(client):
    resp = client.get('/v1/places/countries')
    assert resp.status_code == 200
    print(resp.json)


def test_get_regions(client):
    resp = client.get('/v1/places/regions')
    assert resp.status_code == 200
    print(resp.json)


def test_get_districts(client):
    resp = client.get('/v1/places/districts')
    assert resp.status_code == 200
    print(resp.json)


def test_get_localities(client):
    resp = client.get('/v1/places/localities')
    assert resp.status_code == 200
    print(resp.json)


def test_get_sub_localities(client):
    resp = client.get('/v1/places/sub_localities')
    assert resp.status_code == 200
    print(resp.json)


def test_get_routes(client):
    resp = client.get('/v1/places/routes')
    assert resp.status_code == 200
    print(resp.json)
