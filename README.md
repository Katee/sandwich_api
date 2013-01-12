sandwich_api
============

API for ordering sandwiches.

Example usages with curl:

check fillings:
curl -v http://localhost:8181/fillings

create order with fillings 4 and 3:
curl -v -H "Content-Type: application/json" -X POST -d "{\"fillings\": [4,3]}" http://localhost:8181/order

check order 0:
curl -v http://localhost:8181/order/0

update order 0 status:
curl -v -H "Content-Type: application/json" -X POST -d "{\"status\": \"in progress\", \"auth_key\": \"ABC123\"}" http://localhost:8181/order/0/status