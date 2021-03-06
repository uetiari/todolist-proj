const botaoAdd = document.querySelector(".botao__enviar"); // criei uma constante para o botão de ADD
const inputTarefa = document.getElementById("ListaTarefaInput"); // criei uma constante para o espaço de input da Nova Tarefa
const tarefaCaixa = document.querySelector(".tarefa__caixa"); // criei uma constante para a div onde vai a DIV das tarefas adicionadas

botaoAdd.addEventListener("click", function(evento){ // criei um escutador de evento para o botão de ADD a partir do "Click"
    evento.preventDefault(); // esta função começa previnido o evento padrão para evitar que se perca os dados coletados do input
  
    if(inputTarefa.value === undefined || inputTarefa.value === null){ 
    // faz validação do input para saber se está indefinido, nulo, vazio
       inputTarefa.focus(); // se caso esteja em alguma das opções acima, vai focar no campo de Input
       return false // retorna falso
       }

       // função para evitar que envie campos vazio no imput de texto
       const regex = /\w+/ig;
       if (!regex.test(inputTarefa.value)){
           inputTarefa.focus();
           return false;
       }

    const itens = document.createElement("div"); // criei um elemento novo, uma DIV
        itens.setAttribute("draggable", "true"); // dei um atributo a essa div para que ela fosse arrastável
        itens.className = "tarefa__itens"; // atribui uma classe para essa DIV nova
        itens.id = Math.floor((1 + Math.random()) * 0x10000) // atribui uma id randômica para a constante itens
        .toString(16)
        .substring(1);
        itens.innerHTML = `<p> ${inputTarefa.value}</p>` // inclui nessa DIV um elemento Parágrafo  que pega o valor do Input escrito na Nova tarefa
        tarefaCaixa.appendChild(itens); // inclui essa DIV nova Div que já existia, que será onde ficarão as tarefas para editar
        itens.style.display = "flex"; // atribui um estilo para altarar no CSS de none para flex para aparecer no HTML

        itens.addEventListener("dragstart", function(drag){ // evento de drag do elemento
            drag.dataTransfer.setData("text", drag.target.id) // seleciona o tipo do elemento para dar drag, o id desse elemento
        })
        
        itens.addEventListener("dragover", function(e){ // quando terminar de carregar o elemento
            e.preventDefault(); // previne o evento pradrão apenas
        })

        itens.addEventListener("drop", function(e){ // evento de drop do elemento
            let pegou = document.getElementById(e.dataTransfer.getData("text")); // guarda o elemento que pegou no Drag em uma constante
            let soltou = e.target  // criei uma constante para guardar o que soltou do elemento
        
            // fiz uma condição para que ele pegue sempre o elemento da constante Soltou
            if(soltou.nodeName === "P" || soltou.nodeName === "BUTTON"){ // se o nome do nó for um parágrafo ou um botão
                soltou = soltou.parentNode // a variável irá pegar o PAI desse nó(no caso a DIV da tarefa)
            }
            tarefaCaixa.insertBefore(pegou, soltou.nextSibling) // o pegou(o elemento novo), próximo da referência do Soltou, será inserido no TarefaCaixa
        })
        
        inputTarefa.value = null; // limpa o campo de input logo depois que envia a nova tarefa
        
        
// ---------------------------------- clique uma vez para marcar individualmente as tarefas concluídas
    itens.addEventListener("click", function(){  // criei um evento escutador de CLICK para a constante itens (acima)
        if(itens.classList.contains("tarefa__itens")){ // SE os itens contiverem a classe referida
            itens.classList.remove("tarefa__itens"); // vai ser removida a classe referida
            itens.classList.add("tarefa__itens-checked"); // vai adicionar a classe nova 
         } 
        //se estiver riscado, clicando novamente ele volta a ficar sem risco na palavra
         else{ 
            itens.classList.remove("tarefa__itens-checked"); //SENÃO remove os itens que tiverem a classe referida
            itens.classList.add("tarefa__itens"); // adiciona a classe nova referida
         }
    })

    const botaoExcluir = document.createElement("button"); // criei uma constante para criar o elemento botão 
    botaoExcluir.className = "botao__excluir"; // esse botão recebeu a classe referida
    botaoExcluir.innerHTML = `<button class ="botao__excluir">&times;</button>` // inclui esse botão criado no HTML com um "X"
        itens.appendChild(botaoExcluir); // inclui esse botão criado na div que foi criada acima, assim todas as tarefas terão seu próprio EXCLUIR

    botaoExcluir.addEventListener("click", function(excluir){ // coloquei um escutador de evento de click neste botão
        excluir.preventDefault(); // previni o evento padrão para não perder as informações 

        itens.remove(); // quando iniciar a função com o click irá remover todo conteúdo da constante itens
        botaoExcluir.remove(); // também excluir o botão
    });

// ------------------------ Seleciona tudo
    const checkTudo = document.querySelector(".botao__selecionar-tudo"); // criei uma constante para pegar o botão SELECIONAR TUDO 
    const excluirTudo = document.querySelector(".botao__deletar-tudo"); // criei uma constante para pegar o botão de DELETAR TUDO
    
    checkTudo.addEventListener("click", function(checkall){ // criei um escutador de evento para a constante de marcar tudo
        if(itens.classList.contains("tarefa__itens")){ // SE todos elementos da DIV criada lá em cima com a constante itens, tiverem a classe referida
            itens.classList.remove("tarefa__itens"); // remove todos os elementos com a classe referida
            itens.classList.add("tarefa__itens-checked"); // adiciona a classe referida a todos elementos da constante itens
            checkTudo.innerHTML = `<p> Desmarcar todos </p>`  // inclui no HTML um parágrafo quando o botão deixar tudo riscado o botão aparece Desmarcar todos
        } else {
            itens.classList.remove("tarefa__itens-checked"); // remove a classe referida dos itens; deixa de ser riscado 
            itens.classList.add("tarefa__itens");  // adiciona a nova classe referida aos itens; passa a ser sem riscado
            checkTudo.innerHTML = `<p> Marcar todos </p>`;   // inclui no HTML um parágrafo quando o botão deixar tudo sem riscar, o botão aparece Marcar todos
        
        }

    })
    excluirTudo.addEventListener("click", function(clearall){ // adicionei um ecutador de evento ao botão Excluir tudo
        if(itens.classList.contains("tarefa__itens-checked")){ // SE todos os itens que tiverem a classe referida
            itens.remove(); // esses itens serão removidos
            botaoExcluir.remove();  // botão individual de cada tarefa será excluído
            checkTudo.innerHTML = `<p> Marcar todos </p>`;  // inclui no HTML um parágrafo quando o botão excluir tudo os marcados
            // o botão mostra o escrito Marcar todos
        }
    })
   
})
