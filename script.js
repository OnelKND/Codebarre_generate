var button_code = document.getElementById('button_code');
var text = document.getElementById('text');
var box = document.getElementById('box');
var pdf_box = document.getElementById('pdf_box');


button_code.onclick = function () {
    if (text.value.length > 0) {
        if (text.value.length < 50) {
            //Generer le code barre 
            box.innerHTML = "<svg id='barcode'></svg>";
            JsBarcode("#barcode", text.value,);
            box.style.border = "1px solid #999";
            // Afficher le bouton pour télécharger le PDF
            pdf_box.innerHTML = "<button onclick='generate_PDF()'>Télécharger le PDF</button>";


            pdf_box.style.marginTop = "10px";
            pdf_box.style.display = "flex";

        } else {
            box.style.border = "0";
            box.innerHTML = "<p class ='error'> Le code barre ne doit pas dépasser 50 caractères !! </p>";
            pdf_box.style.display = "none";
        }
    } else {
        box.style.border = "0";
        box.innerHTML = "<p class ='error'> Remplissez le champ !! </p>";
        pdf_box.style.display = "none";
    }
}

// Fonction pour générer le PDF
function generate_PDF() {
    var opt = {
        margin: 1,
        filename: `${text.value}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(box).save();

    // Old monolithic-style usage:
    html2pdf(box, opt);
}