// Funções para manipulação de modais
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Fechar modal quando clicar fora dele
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Manipulação do formulário de novo aluno
function submitNovoAluno(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const aluno = {
        nome: formData.get('nome'),
        dataNascimento: formData.get('dataNascimento'),
        cpf: formData.get('cpf'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        endereco: formData.get('endereco'),
        turma: formData.get('turma'),
        status: formData.get('status')
    };

    // Aqui você pode adicionar a chamada para sua API
    console.log('Novo aluno:', aluno);
    
    // Adiciona o aluno à tabela
    addAlunoToTable(aluno);
    
    // Fecha o modal e limpa o formulário
    closeModal('modalNovoAluno');
    event.target.reset();
}

// Funções para manipulação da tabela de alunos
function addAlunoToTable(aluno) {
    const tbody = document.getElementById('alunosTableBody');
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${generateMatricula()}</td>
        <td>${aluno.turma}</td>
        <td><span class="status-badge ${aluno.status}">${aluno.status}</span></td>
        <td>
            <button class="btn-icon" onclick="editAluno(${aluno.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon" onclick="deleteAluno(${aluno.id})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    tbody.appendChild(tr);
}

// Função para gerar número de matrícula
function generateMatricula() {
    return new Date().getFullYear() + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}

// Funções para filtros
document.getElementById('searchAlunos')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#alunosTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('filterTurma')?.addEventListener('change', filterAlunos);
document.getElementById('filterStatus')?.addEventListener('change', filterAlunos);

function filterAlunos() {
    const turma = document.getElementById('filterTurma').value.toLowerCase();
    const status = document.getElementById('filterStatus').value.toLowerCase();
    const rows = document.querySelectorAll('#alunosTableBody tr');
    
    rows.forEach(row => {
        const rowTurma = row.children[2].textContent.toLowerCase();
        const rowStatus = row.children[3].textContent.toLowerCase();
        
        const matchTurma = !turma || rowTurma === turma;
        const matchStatus = !status || rowStatus === status;
        
        row.style.display = matchTurma && matchStatus ? '' : 'none';
    });
}

// Máscaras para campos do formulário
document.getElementById('cpf')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
});

document.getElementById('telefone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
});
