def test_get_countries(client):
    resp = client.get('/v1/places/countries/1')
    assert resp.status_code == 200
    print(resp.json)


def test_get_regions(client):
    resp = client.get('/v1/places/regions/2')
    assert resp.status_code == 200
    print(resp.json)


def test_get_districts(client):
    resp = client.get('/v1/places/districts/1006')
    assert resp.status_code == 200
    print(resp.json)


def test_get_localities(client):
    resp = client.get('/v1/places/localities/7')
    assert resp.status_code == 200
    print(resp.json)


def test_get_sub_localities(client):
    resp = client.get('/v1/places/sub_localities/4')
    assert resp.status_code == 200
    print(resp.json)


def test_get_routes(client):
    resp = client.get('/v1/places/routes/1177')
    assert resp.status_code == 200
    print(resp.json)
