const botaoAdd = document.querySelector(".botao__enviar");
const inputTarefa = document.getElementById("ListaTarefaInput");
const tarefaCaixa = document.querySelector(".tarefa__caixa");

botaoAdd.addEventListener("click", function(evento){
    evento.preventDefault();
  
    if(inputTarefa.value === undefined || inputTarefa.value === null || inputTarefa.value === "" || inputTarefa.value === " "){
       inputTarefa.focus();
       return false
       }
    


    const itens = document.createElement("div");
        itens.className = "tarefa__itens";
        itens.innerHTML = `<p> ${inputTarefa.value}</p>`
        tarefaCaixa.appendChild(itens);
        itens.style.display = "flex";

        inputTarefa.value = null;

    itens.addEventListener("click", function(){  
        
        if(itens.classList.contains("tarefa__itens")){
            itens.classList.remove("tarefa__itens");
            itens.classList.add("tarefa__itens-checked");
         } 
          else{
            itens.classList.remove("tarefa__itens-checked");
            itens.classList.add("tarefa__itens");
         }
    })

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "botao__excluir";
    botaoExcluir.innerHTML = `<button class ="botao__excluir">&times;</button>`
        itens.appendChild(botaoExcluir);

    botaoExcluir.addEventListener("click", function(excluir){
        excluir.preventDefault();

        itens.remove();
        botaoExcluir.remove();
    });

// ------ Seleciona tudo
    const checkTudo = document.querySelector(".botao__selecionar-tudo");
    const excluirTudo = document.querySelector(".botao__deletar-tudo");
    
    checkTudo.addEventListener("click", function(checkall){
        if(itens.classList.contains("tarefa__itens")){
            itens.classList.remove("tarefa__itens");
            itens.classList.add("tarefa__itens-checked");
            checkTudo.innerHTML = `<p> Desmarcar todos </p>`  // quando o botão deixar tudo riscado o botão aparece Desmarcar todos
        } else {
            itens.classList.remove("tarefa__itens-checked");
            itens.classList.add("tarefa__itens");  
            checkTudo.innerHTML = `<p> Marcar todos </p>`;   // quando o botão deixar tudo sem riscar o botão aparece Marcar todos
         
        }

    })
    excluirTudo.addEventListener("click", function(clearall){
        if(itens.classList.contains("tarefa__itens-checked")){
            itens.remove();
            botaoExcluir.remove();
            checkTudo.innerHTML = `<p> Marcar todos </p>`;    // quando o botão excluir tudo os marcados, o botão volta ao Marcar todos
        }
    })
   
    
})
