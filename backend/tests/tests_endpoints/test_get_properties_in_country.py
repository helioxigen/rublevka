def test_get_country_properties(client):
    resp = client.get('/v1/properties/country')
    assert resp.status_code == 200
    print(resp.json)


def test_get_country_property(client):
    resp = client.get('/v1/properties/country/32')
    assert resp.status_code == 200
    print(resp.json)
