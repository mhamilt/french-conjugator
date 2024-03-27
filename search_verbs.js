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

// let table_header = verbConjugationCodes.keys();
// let table_rows = personCodes.keys();

let verbsJsonData;

$.getJSON("./verbs.json", function (json) {
    verbsJsonData = json;
    document.getElementById("searchbar").disabled = false

    searchVerbs(window.location.hash.substr(1))
});

function searchVerbs(verb) {
    let verbdata = getVerbData(verb)

    if (verbdata) {
        console.log(verb);
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
    console.log(verbData)
    for (const tense in verbConjugationCodes) {
        for (const person in personCodes) {
            console.log(getCell(tense, person));
            getCell(tense, person).innerText = getConjugation(verbData, tense, person);
        }
    }
    document.getElementById("INF").innerText = " " + verbData["INF"];
    document.getElementById("PST.PTCP").innerText = " " + verbData["PST.PTCP"];
    document.getElementById("GER").innerText = " " + verbData["GER"];
}

addEventListener("input", (event) => {
    searchVerbs(event.target.value.toLowerCase().replaceAll(" ", ''));
});
console.log(window.location.hash.substr(1))

function fillHeaders() {
    for (const key in personCodes) {
        if (Object.hasOwnProperty.call(personCodes, key)) {
            getCell("person", key, 'td').innerText = personCodes[key]
            // console.log(key)
            // console.log($('#'+key));
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