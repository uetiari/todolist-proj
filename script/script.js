const botao = document.querySelector(".tarefa__botao");
const botaoExcluir = document.querySelector(".botao__excluir");

const tarefaInput = document.getElementById("ListaTarefaInput");
const boxTarefas = document.querySelector(".tarefa__caixa")


botao.addEventListener("click", function(evento){
    evento.preventDefault();
  
    const tarefasItens = document.createElement("div");
    tarefasItens.className = "tarefa__itens";
    tarefasItens.innerHTML = `<p> ${tarefaInput.value}</p>
    <button class="botao__excluir">&times;</button>`

    boxTarefas.appendChild(tarefasItens);
})

const botaoExcluir = document.querySelector(".botao__excluir");
botaoExcluir.addEventListener("click", function(excluir){
    excluir.preventDefault();
    

})
/* trolo */