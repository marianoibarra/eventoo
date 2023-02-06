[
    {
        "id": "fcece2f7-61ab-413d-9c7f-108b04374a53",
        "name": "Evento",
        "description": "descripcion del eventocasdasdasdasdpisdhgfiusagfikuhsfiukhsdf",
        "start_date": "2023-02-05",
        "end_date": "2023-01-31",
        "start_time": null,
        "end_time": null,
        "isPublic": null,
        "virtualURL": null,
        "isPremium": null,
        "isPaid": null,
        "age_range": null,
        "guests_capacity": null,
        "placeName": null,
        "advertisingTime_start": "2023-01-31T00:00:00.000Z",
        "adversiting_end": "2023-01-31T00:00:00.000Z",
        "cover_pic": null,
        "disability_access": null,
        "parking": null,
        "smoking_zone": null,
        "pet_friendly": null,
        "createdAt": "2023-02-03T13:29:05.794Z",
        "updatedAt": "2023-02-03T13:29:06.252Z",
        "bankAccount": null,
        "address": {
            "address_line": "San Martin 1234",
            "city": "Rosario\n",
            "state": null,
            "country": null,
            "zip_code": null
        },
        "organizer": {
            "id": 2,
            "name": null,
            "last_name": null,
            "profile_pic": null
        },
        "category": {
            "name": "Sports",
            "modality": "Presential"
        }
    }
]



const filtros = {
    name: null,
    description: null,
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    isPremium: null,
    isPaid: null,
    age_range: null,
    guests_capacity: null,
    placeName: null,
    advertisingTime_start: null,
    adversiting_end: null,
    cover_pic: null,
    disability_access: null,
    parking: null,
    smoking_zone: null,
    pet_friendly: null,
    isToday: null,
    isNextWeekend: null,
    organizer: null, 
    category: null,
    modality: null,
    address_line: null,
    city: null,
    state: null,
    country: null,
    zip_code: null,
  };
  
  let query = {}
  
  for(let prop in filtros) {
    if(filtros[prop] !== null) {
      query[prop] = filtros[prop]
    }
  }
  
  for(let prop in query) {
    url += `&${prop}=${query[prop]}`
  }