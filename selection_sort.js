function Selection_sort() {
    // Setting Time Complexities
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N^2)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    let c_delay = 0;
    let audioCtx = null;

    // Initialize Audio Context
    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    // Continuous sound function
    function playContinuousSound(value, duration = 0.1) {
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        // Map array value to frequency (adjust range as needed)
        const frequency = 200 + value * 3;
        
        // oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        setTimeout(() => {
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            setTimeout(() => {
                oscillator.stop();
                oscillator.disconnect();
                gainNode.disconnect();
            }, 100);
        }, duration);
    }

    async function performSort() {
        try {
            initAudioContext();

            for (let i = 0; i < array_size - 1; i++) {
                // Play sound for current position
                playContinuousSound(div_sizes[i], delay_time);
                div_update(divs[i], div_sizes[i], "red");

                let index_min = i;

                for (let j = i + 1; j < array_size; j++) {
                    // Play sound for comparison
                    playContinuousSound(div_sizes[j], delay_time);
                    div_update(divs[j], div_sizes[j], "yellow");

                    if (div_sizes[j] < div_sizes[index_min]) {
                        if (index_min != i) {
                            div_update(divs[index_min], div_sizes[index_min], "blue");
                        }
                        index_min = j;
                        div_update(divs[index_min], div_sizes[index_min], "red");
                        // Play sound for new minimum
                        playContinuousSound(div_sizes[j], delay_time);
                    } else {
                        div_update(divs[j], div_sizes[j], "blue");
                    }

                    c_delay += delay_time;
                }

                if (index_min != i) {
                    // Swap elements
                    let temp = div_sizes[index_min];
                    div_sizes[index_min] = div_sizes[i];
                    div_sizes[i] = temp;

                    // Play swap sounds
                    playContinuousSound(div_sizes[i], delay_time);
                    div_update(divs[index_min], div_sizes[index_min], "red");
                    c_delay += delay_time;

                    playContinuousSound(div_sizes[index_min], delay_time);
                    div_update(divs[i], div_sizes[i], "red");
                    c_delay += delay_time;

                    div_update(divs[index_min], div_sizes[index_min], "blue");
                }
                div_update(divs[i], div_sizes[i], "green");
            }

            div_update(divs[array_size - 1], div_sizes[array_size - 1], "green");
            
            // Final completion sound
            playContinuousSound(800, delay_time * 2);
            
        } catch (error) {
            console.error("Error during sorting:", error);
        } finally {
            enable_buttons();
        }
    }

    // Start the sorting process
    performSort();
}