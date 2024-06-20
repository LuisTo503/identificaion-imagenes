let classifier;
let img;

function preload() {
    classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
    noCanvas();
}

document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block';
            img = createImg(e.target.result, '', '', () => {
                img.hide();
            });
        };
        reader.readAsDataURL(file);
    }
});

function predict() {
    const description = document.getElementById('imageDescription').value.trim();
    if (!img) {
        alert('Por favor, carga una imagen primero.');
        return;
    }
    classifier.classify(img, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        document.getElementById('result').innerHTML = `
            <p>Descripción: ${description}</p>
            <p>Posible 1: ${results[0].label}</p>
            <p>Precisión: ${nf(results[0].confidence, 0, 2)}</p>
            <p>Posible 2: ${results[1].label}</p>
            <p>Precisión: ${nf(results[1].confidence, 0, 2)}</p>
            <p>Posible 3: ${results[2].label}</p>
            <p>Precisión: ${nf(results[2].confidence, 0, 2)}</p>
        `;
    });
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}