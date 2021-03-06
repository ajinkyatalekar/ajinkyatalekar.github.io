function copy() {
    document.getElementById("result").select();
    // document.execCommand('copy');
}

function enter() {
    if (event.keyCode == 13) {
        event.preventDefault();
    } else if (document.getElementById("input").value == "") {
        document.getElementById("result").value = "";
    } else {
        toRoman();
    }
}

function toRoman() {

    let num = document.getElementById("input").value;

    if (num < 0) {
        //return "Not a valid number!";

        document.getElementById('result').value = "NOT VALID";
        return;
    } else if (num > 9999) {
        document.getElementById('result').value = "TOO LARGE";
        return;
    } else if (num == '') {
        return;
    }

    var roman = '';
    
    for (let i = 0; i < num.length; i++) {
        switch (num[i]) {
            case '1': if (num.length - i == 1) {roman +='I'} else
                        if (num.length - i == 2) {roman +='X'} else
                        if (num.length - i == 3) {roman +='C'} else
                        if (num.length - i == 4) {roman +='M'}; break;

            case '2': if (num.length - i == 1) {roman +='II'} else
                        if (num.length - i == 2) {roman +='XX'} else
                        if (num.length - i == 3) {roman +='CC'} else
                        if (num.length - i == 4) {roman +='MM'}; break;

            case '3': if (num.length - i == 1) {roman +='III'} else
                        if (num.length - i == 2) {roman +='XXX'} else
                        if (num.length - i == 3) {roman +='CCC'} else
                        if (num.length - i == 4) {roman +='MMM'}; break;

            case '4': if (num.length - i == 1) {roman +='IV'} else
                        if (num.length - i == 2) {roman +='XL'} else
                        if (num.length - i == 3) {roman +='CD'} else
                        if (num.length - i == 4) {roman +='MMMM'}; break;

            case '5': if (num.length - i == 1) {roman +='V'} else
                        if (num.length - i == 2) {roman +='L'} else
                        if (num.length - i == 3) {roman +='D'} else
                        if (num.length - i == 4) {roman +='MMMMM'}; break;

            case '6': if (num.length - i == 1) {roman +='VI'} else
                        if (num.length - i == 2) {roman +='LX'} else
                        if (num.length - i == 3) {roman +='DC'} else
                        if (num.length - i == 4) {roman +='MMMMMM'}; break;

            case '7': if (num.length - i == 1) {roman +='VII'} else
                        if (num.length - i == 2) {roman +='LXX'} else
                        if (num.length - i == 3) {roman +='DCC'} else
                        if (num.length - i == 4) {roman +='MMMMMMM'}; break;

            case '8': if (num.length - i == 1) {roman +='VIII'} else
                        if (num.length - i == 2) {roman +='LXXX'} else
                        if (num.length - i == 3) {roman +='DCCC'} else
                        if (num.length - i == 4) {roman +='MMMMMMMM'}; break;

            case '9': if (num.length - i == 1) {roman +='IX'} else
                        if (num.length - i == 2) {roman +='XC'} else
                        if (num.length - i == 3) {roman +='CM'} else
                        if (num.length - i == 4) {roman +='MMMMMMMMM'}; break;

            case '0': if (num.length - i == 1) {roman +=''} else
                        if (num.length - i == 2) {roman +=''} else
                        if (num.length - i == 3) {roman +=''} else
                        if (num.length - i == 4) {roman +=''}; break;
            
            default: document.getElementById('result').value = "NOT VALID"; return; break;

        }
    }

//return roman;
document.getElementById('result').value = roman;
return;
}