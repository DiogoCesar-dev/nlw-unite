let participantes = [
    {
      nome: 'Diogo Cesar',
      email: 'diogocesar.2127@gmail.com',
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: new Date(2024, 5, 25, 22, 00),
    },
    {
      nome: 'Maik Ritler',
      email: 'maik@gmail.com',
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: null,
    },
    {
      nome: 'Ana Silva',
      email: 'ana@gmail.com',
      dataInscricao: new Date(2024, 3, 1, 14, 30),
      dataCheckIn: new Date(2024, 3, 5, 10, 15),
    },
    {
      nome: 'Carlos Santos',
      email: 'carlos@gmail.com',
      dataInscricao: new Date(2024, 3, 2, 10, 00),
      dataCheckIn: new Date(2024, 3, 6, 9, 45),
    },
    {
      nome: 'Maria Souza',
      email: 'maria@gmail.com',
      dataInscricao: new Date(2024, 3, 3, 16, 45),
      dataCheckIn: new Date(2024, 3, 7, 14, 20),
    },
    {
      nome: 'José Lima',
      email: 'jose@gmail.com',
      dataInscricao: new Date(2024, 3, 4, 12, 20),
      dataCheckIn: null,
    },
    {
      nome: 'Laura Gomes',
      email: 'laura@gmail.com',
      dataInscricao: new Date(2024, 3, 5, 9, 10),
      dataCheckIn: new Date(2024, 3, 9, 8, 45),
    },
    {
      nome: 'Felipe Mendes',
      email: 'felipe@gmail.com',
      dataInscricao: new Date(2024, 3, 6, 18, 30),
      dataCheckIn: new Date(2024, 3, 10, 16, 15),
    },
    {
      nome: 'Camila Oliveira',
      email: 'camila@gmail.com',
      dataInscricao: new Date(2024, 3, 7, 15, 40),
      dataCheckIn: null,
    },
    {
      nome: 'Rafael Ferreira',
      email: 'rafael@gmail.com',
      dataInscricao: new Date(2024, 3, 8, 11, 55),
      dataCheckIn: new Date(2024, 3, 12, 10, 30),
    }
  ];
  
  const criarNovoParticipante = ({nome, email, dataInscricao, dataCheckIn}) => {
    const dataInscricaoUser = dayjs(Date.now()).to(dataInscricao)
    let dataCheckINewUser = dayjs(Date.now()).to(dataCheckIn)
  
    if (dataCheckIn === null) {
     dataCheckINewUser = `
        <button
          data-email="${email}"
          onclick="fazerCheckIn(event)"
        >
          Confirmar Check-In
        </button>
      `
    }
  
    return `
    <tr>
      <td>
        <strong> 
          ${nome} 
        </strong>
        <br>
        <small> 
          ${email} 
        <small>
      </td>
      <td>${dataInscricaoUser}</td>
      <td>${dataCheckINewUser}</td>
    </tr>
    `
  }
  
  const atualizarLista = (participantes) => {
    let output = []
  
    for (let participante of participantes) {
      output = output + criarNovoParticipante(participante)
    }
  
    document
      .querySelector('tbody')
      .innerHTML = output
  }
  
  atualizarLista(participantes)
  
  const adicionarParticipante = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
  
    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null,
    }
  
    // varificar se o participante já existe
    const participanteJáExiste = participantes.find(
      (p) => p.email === participante.email
    )
  
    if (participanteJáExiste) {
      alert('Email já cadastrado')
      return
    }
  
    participantes = [participante, ...participantes]
    atualizarLista(participantes)
  
    //limpar o formulario
  
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  }
  
  const fazerCheckIn = (event) => {
    // confirmar se realmente quer o checkIn
    const mensagemConfirmacao = confirm("Tem certeza que deseja realizar o check-in?")
  
    if(mensagemConfirmacao === false) {
      return
    }
  
    // encontrar o participante dentro da lista
    const participante = participantes.find(
      (p) => p.email === event.target.dataset.email
    )
  
    // atualizar o checkIn do participante
    participante.dataCheckIn = new Date()
  
    // atualizar a lista de participantes
    atualizarLista(participantes)
  }