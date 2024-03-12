# Contribution Guidelines

## Issue

**Sound Button Duplication #132**

If you win the game and undo the last move, then win again, the sound button duplicates itself.

## Solution

The solution involves modifying the `checkWinner` function to check if the sound button already exists before creating a new one. This prevents the duplication of the sound button.

### Code Modification

```javascript
const checkWinner = () => {
    // Existing code...

    if (loss1 == 1 || loss2 == 1 || draw1 == 1 || draw2 == 1) {
        // Check if the button already exists
        if (!document.getElementById("btn-sound")) {
            var btn = document.createElement("button");
            btn.id = "btn-sound";
            btn.className = "btn-sound";
            btn.innerHTML = "<i class='fa fa-volume-up' aria-hidden='true'></i>";
            btn.onclick = muteAudio;
            document.getElementsByClassName("div-end-of-game")[0].appendChild(btn);
        }
    }
};
