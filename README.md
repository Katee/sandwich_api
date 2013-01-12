sandwich_api
============

API for ordering sandwiches.

Background
----------

All sandwiches come open face with Dempster 12 Grain bread.

Topping order is not guaranteed.

Order statuses are “queued”, “being made”, “ready for pickup”, “delivered” and “exception”.

Sandwiches are paid for on pickup, and probably don't cost very much due to productivity gains from technology.

It is impossible to speak with the sandwich maker though anything other than this API.

Client Usage
-------------

Get list of fillings.
>    curl -v http://localhost:8181/fillings

Create order with fillings 4 and 3.
>    curl -v -H "Content-Type: application/json" -X POST -d "{\"fillings\": [4,3]}" http://localhost:8181/order

Check order 0 status.
>    curl -v http://localhost:8181/order/0

Sandwich Maker Usage
--------------------

Update order 0 status.
>    curl -v -H "Content-Type: application/json" -X POST -d "{\"status\": \"in progress\", \"auth_key\": \"ABC123\"}" http://localhost:8181/order/0/status
