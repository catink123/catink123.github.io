function link (path) {
    $(".container").fadeOut(300, function () {
        $(".loading").fadeIn(300);
        $(".container").load(path + " .blurb", function () {
            $(".loading", function () {
                $(".container").fadeIn(300);
            })
        });
    });
}
/* function mute () {
    document.getElementById('player').muted = !document.getElementById('player').muted;
} */
