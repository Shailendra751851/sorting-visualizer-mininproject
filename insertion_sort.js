function Insertion() {
    // Setting Time complexities
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    c_delay = 0;

    for (var j = 0; j < array_size; j++) {
        div_update(divs[j], div_sizes[j], "yellow"); // Color update for the current element

        var key = div_sizes[j];
        var i = j - 1;

        while (i >= 0 && div_sizes[i] > key) {
            div_update(divs[i], div_sizes[i], "red"); // Color update for comparison
            div_update(divs[i + 1], div_sizes[i + 1], "red"); // Color update for comparison

            div_sizes[i + 1] = div_sizes[i]; // Shift element
            div_update(divs[i], div_sizes[i], "red"); // Height update
            div_update(divs[i + 1], div_sizes[i + 1], "red"); // Height update

            div_update(divs[i], div_sizes[i], "blue"); // Reset color after comparison
            if (i == (j - 1)) {
                div_update(divs[i + 1], div_sizes[i + 1], "yellow"); // Highlight the current element
            } else {
                div_update(divs[i + 1], div_sizes[i + 1], "blue"); // Reset color of shifted element
            }

            // Play sound for the comparison and shift
            playNote(200 + div_sizes[i] * 5);

            i -= 1;
        }
        div_sizes[i + 1] = key;

        // Play sound for element insertion
        playNote(200 + key * 5);

        // Mark elements as sorted
        for (var t = 0; t < j; t++) {
            div_update(divs[t], div_sizes[t], "green"); // Color update to green
        }
    }
    div_update(divs[j - 1], div_sizes[j - 1], "green"); // Final element sorted

    enable_buttons(); // Enable buttons after sorting
}

// Function to play sound dynamically
function playNote(frequency, duration = 0.1, waveType = "") {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = waveType;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}
