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
var fast;

var step;
var changeMeter;

function main() {
    boxes = document.getElementsByClassName("txt");
    boxesState = [];
    current = 0;
    fast = true;

    step = 0;
    changeMeter = 0;
    
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = idleColor;
        boxes[i].style.borderColor = unusedColor;
        boxes[i].value = "";
        boxesState[i] = -1;
        boxes[i].addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
        boxes[i].style.cursor = "default";
    }
    var box = document.getElementsByClassName("usableBox")[0];
    box.value = "";

}

function showDoodle1() {
    var doodle1 = document.getElementsByClassName("doodle1");
    doodle1[0].style.opacity = '100%';

    var doodle2 = document.getElementsByClassName("doodle2");
    doodle2[0].style.opacity = '0%';
    doodle2[1].style.opacity = '0%';
}

function nextStep() {
    step += 1;
    if (step == 1) {
        var doodle2 = document.getElementsByClassName("doodle2");
        doodle2[0].style.opacity = '100%';
        doodle2[1].style.opacity = '100%';
        
        var doodle1 = document.getElementsByClassName("doodle1");
        doodle1[0].style.opacity = '0%';

        var text1 = document.getElementsByClassName("text1");
    } else {
        var doodle2 = document.getElementsByClassName("doodle2");
        doodle2[0].style.opacity = '0%';
        doodle2[1].style.opacity = '0%';
        var doodle1 = document.getElementsByClassName("doodle1");
        doodle1[0].style.opacity = '0%';
    }

    // doodle1[0].style.display = 'none';

    var cw;

    if (current != 0) {
        newWord();
        if (fast == true) {
            cw = getWordFast();
        } else {
            cw = getWord();
        }
    } else {
        wordleMain();
        cw = "crate";
    }

    if (cw == null) {
        cw = "error"
        for (var i = 5*current; i < 5*current + 5; i++) {
            boxes[i].style.backgroundColor = wrongColor;
            boxes[i].style.borderColor = wrongColor;
            boxes[i].value=cw[i - 5*current].toUpperCase();
        }
        console.log(words);
        return;
    }
    
    for (var i = 5*current; i < 5*current + 5; i++) {
        boxesState[i] = 0;
        boxes[i].style.backgroundColor = unusedColor;
        boxes[i].style.borderColor = unusedColor;
        boxes[i].value=cw[i - 5*current].toUpperCase();
        boxes[i].style.cursor = "pointer";

        if (current > 0) {
            if (boxesState[i-5] == 2) {
                boxesState[i] = 2;
                boxes[i].style.backgroundColor = correctColor;
                boxes[i].style.borderColor = correctColor;
            }
        boxes[i-5].style.cursor = "default";
        }
    }
    current++;

}

    var words; // String array

    var conf; // String array
    var confNon; //String array
    var confHalf; // Letter array

    function wordleMain() {
        conf = [];
        confNon = [];
        confHalf = [];
        words = wordsBase.slice();
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

    function validateWord(cw, confNon, confHalf, conf) {
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
        var maxInfo = 0;
        var wordsTemp = words.slice();

        for (var i = 0; i < words.length; i++) {
            var cw = words[i];

            if (validateWord(cw, confNon, confHalf, conf)) {
                var info = 0;

                for (var a = 0; a < 3; a++) {
                    for (var b = 0; b < 3; b++) {
                        for (var c = 0; c < 3; c++) {
                            for (var d = 0; d < 3; d++) {
                                for (var e = 0; e < 3; e++) {
                                    var probability = 0;
                                    var localInfo = 0;
                                    var tempConfNon = confNon.slice();
                                    var tempConfHalf = confHalf.slice();
                                    var tempConf = conf.slice();

                                    for (var j = 0; j < 5; j++) {
                                        var currentChar;
                                        if (j == 0)
                                            currentChar = a;
                                        if (j == 1)
                                            currentChar = b;
                                        if (j == 2)
                                            currentChar = c;
                                        if (j == 3)
                                            currentChar = d;
                                        if (j == 4)
                                            currentChar = e;

                                        if (currentChar == 0) { 1
                                            tempConfNon.push(cw[j]);
                                        } else if (currentChar == 1) {

                                            var contains = -1;
                                            for (var j = 0; j < tempConfHalf.length; j++) {
                                                if (tempConfHalf[j].character == c) {
                                                    contains = j;
                                                    break;
                                                }
                                            }
                                            if (contains != -1) {
                                                tempConfHalf[contains].indexes.push(j);
                                            } else {
                                                tempConfHalf.push({character: cw[j], indexes: [j]});
                                            }

                                        } else if (currentChar == 2) {
                                            tempConf[j] = cw[j];
                                        }
                                    }

                                    // Process all cases here
                                    for (var wordNo = 0; wordNo < words.length; wordNo++) {
                                        if (validateWord(words[wordNo], tempConfNon, tempConfHalf, tempConf)) {
                                            probability++;
                                        }
                                    }

                                    probability *= 1000;
                                    probability /= words.length;
                                    if (probability != 0) {
                                        localInfo = Math.log2(1/probability);
                                    }

                                    info += probability * localInfo;
                                    info = 0;
                                }
                            }
                        }
                    }
                }

                if (info >= maxInfo) {
                    maxInfo = info;
                    favourableWord = cw;
                }
            } else {
                wordsTemp.splice(i, 1);
            }
        }

        words = wordsTemp.slice();
        return favourableWord;
    }
    
    function getWordFast() {
        var favourableWord;
        var usableWords = [];
        var favourableFreq = 0.0;
    
        for (var i = 0; i < words.length; i++) {
            var cw = words[i];

            if (validateWord(cw, confNon, confHalf, conf)) {
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

                }

                for (var l = 0; l < usableWords.length; l++) {
                    if (tempFreq >= usableWords[l].info) {
                        usableWords.splice(l, 0, {word: cw, info: tempFreq});
                        break;
                    }

                }

                if (usableWords.length == 0) {
                    usableWords.push({word: cw, info: tempFreq});
                }
                
                if (tempFreq > favourableFreq) {
                    favourableFreq = tempFreq;
                    favourableWord = cw;
                }
            }
        }

        var box = document.getElementsByClassName("usableBox")[0];
        box.value = "";

        for (var word = 0; word < usableWords.length; word++) {
            box.value += usableWords[word].word.toUpperCase() + "\n";
        }

        console.log()

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

    if (boxesState[parseInt(ele.id)] >= 0) {
        changeMeter++;
    }

    if (changeMeter == 1) {
        var doodle1 = document.getElementsByClassName("doodle1");
        doodle1[0].style.opacity = '100%';
    }

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
