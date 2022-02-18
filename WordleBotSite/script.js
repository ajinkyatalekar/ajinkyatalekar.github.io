// Colors
var idleColor = "#121213";
var unusedColor = "#3a3a3c";
var halfUsedColor= "#b59f3b";
var correctColor = "#538d4e";
// var wrongColor = "rgb(255, 80, 80)";
var wrongColor = "#db4949";
var boxes;
var boxesState;
var current; // int

function main() {
    boxes = document.getElementsByClassName("txt");
    boxesState = [];
    current = 0;
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = idleColor;
        boxes[i].style.borderColor = unusedColor;
        boxes[i].value = "";
        boxesState[i] = -1;
        boxes[i].addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
    }

    // nextStep();
}

function nextStep() {
    var cw;

    if (current != 0) {
        newWord();
        cw = getWord();
    } else {
        wordleMain();
        cw = getWord();
    }

    if (cw == null) {
        cw = "error"
        for (var i = 5*current; i < 5*current + 5; i++) {
            boxes[i].style.backgroundColor = wrongColor;
            boxes[i].style.borderColor = wrongColor;
            boxes[i].value=cw[i - 5*current].toUpperCase();
        }
        return;
    }
    
    for (var i = 5*current; i < 5*current + 5; i++) {
        boxesState[i] = 0;
        boxes[i].style.backgroundColor = unusedColor;
        boxes[i].style.borderColor = unusedColor;
        boxes[i].value=cw[i - 5*current].toUpperCase();

        if (current > 0) {
            if (boxesState[i-5] == 2) {
                boxesState[i] = 2;
                boxes[i].style.backgroundColor = correctColor;
                boxes[i].style.borderColor = correctColor;
            }
        }
    }
    current++;

    console.log(cw)
}

    var words; // String array

    var conf; // String array
    var confNon; //String array
    var confHalf; // Letter array

    function wordleMain() {
        conf = [];
        confNon = [];
        confHalf = [];
    }

    function newWord() {
        for (var i = 0; i < 5; i++) {
            var c = boxes[(current-1)*5+i].value.toLowerCase();
            var cs = boxesState[(current-1)*5+i]
    
                if (cs == 0) {
                    if (!confNon.includes(c))
                        confNon.push(c);
                } else
                if (cs == 1) {
                    var contains = -1;
                    for (var j = 0; j < confHalf.length; j++) {
                        if (confHalf[j].character == c) {
                            contains = j;
                            break;
                        }
                    }

                    if (contains == -1) {
                        var l = {character: c, indexes:[i]}
                        confHalf.push(l);
                    } else {
                        confHalf[contains].indexes.push(i);
                    }

                } else
                if (cs == 2) {
                    conf[i] = c;
                }
        }
    }

    function validateWord(cw) {
        for (var i = 0; i < 5; i++) {
            var c = cw[i];

            // Confirmed with position
            if (conf[i] != null) {
                if (conf[i] != c) {
                    return false;
                } else {
                    continue;
                }
            }

            // Confirmed without position
            var contains = -1;
            for (var j = 0; j < confHalf.length; j++) {
                if (confHalf[j].character == c) {
                    contains = j;
                    break;
                }
            }

            if (contains != -1) {
                if (confHalf[contains].indexes.includes(i)) {
                    return false;
                }
            } else if (confNon.includes(c)) {
                return false;
            }
        }

        for (var j = 0; j < confHalf.length; j++) {
            if (!cw.includes(confHalf[j].character)) {
                return false;
            }
        }

        return true;
    }

    function getWord() {
        var favourableWord;
        var favourableFreq = 0.0;
    
        for (var i = 0; i < words.length; i++) {
            var cw = words[i];

            if (validateWord(cw)) {
                var tempFreq = 0;

                for (var j = 0; j < 5; j++) {
                    var add = true;
                    for (var k = j - 1; k >= 0; k--) {
                        if (cw[j] == cw[k]) {
                            add = false;
                        }

                        if (add) {
                            tempFreq += getFreq(cw[j]);
                        }
                    }

                    if (tempFreq > favourableFreq) {
                        favourableFreq = tempFreq;
                        favourableWord = cw;
                    }
                }
            }
        }

        return favourableWord;
    }

    // Frequency of all letters in the alphabet
    function getFreq(c) {
        var letterFreq = 0;

        switch(c) {
            case 'a': letterFreq = 8.4966; break;
            case 'b': letterFreq = 2.0720; break;
            case 'c': letterFreq = 4.5388; break;
            case 'd': letterFreq = 3.3844; break;
            case 'e': letterFreq = 11.1607; break;
            case 'f': letterFreq = 1.8121; break;
            case 'g': letterFreq = 2.4705; break;
            case 'h': letterFreq = 3.0034; break;
            case 'i': letterFreq = 7.5448; break;
            case 'j': letterFreq = 0.1965; break;
            case 'k': letterFreq = 1.1016; break;
            case 'l': letterFreq = 5.4893; break;
            case 'm': letterFreq = 3.0129; break;
            case 'n': letterFreq = 6.6544; break;
            case 'o': letterFreq = 7.1635; break;
            case 'p': letterFreq = 3.1671; break;
            case 'q': letterFreq = 0.1962; break;
            case 'r': letterFreq = 7.5809; break;
            case 's': letterFreq = 5.7351; break;
            case 't': letterFreq = 6.9509; break;
            case 'u': letterFreq = 3.6308; break;
            case 'v': letterFreq = 1.0074; break;
            case 'w': letterFreq = 1.2899; break;
            case 'x': letterFreq = 0.2902; break;
            case 'y': letterFreq = 1.7779; break;
            case 'z': letterFreq = 0.2722; break;
        }

        return letterFreq;
    }

function switcher(ele) {
    var id = ele.id;
    if (parseInt(id) >= (current-1)*5 && parseInt(id) < ((current-1)*5 + 5)) {
        if (boxesState[id] == 0) {
            boxesState[id] = 1;
            boxes[id].style.backgroundColor = halfUsedColor;
            boxes[id].style.borderColor = halfUsedColor;
        } else
        if (boxesState[id] == 1) {
            boxesState[id] = 2;
            boxes[id].style.backgroundColor = correctColor;
            boxes[id].style.borderColor = correctColor;
        } else
        if (boxesState[id] == 2) {
            boxesState[id] = 0;
            boxes[id].style.backgroundColor = unusedColor;
            boxes[id].style.borderColor = unusedColor;
        }
    }
}
