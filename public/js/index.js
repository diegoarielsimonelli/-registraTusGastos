"use strict";
const bAdd = document.querySelector('#bAdd');
const inputTitle = document.querySelector('#title');
const inputCost = document.querySelector('#cost');
const inputCurrency = document.querySelector('#currency');
const expenses = new Expenses('USD');
loadAPI();
bAdd.addEventListener('click', e => {
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value;
        const cost = inputCost.value;
        const currency = inputCurrency.value;
        expenses.add({ title: title, cost: { number: parseFloat(cost), currency: currency } });
        render();
    }
    else {
        alert('Completa los datos correctamente');
    }
});
function loadAPI() {
    fetch('api/api.json')
        .then(res => res.json())
        .then(json => {
        const items = json.items;
        items.forEach(item => {
            expenses.add(item);
        });
        render();
    });
}
function render() {
    let html = '';
    expenses.getItems().forEach(item => {
        const { id, title, cost } = item;
        html += `
            <div class="item">
                <div><span class="currency">${cost.currency}</span> ${cost.number}</div>
                <div>${title}</div>
                <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
            </div>
        `;
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    $$('.bEliminar').forEach(bEliminar => {
        bEliminar.addEventListener('click', e => {
            const id = e.target.getAttribute('data-id');
            expenses.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
