SELECT locations.id, locations.name, locations.latitude, locations.longitude, locations.district
FROM locations
JOIN location_permissions lp
ON lp.location = locations.id
WHERE lp.username = ${username}