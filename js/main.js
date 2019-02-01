function link (path) {
    $(".container").fadeOut(300, function () {
        $(".loading").fadeIn(300);
        $(".container").load(path + " .blurb", function () {
            $(".loading").fadeOut(300, function () {
                $(".container").fadeIn(300);
            });
            p = path.replace("index.html", "");
            history.pushState(p, p, p);
        });
    });
}
/* function mute () {
    document.getElementById('player').muted = !document.getElementById('player').muted;
} */
