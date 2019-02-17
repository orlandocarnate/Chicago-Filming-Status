$(document).ready(function () {

    var currentTime = moment().unix(); // get timestamp
    var convertedTime = moment(currentTime, "X").format("YYYY-MM-DD");
    $("#date").html(convertedTime);
    console.log(convertedTime);



    function filmDates() {
        var filmingURL = "https://data.cityofchicago.org/resource/k3tc-fe6r.json?"; // api endpoint
        // var transDeptPermitsURL = "https://data.cityofchicago.org/resource/erhc-fkv9.json"; // apit endpoint

        // FIELDS FROM BOTTOM PAGE: https://dev.socrata.com/foundry/data.cityofchicago.org/erhc-fkv9
        // filmingURL += "&applicationstatus=Open";
        filmingURL += "&$where=applicationenddate>='" + convertedTime + "'";
        // filmingURL += "AND applicationstatus=Open";
        // filmingURL += "AND (streetname='LEAVITT' OR streetname='SCHOOL')"; // test value
        // filmingURL += "AND (streetname='RACINE' OR streetname='BLUE ISLAND' OR streetname='14TH')"; // WORKS! 
        // filmingURL += "AND ((latitude<41.865504 OR latitude>41.861453) ";
        // filmingURL += "AND (longitude<-87.658612 OR longitude>-87.650662))";
        // filmingURL += "&$where=within_circle(location, 41.864527, -87.655950, 1600)";
        filmingURL += "AND within_circle(location, 41.8645, -87.656, 2000)";

        filmingURL += "&$limit=50";
        // filmingURL += "&primarycontactlast=OPEN 4 BUSINESS PRODUCTIONS, LLC";
        filmingURL += "&worktypedescription='Filming'";
        // filmingURL += "&streetname='RACINE'";
        // filmingURL += "&streetname='BLUE ISLAND'";

        // filmingURL += "&streetname='" + street.toUpperCase() + "'";
        filmingURL += "&$order=applicationstartdate ASC";

        // CHICAGO FIRE ENGINE 18 LAT, LONG: 41.864527, -87.655950
        // NW 41.865504, -87.658612
        // SE 41.861453, -87.650662


        // filmingURL += "&comments=1360 S BLUE ISLAND";
        console.log(filmingURL);

        // filming AJAX call
        $.ajax({
            url: filmingURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            tableGenerator(response);
        });
    };

    function tableGenerator(response) {
        var $table = $("#table-body");
        // http://maps.google.com/maps?q=41.865031753,-87.66229427380698 EXAMPLE URL QUERY
        for (i = 0; i < response.length; i++) {
            var $index = $("<td>").html(i);
            var $name = $("<td>").html(response[i].applicationname);
            var start = moment(response[i].applicationstartdate, moment.ISO_8601).format("dddd, MMMM Do YYYY"); //2019-01-28T00:00:00
            var $startDate = $("<td>").html(start);
            var end = moment(response[i].applicationenddate, moment.ISO_8601).format("dddd, MMMM Do YYYY");
            var $endDate = $("<td>").html(end);
            var googleMapsURL = "http://maps.google.com/maps?q=";
            googleMapsURL += response[i].latitude + "," + response[i].longitude;
            console.log(googleMapsURL);
            var $Location = $("<td>").html("<a href='" + googleMapsURL + "' target='_blank'>" + response[i].streetname + " " + response[i].suffix + ", From " + response[i].streetnumberfrom + " To " + response[i].streetnumberto + "</a>");
            var $comments = $("<td>").html(response[i].comments + "<br />" + response[i].detail);

            var map = "https://maps.googleapis.com/maps/api/";
            map +="staticmap?center=" + + response[i].latitude;
            map += "," + response[i].longitude + "&zoom=15"; //zoom street level 15
            map +="&markers=size:mid|" + response[i].latitude + "," 
            map += response[i].longitude
            map += "&size=150x150&key=AIzaSyBY" + "cRqyR9wypGR5";
            map +="T4e6A1_FHiIU11sYhLM";
            var $map = $("<img>").attr({"src": map});

            // $table.append($("<tr>").append($index, $name, $startDate, $endDate, $map, $comments));
            $table.append($("<tr>").append($startDate, $endDate, $map, $comments));

            $("#results").append($table);
        }
        $table.append($("<tr class='row-fill'>"));
    };

    filmDates();
    // filmDates("(Racine) OR (BLUE ISLAND)");
    // filmDates("Racine");
    // filmDates("Blue Island");
});

