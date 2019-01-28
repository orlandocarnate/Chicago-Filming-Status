$(document).ready(function () {

    var currentTime = moment().unix(); // get timestamp
    var convertedTime = moment(currentTime, "X").format("YYYY-MM-DD");
    $("#date").html(convertedTime);
    console.log(convertedTime);



    function filmDates(street) {
        var filmingURL = "https://data.cityofchicago.org/resource/k3tc-fe6r.json?"; // api endpoint
        // var transDeptPermitsURL = "https://data.cityofchicago.org/resource/erhc-fkv9.json"; // apit endpoint

        // FIELDS FROM BOTTOM PAGE: https://dev.socrata.com/foundry/data.cityofchicago.org/erhc-fkv9
        filmingURL += "&applicationstatus=Open";
        filmingURL += "&$where=applicationstartdate>='" + convertedTime + "'";
        filmingURL += "&$limit=50";
        // filmingURL += "&primarycontactlast=OPEN 4 BUSINESS PRODUCTIONS, LLC";
        // filmingURL += "&streetname='RACINE' OR streetname='BLUE ISLAND'";
        // filmingURL += "&streetname=RACINE";
        filmingURL += "&streetname='" + street.toUpperCase() + "'";
        filmingURL += "&$order=applicationstartdate ASC";


        // filmingURL += "&comments=1360 S BLUE ISLAND";
        console.log(filmingURL);

        // filming AJAX call
        $.ajax({
            url: filmingURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            tableGenerator(response, street);
        });
    };

    function tableGenerator(response, street) {
        var $table = $("#table-body");
        $table.append($("<tr class='row-fill'>").html("<h3>" + street + "</h3>"));
        for (i = 0; i < response.length; i++) {
            var start = moment(response[i].applicationstartdate, moment.ISO_8601).format("dddd, MMMM Do YYYY"); //2019-01-28T00:00:00
            var $startDate = $("<td>").text(start);
            var end = moment(response[i].applicationenddate, moment.ISO_8601).format("dddd, MMMM Do YYYY");
            var $endDate = $("<td>").text(end);
            var $Location = $("<td>").text(response[i].streetname + ", From " + response[i].streetnumberfrom + " To " + response[i].streetnumberto);
            $table.append($("<tr>").append($startDate, $endDate, $Location));
            
            $("#results").append($table);
        }
        $table.append($("<tr class='row-fill'>"));
    };

    filmDates("Racine");
    filmDates("Blue Island");
});
