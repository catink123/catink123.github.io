function link (path) {
    $(".container").fadeOut(300, function () {
        $(".container").load(path + " .blurb", function () {
            $(".container").fadeIn(300);
        });
    });
}
/* function mute () {
    document.getElementById('player').muted = !document.getElementById('player').muted;
} */
