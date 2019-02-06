# A Simple Web App that checks filming dates near the Chicago Fire Engine 18

## Overview
I created this web app to see when the series Chicago Fire is filming near my home so I know if I can park near the fire house.

## Resources:
* [City of Chicago Developer Page](http://dev.cityofchicago.org/)
* [Chicago Data Portal](https://data.cityofchicago.org/)
* [City of Chicago Filming Permits Page](https://data.cityofchicago.org/Community-Economic-Development/Filming-Permits-Transportation-Department-Map/k3tc-fe6r)
* [API Page](https://data.cityofchicago.org/resource/k3tc-fe6r.json)
* [SODA API Docs](https://dev.socrata.com/foundry/data.cityofchicago.org/pubx-yq2d)
* [Moment.js](https://momentjs.com/) for formatting current time
* [jQuery and AJAX](http://jquery.com/)

## Programmer's Notes
* The AJAX call sends a query string to the API with the following parameters:
    * Where application end date is greater than or equal to the current date.
    * AND within a radius to 2km or 1.25mi of a specific latitude and longitude location.
    * work type is 'Filming'
    * order by applicationn start date, descending.

* Originally I used street names as a query until I found out I could find info within a specific radius with the latitude and longitude as the center point: `within_circle(location, 41.8645, -87.656, 600)`.
    * Parameters: `within_circle(location, latitude, longitude, 'radius in meters')`