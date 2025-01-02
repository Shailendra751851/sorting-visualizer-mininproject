
function Bubble() {
    // Set Time and Space Complexities
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    c_delay = 0;
    // Function to play pre-recorded audio files
    function playCustomSound(audioFilePath, delay) {
        window.setTimeout(() => {
            // const audio = new Audio('audio1.mp3'); // Replace with the path to your custom audio file
            audio.volume = 0.3; // Adjust volume
            // audio.play();
        }, delay);
    }

    // Bubble Sort Logic
    for (var i = 0; i < array_size - 1; i++) {
        for (var j = 0; j < array_size - i - 1; j++) {
            div_update(divs[j], div_sizes[j], "yellow"); // Highlight comparison

            if (div_sizes[j] > div_sizes[j + 1]) {
                div_update(divs[j], div_sizes[j], "red"); // Highlight swap
                div_update(divs[j + 1], div_sizes[j + 1], "red");

                // Swap elements
                var temp = div_sizes[j];
                div_sizes[j] = div_sizes[j + 1];
                div_sizes[j + 1] = temp;

                div_update(divs[j], div_sizes[j], "red"); // Update visuals
                div_update(divs[j + 1], div_sizes[j + 1], "red");
                playNote(200 + div_sizes[j + 1] * 5, c_delay);
            }

            div_update(divs[j], div_sizes[j], "blue"); // Reset color
            c_delay += delay_time;
        }
        div_update(divs[j], div_sizes[j], "green"); // Mark as sorted
    }

    div_update(divs[0], div_sizes[0], "green"); // Mark the first element as sorted

    enable_buttons(); // Re-enable buttons after sorting
}
