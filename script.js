const selectSerie = document.getElementById('serie');
const blocoLingua = document.getElementById('bloco-segunda-lingua');
const radiosLingua = document.querySelectorAll('input[name="segunda-lingua"]');

const blocoTelefone = document.getElementById('bloco-telefone-tarde');
const radiosTurno = document.querySelectorAll('input[name="turno"]');



selectSerie.addEventListener('change', function(){
    if(this.value === '5ano'){
        blocoLingua.style.display = 'block';
    } 
    else {
        blocoLingua.style.display = 'none';
        radiosLingua.forEach(r => r.checked = false)
    }
});

radiosTurno.forEach(radio => {
    radio.addEventListener('change', function(){
        if (this.value === 'tarde'){
            blocoTelefone.style.display = 'block';
        }
        else {
            blocoTelefone.style.display = 'none'
        }
    })
})
