//Máscara para o CPF e celular
$(document).ready(function () {
  $('#cpf').mask('000.000.000-00');
  $('#celular').mask('(00) 00000-0000');
})

//ler do local storage aqui
let candidatos = [
  { id: "1", cpf: "42604610876", nome: "Lucas Vieira Dias", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
  { id: "2", cpf: "42604610876", nome: "Nelson Santana", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
];

$(document).ready(function validarLocalStorage() {
  if (localStorage.length > 0) {
    let localCandidatos = JSON.parse(localStorage.getItem("todosCandidatos"))
    console.log(localCandidatos)
    candidatos = localCandidatos
    listarCandidatos()
  } else {
    localStorage.setItem("todosCandidatos", JSON.stringify(candidatos))
  }
})


function abrirModal(candidato) {
  if (candidato) {
    document.getElementById("id").value = candidato.id;
    document.getElementById("cpf").value = candidato.cpf;
    document.getElementById("nome").value = candidato.nome;
    document.getElementById("celular").value = candidato.celular;
    document.getElementById("email").value = candidato.email;
    if (candidato.sexo == 'Masculino') {
      document.getElementById("sexoMasculino").checked = true;
    } else {
      document.getElementById("sexoFeminino").checked = true;
    }
    document.getElementById("nascimento").value = candidato.nascimento.split('/').reverse().join('-');
    document.getElementById("skillHtml").checked = candidato.skills.html;
    document.getElementById("skillCss").checked = candidato.skills.css;
    document.getElementById("skillJs").checked = candidato.skills.js;
    document.getElementById("skillBoot").checked = candidato.skills.boot;
  }

  $('#candidatoModal').modal('show');
}

function fecharModal() {
  $('#candidatoModal').modal('hide');
  $('body').removeClass('modal-open');
  $('body').removeAttr('style');
  $('.modal-backdrop').remove();

  document.getElementById("id").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("email").value = "";
  document.getElementById("sexoMasculino").checked = true;
  document.getElementById("nascimento").value = '';
  document.getElementById("skillHtml").checked = false;
  document.getElementById("skillCss").checked = false;
  document.getElementById("skillJs").checked = false;
  document.getElementById("skillBoot").checked = false;
}

function salvar() {
  let id = document.getElementById("id").value;
  let cpf = document.getElementById("cpf").value;
  let nome = document.getElementById("nome").value;
  let celular = document.getElementById("celular").value;
  let email = document.getElementById("email").value;
  let nascimento = document.getElementById("nascimento").value.split('-').reverse().join('/');
  let sexo = document.getElementById("sexoMasculino").checked;
  let skillHtml = document.getElementById("skillHtml").checked;
  let skillCss = document.getElementById("skillCss").checked;
  let skillJs = document.getElementById("skillJs").checked;
  let skillBoot = document.getElementById("skillBoot").checked;

  // Fazer validações aqui

  if (validarCPF(cpf) == true) {
    let localCPF = JSON.parse(localStorage.getItem('todosCandidatos'))
    if (localCPF.some(e => e.cpf === cpf)) {
      window.alert('O CPF digitado já está cadastrado, tente novamente.')
    } else {
      console.log('CPF não registrado, pode prosseguir.')
      
      function validarNome (){
        let nomeArray = nome.split(' ');
        return nomeArray.length >= 2;
      }

      if(validarNome(nome)){
        window.alert('Nome completo')
        let idade = nascimento

      } else{
        window.alert('Nome incompleto')
      }
    }
  }
}

function listarCandidatos() {
  let tabela = document.getElementById("table-body");
  tabela.innerHTML = '';

  for (let candidato of candidatos) {
    let linha = document.createElement("tr");

    let colunaCpf = document.createElement("td");
    let colunaNome = document.createElement("td");
    let colunaCelular = document.createElement("td");
    let colunaEmail = document.createElement("td");
    let colunaSexo = document.createElement("td");
    let colunaNascimento = document.createElement("td");
    let colunaSkills = document.createElement("td");
    let colunaEditar = document.createElement("td");
    let colunaRemover = document.createElement("td");

    // Funcionalidades botão editar
    let botaoEditar = document.createElement("a");
    botaoEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    botaoEditar.id = 'botaoEditar'
    botaoEditar.onclick = function () {
      console.log('editar');
      abrirModal(candidato);
    }

    // Funcionalidades botão remover
    let botaoRemover = document.createElement("a");
    botaoRemover.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    botaoRemover.id = 'botaoRemover'
    botaoRemover.onclick = function () {
      alert('Erro ao remover!');
    }

    let arrSkills = [];
    if (candidato.skills.html) {
      arrSkills.push('HTML');
    }
    if (candidato.skills.css) {
      arrSkills.push('CSS');
    }
    if (candidato.skills.js) {
      arrSkills.push('JS');
    }

    if (candidato.skills.bootstrap) {
      arrSkills.push('BootStrap');
    }

    colunaCpf.appendChild(document.createTextNode(candidato.cpf));
    colunaNome.appendChild(document.createTextNode(candidato.nome));
    colunaCelular.appendChild(document.createTextNode(candidato.celular));
    colunaEmail.appendChild(document.createTextNode(candidato.email));
    colunaSexo.appendChild(document.createTextNode(candidato.sexo));
    colunaNascimento.appendChild(document.createTextNode(candidato.nascimento));
    colunaSkills.appendChild(document.createTextNode(arrSkills.join(', ')));
    colunaEditar.appendChild(botaoEditar);
    colunaRemover.appendChild(botaoRemover);

    linha.appendChild(colunaCpf);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaCelular);
    linha.appendChild(colunaEmail);
    linha.appendChild(colunaSexo);
    linha.appendChild(colunaNascimento);
    linha.appendChild(colunaSkills);
    linha.appendChild(colunaEditar);
    linha.appendChild(colunaRemover);

    tabela.appendChild(linha);
  }
}

listarCandidatos();

//Trecho resposável pelo filtro da tabela
$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#candidatos tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

//---------------------------------------FUNÇÕES DE VALIDAÇÃO!---------------------------------------\\

//Validar o CPF
function validarCPF(cpf) {
  // Garante que a entrada seja tratada como texto
  cpf = String(cpf).replace(/\D/g, "");

  // Um CPF válido deve ter exatamente 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Rejeita CPFs formados pelo mesmo dígito
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;

  for (let i = 0; i < 9; i++) {
    soma += Number(cpf[i]) * (10 - i);
  }

  let resto = soma % 11;
  const primeiroDigito = resto < 2 ? 0 : 11 - resto;

  // O primeiro dígito calculado deve ser igual ao informado
  if (primeiroDigito !== Number(cpf[9])) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;

  for (let i = 0; i < 10; i++) {
    soma += Number(cpf[i]) * (11 - i);
  }

  resto = soma % 11;
  const segundoDigito = resto < 2 ? 0 : 11 - resto;

  // O segundo dígito calculado também deve ser igual ao informado
  return segundoDigito === Number(cpf[10]);
}

/* let candidato = {
        id: id != '' ? id : new Date().getTime(),
        cpf: cpf,
        nome: nome,
        celular: celular,
        email: email,
        sexo: sexo ? 'Masculino' : 'Feminino',
        nascimento: nascimento,
        skills: {
          html: skillHtml,
          css: skillCss,
          js: skillJs,
          bootstrap: skillBoot
        }
      };

      if (id != '') {
        let checkCandidato = candidatos.find(e => e.id == candidato.id);
        checkCandidato.cpf = candidato.cpf;
        checkCandidato.nome = candidato.nome;
        checkCandidato.celular = candidato.celular;
        checkCandidato.email = candidato.email;
        checkCandidato.sexo = candidato.sexo;
        checkCandidato.nascimento = candidato.nascimento;
        checkCandidato.skills = candidato.skills;
      } else {
        candidatos.push(candidato);
      }

      //salvar a lista de canditatos atualizada no local storage
      localStorage.setItem("todosCandidatos", JSON.stringify(candidatos))

      fecharModal();
      listarCandidatos(); */