const selectSerie = document.getElementById('serie');
const blocoLingua = document.getElementById('bloco-segunda-lingua');
const radiosLingua = document.querySelectorAll('input[name="segunda-lingua"]');

const blocoTelefone = document.getElementById('bloco-telefone-tarde');
const radiosTurno = document.querySelectorAll('input[name="turno"]');

const dataNascimento = document.getElementById('nascimento');
const idade = document.getElementById('idade')

const campoCep = document.getElementById('cep');
const campoCPF = document.getElementById('cpf');
const campoMatricula = document.getElementById('matricula');

const nome = document.getElementById('nome_aluno');
const telefone = document.getElementById('telefone');

const botaoEnviar = document.getElementById('botaoEnviar');


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


dataNascimento.addEventListener('change', function(){
    const nascimento = new Date(this.value);
    const dataAtual = new Date();

    if (!this.value){
        idade.value = '';
    }
    else {
        let anos = dataAtual.getFullYear() - nascimento.getFullYear();

        let meses = dataAtual.getMonth() - nascimento.getMonth();

        if (meses < 0) {
            anos = anos - 1;
        }

        idade.value = anos + ' anos '
    }

})

campoCep.addEventListener('input', function(){
    let valor = this.value.replace(/\D/g,'');

    if(valor.length > 5){
        
        valor = valor.slice(0,5) +  '-' + valor.slice(5,8);
    }

    this.value = valor;
})

campoCPF.addEventListener('input', function(e){
    let valor = e.target.value.replace(/\D/g,'');

    if(valor.length <= 11){
        
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); 
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
        
    }
    e.target.value = valor;

})

campoMatricula.addEventListener('input', function(e){
    let valor = e.target.value.replace(/\D/g,'');

    if(valor.length <= 6){
        valor = valor.replace(/(\d{2})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{2})(\d{1,2})$/, '$1-$2'); 
    }

    e.target.value = valor;
})

campoCep.addEventListener('blur', function(){
    const cepLimpo = this.value.replace(/\D/g,'');

    if(cepLimpo.length !== 8){
        if(cepLimpo.length > 0){
            alert(' CEP inválido! ')
        }
        return;
    }
    
    fetch(`http://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(r => {
            if(!r.ok) throw new Error('Erro na Rede!')
                return r.json();
        })
        .then(dados => {
            if(dados.erro){
                alert(' CEP não encontrado ')
                return
            }
            else{
                document.getElementById('logradouro').value = dados.logradouro || '';
                document.getElementById('bairro').value = dados.bairro || '';
                document.getElementById('cidade').value = dados.localidade || '';
                document.getElementById('estado').value = dados.uf || '';
                document.getElementById('cod_ibge').value = dados.ibge || '';

                document.getElementById('numero').focus();
            }
        })

})
