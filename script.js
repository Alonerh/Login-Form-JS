// VALIDAÇÃO FRONT-END | Deve haver revalidação no Back-End, para evitar hackers;

let B7Validator = { // Impede o validador
    handleSubmit:(event)=>{
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        B7Validator.clearErrors();

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = B7Validator.checkInput(input);
            if (check !== true) {
                send = false; // Não enviar o formulário
                B7Validator.showError(input, check)
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput:(input)=>{ // Verifica se há alguma regra
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo não pode ser vazio';
                        }
                    break;
                    case 'min':
                        if (input.value.length < rDetails[1]) { // min =0 | = | 2 = 1 
                            return `Campo não pode ser menor do que ${rDetails[1]}`;
                        }
                    break;
                    case 'email':                   

                        if (input.value != '') { // Se o email está preenchido
                            // Expressão Regular para Email
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'Este email não é válido';
                            }
                        }
                    break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#f00'

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: ()=>{
        let inputs = form.querySelectorAll('input');

        for (let i=0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');

        for (let i=0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }

};


// BASES

// (data-rules="required|min=2") Aqui deve estar as regras, como atributo do input no html;

let form = document.querySelector('.b7validator'); // Seleciona o formulario para ativar o validador | Essa deve ser a classe do formulário
form.setAttribute('novalidate', true) // Desativa a verificação do email feita pelo navegador
form.addEventListener('submit', B7Validator.handleSubmit); // impede quando tiver um submit



/*
- (parentElement) Volta 1 elemento acima;
    Ex: Input para Label;

- (ElementSibling) Próximo elemento;
    Ex: Input 1 para Input 2;
*/