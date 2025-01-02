function Merge() {
    // Setting Time and Space Complexities
    document.getElementById("Time_Worst").innerText = "O(N log N)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(N)";

    c_delay = 0;

    // Initialize Audio Context
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Function to play a sound dynamically
    function playNote(frequency, delay, waveType = "sine", duration = 0.1) {
        window.setTimeout(() => {
            const oscillator = audioCtx.createOscillator();
            oscillator.type = waveType;
            oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + duration);
        }, delay);
    }

    merge_partition(0, array_size - 1);

    enable_buttons();
}

function merge_sort(start, mid, end) {
    var p = start, q = mid + 1;
    var Arr = [], k = 0;

    for (var i = start; i <= end; i++) {
        if (p > mid) {
            Arr[k++] = div_sizes[q++];
            div_update(divs[q - 1], div_sizes[q - 1], "red"); // Highlight
            playNote(200 + div_sizes[q - 1] * 5, c_delay); // Play sound for right partition
        } else if (q > end) {
            Arr[k++] = div_sizes[p++];
            div_update(divs[p - 1], div_sizes[p - 1], "red"); // Highlight
            playNote(200 + div_sizes[p - 1] * 5, c_delay); // Play sound for left partition
        } else if (div_sizes[p] < div_sizes[q]) {
            Arr[k++] = div_sizes[p++];
            div_update(divs[p - 1], div_sizes[p - 1], "red"); // Highlight
            playNote(200 + div_sizes[p - 1] * 5, c_delay); // Play sound for left partition
        } else {
            Arr[k++] = div_sizes[q++];
            div_update(divs[q - 1], div_sizes[q - 1], "red"); // Highlight
            playNote(200 + div_sizes[q - 1] * 5, c_delay); // Play sound for right partition
        }
        c_delay += delay_time;
    }

    for (var t = 0; t < k; t++) {
        div_sizes[start++] = Arr[t];
        div_update(divs[start - 1], div_sizes[start - 1], "green"); // Update visuals
        playNote(300 + div_sizes[start - 1] * 5, c_delay); // Play sound for merged element
        c_delay += delay_time;
    }
}

function merge_partition(start, end) {
    if (start < end) {
        var mid = Math.floor((start + end) / 2);
        div_update(divs[mid], div_sizes[mid], "yellow"); // Highlight middle
        playNote(440, c_delay, "triangle"); // Play sound for partitioning
        c_delay += delay_time;

        merge_partition(start, mid);
        merge_partition(mid + 1, end);

        merge_sort(start, mid, end);
    }
}
