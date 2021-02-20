const transactions = storagePegueitor()
let somador = 0
let chama = 0
/*formatar a moeda pra fica bonitinha*/
function moedeitor (moeda){

    moeda = Number(moeda)
    
    moeda = moeda.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
    
    return (moeda)
}


/*abrir a janelinha de transaçao*/ 
function newtransaction() {
    document.getElementById('overlow').classList.add("s")
    
}
/*fechar a janelinha de transaçao*/
function cancel(){
    document.getElementById('overlow').classList.remove('s')
}

/*a base da formatação dos dados*/
function formatacion(id, descriçao, numero, data){
    const html = `
    <th id="descripton">${descriçao}</th>
    <th id="income" class="value">${numero}</th>
    <th id="date">${data}</th>
    <th id="image"><img src="imagens-do-site/assets/minus.svg" onclick="deleteitor(${id})" id="deletor" alt=""></th>`
    return html
}

/*bota a formatação na tabela*/

function organization (text){
    const tr = document.createElement("tr")
    tr.innerHTML = text
    tr.classList = 'tr'
    return tr
}

/*adicionar no documento*/
function adicionator (text){
    const local= document.querySelector("#data-table tbody")
    local.appendChild(text)
}

/*mudar o id para income ou expensive*/
function mudeitor (text){
    const id = text.children[1]
    const valor= id.innerHTML.replace("R$&nbsp;","").replace(",","")
    const idClass = valor > 0 ? "income" : "expensive"
    id.id = idClass
    return text
}

/*Somar as entradas*/
function entreidor(numero){
    soma = 0
    numero.forEach(transaction => {
        if(transaction.amount > 0){
            soma += (transaction.amount/100)
        }
    });
    return soma
}

/*Somar as saidas*/
function saideitor(numero){
    soma = 0
    numero.forEach(transaction => {
        if(transaction.amount < 0){
            soma += (transaction.amount/100)
        }
    })
    return soma
}


/*iniciar o site*/
function iniciator(){
    for(let i = 0; i <= transactions.length-1; i++){
        transactions[i].id = (somador)
        adicionator((mudeitor(organization(formatacion(transactions[i].id,transactions[i].description,moedeitor((transactions[i].amount)/100),transactions[i].date)))))
        idgitveitor()
        console.log(transactions)
        chama = i + 1 
}   
        storageGuardeito()
        somador -= chama
    if(entreidor(transactions) + saideitor(transactions) < 0){
        const total = document.querySelector('#card.total')
        total.classList.add('s')
    }
    if(entreidor(transactions) + saideitor(transactions) >= 0){
        const total = document.querySelector('#card.total')
        total.classList.remove('s')
    }
} 

/*recarregar a pagina para anexar novas transações*/
function recarregeitor(){
    limpeitor()
    storagePegueitor()
    iniciator()
    /*trocar os valores de entradas e saidas*/
    document.getElementById("entradas").innerHTML = moedeitor(entreidor(transactions))
    document.getElementById("saidas").innerHTML = moedeitor(saideitor(transactions))
    /*achar o total (entradas - saidas)*/
    document.getElementById("total").innerHTML = moedeitor((entreidor(transactions)) + (saideitor(transactions)))
    if(entreidor(transactions) + saideitor(transactions) < 0){
        const total = document.querySelector('#card.total')
        total.classList.add('s')
    }
    if(entreidor(transactions) + saideitor(transactions) >= 0){
        const total = document.querySelector('#card.total')
        total.classList.remove('s')
    }
}

/*limpar a duplicata das transações*/
function limpeitor(){
    document.getElementById("t-body").innerHTML= ""
}

/*adicionar transações no transactions*/
function addeitor(text){
    transactions.push(text)
    storageGuardeito()
    recarregeitor()
}

/*ajeitar a data para o modelo brasileiro*/
function dataajeiteitor(ano, mes, dia){
    const data = [dia+'/'+mes+'/'+ano]
    return data

}

/*area pra testes*/

/*funçao para pegar os dados da nova transação*/
function pegueitor(){
    const descriçao = document.querySelector("input#description").value
    let value = document.querySelector("input#value").value
    const data = document.querySelector("input#date").value
    /*validando os dados*/
    if(descriçao === "" || value === "" || data === ""){
        return window.alert('preencha todos os dados para adicionar transação')
    }
    else{
        const separeteDate = data.split('-')
        addeitor({id: (transactions.length + 1), description: descriçao, amount: (value*100), date: (dataajeiteitor(separeteDate[0],separeteDate[1],separeteDate[2]))})  
        document.getElementById('overlow').classList.remove('s')
    }

} 

/*função para deletar transações pelo botao do site*/
function deleteitor(id) {
    transactions.splice(transactions.indexOf(transactions[id]),1)
    recarregeitor()
    if(entreidor(transactions) + saideitor(transactions) < 0){
        const total = document.querySelector('#card.total')
        total.classList.add('s')
    }
    if(entreidor(transactions) + saideitor(transactions) >= 0){
        const total = document.querySelector('#card.total')
        total.classList.remove('s')
    }
}


function classAdicionator(text, i){
    const tr = document.getElementById('tr')
    if(transactions.description.innerHTML == text.children[0].innerHTML)
        if(moedeitor(transactions.amount.innerHTML) == text.children[1].innerHTML)
            if(transactions.date.innerHTML == text.children[2].innerHTML)
                tr.classList.add(`${transactions[i].id}`)
    return(text)
}


/*função para quando clickar em salvar fazer tudo*/
function clickeitor(){
    pegueitor()
}

/*guardar no storage e pegar do storage*/
function storageGuardeito(){
    localStorage.setItem('minhas transações', JSON.stringify(transactions))
}
function storagePegueitor(){
    return JSON.parse(localStorage.getItem("minhas transações")) || []
}
function idgitveitor(){
    somador += 1
}


iniciator()
recarregeitor()