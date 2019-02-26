import pytest


@pytest.mark.dependency()
def test_create(client):
    test_data = """
{
  "updatedAt": "2019-01-25T17:43:24.510649+03:00",
  "communication": {
    "sewerageSupply": "central",
    "gasSupply": "mains",
    "powerSupply": 25,
    "waterSupply": "central"
  },
  "location": {
    "latitude": "55.72283",
    "settlementId": 1,
    "longitude": "37.156145",
    "house": "11",
    "street": null
  },
  "externalId": null,
  "rentOffer": {
    "priceDelta": null,
    "agentFixedPrice": null,
    "price": 35000,
    "agentFee": 50.0,
    "currency": "USD",
    "isAllowedChildren": false,
    "isAllowedPets": false,
    "isDisabled": false,
    "deposit": 3,
    "period": "year"
  },
  "state": "public",
  "saleOffer": {
    "isMortgage": false,
    "priceDelta": null,
    "agentFixedPrice": null,
    "price": 800000000,
    "agentFee": 4.0,
    "isBargain": false,
    "isResale": true,
    "currency": "RUB",
    "kind": "direct_sell",
    "isDisabled": false,
    "isInstallment": false
  },
  "clientLeadId": null,
  "linkedContactIds": [
    5469
  ],
  "additionalDetails": {
    "garageArea": null,
    "parkingArea": 5.0,
    "bathhouseArea": null,
    "staffHouseArea": null,
    "spaArea": null,
    "securityHouseArea": null,
    "guestHouseArea": null
  },
  "stateDetails": {
    "reason": null
  },
  "responsibleUser": {
    "departmentId": 14,
    "id": 77,
    "divisionId": null
  },
  "createdByUserId": 27,
  "layoutImages": [],
  "specification": {
    "loggias": null,
    "bedrooms": 7,
    "area": 1400.0,
    "elevators": null,
    "balconies": null,
    "roofMaterial": "soft_tile",
    "legacyLayouts": [
      {
        "number": null,
        "kind": "base",
        "items": [
          "кинозал",
          "бильярдная",
          "бар",
          "постирочная",
          "гардеробная"
        ]
      },
      {
        "number": 1,
        "kind": "floor",
        "items": [
          "бассейн",
          "СПА зона",
          "сауна",
          "2 кухни",
          "гостиная с камином",
          "терраса",
          "гараж на 2 машины",
          "2 комнаты",
          "2 спальни",
          "2 ванные комнаты"
        ]
      },
      {
        "number": 2,
        "kind": "floor",
        "items": [
          "спальня",
          "гардеробная",
          "2 спальни",
          "2 комнаты",
          "библиотека"
        ]
      },
      {
        "number": 3,
        "kind": "floor",
        "items": [
          "гостиная с камином",
          "столовая",
          "2 спальни",
          "тренажерный зал"
        ]
      }
    ],
    "renovate": "full_construction",
    "layouts": {
      "spa_zone": 1,
      "office": 1,
      "technical_room": 1,
      "staff_room": 1,
      "dining_room": 1,
      "game_room": 1,
      "working_kitchen": 1,
      "kitchen": 2,
      "dressing_room": 4,
      "storage": 1,
      "utility_room": 1,
      "movie_theater": 1,
      "living_room": 2,
      "gym": 1
    },
    "wcs": 5,
    "rooms": null,
    "ceilingHeight": null,
    "withVentilation": false,
    "wallMaterial": "brick",
    "condition": "great",
    "floors": 4,
    "furniture": "full",
    "builtYear": 2009,
    "spaces": [],
    "withConditioning": true
  },
  "id": 715,
  "removalOrderId": null,
  "updatedByUserId": 108,
  "createdAt": "2013-06-18T22:54:29+04:00",
  "badge": null,
  "category": "country",
  "equipment": [
    "internet",
    "phone",
    "appliances",
    "tv",
    "washmachine",
    "fridge"
  ],
  "kind": "house",
  "images": [
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-df748ba0",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-2013e69c",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-8fa17115",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-ef51f3d4",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-1a15e4f8",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-d585337b",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-4af028f9",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-e4c9406b",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-ed0ca856",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-07297051",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-42d1a4e3",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-f69a2391",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-a68228c7",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-8ba9dba5",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-72de11fa",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": null,
      "id": "PRI715-21347828",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-1a0c7745",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-92974cd1",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-465fcd3b",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-82cf0dcd",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-1a136222",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-60ba6d61",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-6bb8c9b0",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-3107c439",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-6ac01997",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-f900b770",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-85e39174",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-bf3dea8b",
      "comment": null,
      "width": 2983
    }
  ],
  "landDetails": {
    "area": 50.0,
    "landscapeKind": [
      "forest"
    ],
    "landscaping": true
  }
}"""

    resp = client.post('/v1/properties/country',
                       content_type='application/json',
                       data=test_data)
    assert resp.status_code // 100 == 2


@pytest.mark.dependency(depends=['test_create', ])
def test_update(client):
    test_data = """
{
  "communication": {
    "sewerageSupply": "central",
    "gasSupply": "mains",
    "powerSupply": 25,
    "waterSupply": "central"
  },
  "location": {
    "latitude": "55.72283",
    "settlementId": 1,
    "longitude": "37.156145",
    "house": "11",
    "street": null
  },
  "externalId": null,
  "rentOffer": {
    "priceDelta": null,
    "agentFixedPrice": null,
    "price": 35000,
    "agentFee": 50.0,
    "currency": "USD",
    "isAllowedChildren": false,
    "isAllowedPets": false,
    "isDisabled": false,
    "deposit": 3,
    "period": "year"
  },
  "state": "public",
  "saleOffer": {
    "isMortgage": false,
    "priceDelta": null,
    "agentFixedPrice": null,
    "price": 800000000,
    "agentFee": 4.0,
    "isBargain": false,
    "isResale": true,
    "currency": "RUB",
    "kind": "direct_sell",
    "isDisabled": false,
    "isInstallment": false
  },
  "clientLeadId": null,
  "linkedContactIds": [
    5469
  ],
  "additionalDetails": {
    "garageArea": null,
    "parkingArea": 5.0,
    "bathhouseArea": null,
    "staffHouseArea": null,
    "spaArea": null,
    "securityHouseArea": null,
    "guestHouseArea": null
  },
  "stateDetails": {
    "reason": null
  },
  "responsibleUser": {
    "departmentId": 14,
    "id": 77,
    "divisionId": null
  },
  "createdByUserId": 27,
  "layoutImages": [],
  "specification": {
    "loggias": null,
    "bedrooms": 7,
    "area": 1400.0,
    "elevators": null,
    "balconies": null,
    "roofMaterial": "soft_tile",
    "legacyLayouts": [
      {
        "number": null,
        "kind": "base",
        "items": [
          "кинозал",
          "бильярдная",
          "бар",
          "постирочная",
          "гардеробная"
        ]
      },
      {
        "number": 1,
        "kind": "floor",
        "items": [
          "бассейн",
          "СПА зона",
          "сауна",
          "2 кухни",
          "гостиная с камином",
          "терраса",
          "гараж на 2 машины",
          "2 комнаты",
          "2 спальни",
          "2 ванные комнаты"
        ]
      },
      {
        "number": 2,
        "kind": "floor",
        "items": [
          "спальня",
          "гардеробная",
          "2 спальни",
          "2 комнаты",
          "библиотека"
        ]
      },
      {
        "number": 3,
        "kind": "floor",
        "items": [
          "гостиная с камином",
          "столовая",
          "2 спальни",
          "тренажерный зал"
        ]
      }
    ],
    "renovate": "full_construction",
    "layouts": {
      "spa_zone": 1,
      "office": 1,
      "technical_room": 1,
      "staff_room": 1,
      "dining_room": 1,
      "game_room": 1,
      "working_kitchen": 1,
      "kitchen": 2,
      "dressing_room": 4,
      "storage": 1,
      "utility_room": 1,
      "movie_theater": 1,
      "living_room": 2,
      "gym": 1
    },
    "wcs": 5,
    "rooms": null,
    "ceilingHeight": null,
    "withVentilation": false,
    "wallMaterial": "brick",
    "condition": "great",
    "floors": 4,
    "furniture": "full",
    "builtYear": 2009,
    "spaces": [],
    "withConditioning": true
  },
  "id": 715,
  "removalOrderId": null,
  "updatedByUserId": 108,
  "createdAt": "2013-06-18T22:54:29+04:00",
  "badge": null,
  "category": "country",
  "equipment": [
    "internet",
    "phone",
    "appliances",
    "tv",
    "washmachine",
    "fridge"
  ],
  "kind": "house",
  "images": [
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-df748ba0",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-2013e69c",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-8fa17115",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-ef51f3d4",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-1a15e4f8",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-d585337b",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-4af028f9",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-e4c9406b",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-ed0ca856",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-07297051",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-42d1a4e3",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-f69a2391",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-a68228c7",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-8ba9dba5",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-72de11fa",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": null,
      "id": "PRI715-21347828",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-1a0c7745",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-92974cd1",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-465fcd3b",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-82cf0dcd",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-1a136222",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-60ba6d61",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-6bb8c9b0",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-3107c439",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-6ac01997",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-f900b770",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-85e39174",
      "comment": null,
      "width": 2983
    },
    {
      "height": 1980,
      "isPublic": true,
      "id": "PRI715-bf3dea8b",
      "comment": null,
      "width": 2983
    }
  ],
  "landDetails": {
    "area": 50.0,
    "landscapeKind": [
      "forest"
    ],
    "landscaping": true
  }
}"""

    resp = client.put('/v1/properties/country/1',
                      content_type='application/json',
                      data=test_data)
    assert resp.status_code // 100 == 2


@pytest.mark.dependency(depends=['test_update', ])
def test_delete(client):
    resp = client.delete('/v1/properties/country/1')
    assert resp.status_code // 100 == 2
