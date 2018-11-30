// function to search Youtube for relevant videos based on the 'order' parameter
// The order parameter specifies the method that will be used to order resources in the API response. Options are: 'relevance', 'viewCount', 'rating', 'date', 'title', 'videoCount'
// Using Javascript built-in object 'Promise' helps to return the result from AJAX query because AJAX is asynchronous.
function getVideos(searchText = "", order = "", maxResults = 5) {
    return new Promise(function (resolve) {
        var videoIDArr = [];

        if (searchText !== "") {
            var part = "snippet";
            var apiKey = "AIzaSyDRoM4iF7sZ807Iv__tG3KzEa2hRNBXHbM";
            var queryUrl = "https://www.googleapis.com/youtube/v3/search";

            var queryParams = "?" + $.param({
                key: apiKey,
                q: searchText,
                part: part,
                order: order,
                maxResults: maxResults,
                type: "video",
                rel: "cooking",
            });

            var queryUlrWithParams = queryUrl + queryParams;
            // console.log(queryUlrWithParams);

            $.ajax({
                url: queryUlrWithParams,
                method: "GET"
            }).then(function (response) {
                // console.log(response);
                for (var i = 0; i < maxResults; i++) {
                    videoIDArr.push(response.items[i].id.videoId);
                };
                // console.log(videoIDArr);

                resolve(videoIDArr);   // return 'videoIDArr
            });
        };
    });

};

$(document).ready(function () {

    $("#search-btn").on("click", function (e) {
        e.preventDefault(); //!!!IMPORTANT!!!

        var searchText = $("#search").val().trim();
        var order = "viewCount";

        var videoID = getVideos(searchText, order, 5);
        // console.log("video ID is", videoID); // This console.log returns Promise

        // 'videoIDArrReturned' is the result returned from the function 'getVideos'.
        // Using Javascript built-in object 'Promise' helps to return the result from AJAX query because AJAX is asynchronous.
        videoID.then(function (videoIDArrReturned) {
            // console.log("result is ", videoIDArr);
            $(".embedVideo").text("");

            for (var i = 0; i < videoIDArrReturned.length; i++) {
                var srcVideo = "https://www.youtube.com/embed/" + videoIDArrReturned[i];
                console.log(srcVideo);

                var iframe = $("<iframe>");
                iframe.attr("id", "video" + i);
                iframe.attr("width", 320);
                iframe.attr("height", 180);
                iframe.attr("frameborder", 1);
                iframe.attr("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen");
                iframe.attr("src", srcVideo);

                $(".embedVideo").append(iframe);
            };


        });
    });
});