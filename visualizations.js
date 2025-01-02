var speed = 1000;

inp_aspeed.addEventListener("input", vis_speed);

function vis_speed() {
    var array_speed = inp_aspeed.value;
    switch (parseInt(array_speed)) {
        case 1: speed = 1; break;
        case 2: speed = 10; break;
        case 3: speed = 100; break;
        case 4: speed = 1000; break;
        case 5: speed = 10000; break;
    }

    delay_time = 10000 / (Math.floor(array_size / 10) * speed); // Decrease numerator to increase speed.
}

var delay_time = 10000 / (Math.floor(array_size / 10) * speed); // Decrease numerator to increase speed.
var c_delay = 0; // This is updated on every div change so that visualization is visible.

// const soundEffect = new Audio('adio2.mp3'); // Replace with the path to your audio file.
soundEffect.loop = false; // Ensure it does not loop by default

// Function to update the visualization and play sound during sorting
function div_update(cont, height, color) {
    window.setTimeout(function () {
        cont.style = " margin:0% " + margin_size + "%; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + height + "%; background-color:" + color + ";";
        
        // Play the sound effect on each update during sorting.
        if (soundEffect.paused) {
            soundEffect.currentTime = 0;  // Ensure the sound starts fresh
            soundEffect.play();
        }
    }, c_delay += delay_time);
}

// Function to stop the audio and re-enable the buttons
function enable_buttons() {
    window.setTimeout(function () {
        for (var i = 0; i < butts_algos.length; i++) {
            butts_algos[i].classList = [];
            butts_algos[i].classList.add("butt_unselected");

            butts_algos[i].disabled = false;
            inp_as.disabled = false;
            inp_gen.disabled = false;
            inp_aspeed.disabled = false;
        }
    }, c_delay += delay_time);

    // Stop the sound once the sorting is done (ensure it's after the final visual update)
    soundEffect.pause();
    soundEffect.currentTime = 0;  // Reset to start
}
