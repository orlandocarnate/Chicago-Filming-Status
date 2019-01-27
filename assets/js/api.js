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
        filmingURL += "&$limit=20";
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
            var $startDate = $("<td>").text(response[i].applicationstartdate);
            var $endDate = $("<td>").text(response[i].applicationenddate);
            var $Location = $("<td>").text(response[i].streetname + ", From " + response[i].streetnumberfrom + " To " + response[i].streetnumberto);
            // if (response[i].websiteURL !== null) {
            //     var $URL = $("<td>").html("<a href=" + response[i].websiteURL + " target='_blank'>Charity Link</a>");
            // } else {
            //     var $URL = $("<td>").text("Not Available");
            // }
            $table.append($("<tr>").append($startDate, $endDate, $Location));
            
            $("#results").append($table);
        }
        $table.append($("<tr class='row-fill'>"));
    };

    filmDates("Racine");
    filmDates("Blue Island");
});
