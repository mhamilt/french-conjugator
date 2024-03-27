let verbConjugationCodes = {
    "PRS.IND": "Présent",
    "IPRF.IND": "Imparfait",
    "PRET.IND": "Passé Simple",
    "FUT.IND": "Futur",
    "PRS.SBJV": "Subjonctif",
    "IPRF.SBJV": "Subj Passé",
    "COND": "Conditionnel",
    "IMP": "Imperatif",
}

let personCodes = {
    "1SG": "je",
    "2SG": "tu",
    "3SG": "il / elle",
    "1PL": "nous",
    "2PL": "vous",
    "3PL": "ils / elles"
}

let verbsJsonData;

if (localStorage.getItem("verbs") === 'undefined') {
    $.getJSON("./verbs.json", function (json) {
        verbsJsonData = json;
        document.getElementById("searchbar").disabled = false;
        searchVerbs(window.location.hash.substr(1));
        localStorage.setItem("verbs", verbsJsonData);
    });    
    console.log('not local');
}
else {
    console.log('local');
    console.log(localStorage.getItem("verbs"));
    document.getElementById("searchbar").disabled = false
    verbsJsonData = localStorage.getItem("verbs");    
}


function searchVerbs(verb) {
    let verbdata = getVerbData(verb)

    if (verbdata) {
        fillTable(verbdata)
    }
}

function getCell(column_id, row_id) {

    let column_element = $('#' + column_id.replace('.', '\\.')).index();
    let row_element = $('#' + row_id);
    return row_element.find('td').eq(column_element)[0];
}

function getVerbData(verb) {
    if (typeof verbsJsonData === 'undefined' ||
        verbsJsonData[verb] === 'undefined') {
        return null
    }
    return verbsJsonData[verb];
}

function getConjugation(verbData, tense, person) {
    let conjugation = verbData[tense + '.' + person]
    if (!conjugation) {
        return '';
    }
    return conjugation;
}

function fillTable(verbData) {
    for (const tense in verbConjugationCodes) {
        for (const person in personCodes) {
            getCell(tense, person).innerText = getConjugation(verbData, tense, person);
        }
    }
    if (verbData["INF"] === `être`) {
        getCell("person", "1SG").innerText = `je / j'`;
    }
    else {
        getCell("person", "1SG").innerText = ['a', 'e', 'i', 'o', 'u'].includes(verbData["INF"][0].normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ? `j'` : `je`;
    }
    document.getElementById("INF").innerText = " " + verbData["INF"];
    document.getElementById("PST.PTCP").innerText = " " + verbData["PST.PTCP"];
    document.getElementById("GER").innerText = " " + verbData["GER"];
}

addEventListener("input", (event) => {
    searchVerbs(event.target.value.toLowerCase().replaceAll(" ", ''));
});

function fillHeaders() {
    for (const key in personCodes) {
        if (Object.hasOwnProperty.call(personCodes, key)) {
            getCell("person", key).innerText = personCodes[key]
        }
    }

    for (const key in verbConjugationCodes) {
        if (Object.hasOwnProperty.call(verbConjugationCodes, key)) {
            let row_id = key.replace('.', '\\.');
            let row_element = $('#' + row_id)
            row_element[0].innerText = verbConjugationCodes[key];


        }
    }
}

fillHeaders()