let order = [];
let chooseItem = '';

// 輸出標題列表
function itemsTitle() {
    let itemsType = [...new Set(items.map(item => item.type))];
    let titleList = '';
    itemsType.forEach(ele => {
        titleList += `<h2>${ele}</h2>
        <div class="items-list">
        <form action="" data-type="${ele}"></form>
        </div>`;
    })
    document.getElementById('main-list').innerHTML = titleList;

    itemsType.forEach(ele => {
        let itemsType = items.filter(item => item.type === ele);
        itemsPrint(ele, itemsType);
    })
}

// 輸出item列表
function itemsPrint(title, itemsType) {
    // console.log(itemsType);
    // console.log(title + "：" + itemsType);
    let itemsInfo = '';
    itemsType.forEach(ele => {
        // console.log(ele);
        itemsInfo += `
        <div class="item" data-item="${ele.name}">
            <div class="img" style="background-image: url(./images/${ele.name}.jpg)";></div>
            <div class="info">
                <p>
                    <label class="name" for="">${ele.name}</label>
                </p>
                <p class="depiction">
                    ${ele.depiction}
                </p>
                <p class="depiction">
                $ ${ele.cost}
                </p>
            </div>
            <div>
                <i class="fa-solid fa-circle-plus"></i>
            </div>
        </div>
        `;
    });
    document.querySelector(`[data-type="${title}"]`).innerHTML = itemsInfo;
}

// 給予item點擊事件
function clickOrder() {
    itemClass = [...document.querySelectorAll('.item')];

    itemClass.forEach(item => {
        item.onclick = function () {
            document.getElementById("infoOrder").showModal();
            chooseItem = this.getAttribute('data-item');
            orderOptions();
            // console.log(chooseItem);
        }
    })
}

// 輸出點餐選項
function orderOptions(item) {
    let ele = items.find(i => i.name === chooseItem);
    let itemInfo = `
        <div>
            <div class="img optionImg" style="background-image: url(./images/${ele.name}.jpg)";></div>
            <div class="info">
                <p class="name">
                    ${ele.name}
                </p>
                <p class="depiction">
                    ${ele.depiction}
                </p>
                <p class="depiction">
                一杯 $ ${ele.cost}
                </p>
            </div>

        </div>
    `;

    let amount = `<h3>數量</h3>
    <input id="itemAmount" class="inputNum" type="number" value="1" min="1">`;

    let listOptions = '';
    for (let key in options) {
        let ele = options[key];

        listOptions += `<h3>${ele.title}</h3>`;
        listOptions += `<form>`;
        ele.item.forEach((item, index) => {
            // console.log(ele);
            listOptions += `
            <p>
                <input type="radio" id="${ele.name}_${index}" name="${ele.name}" value="${item}" ${index === 0 ? 'checked' : ''}>
                <label for="${ele.name}_${index}">${item}</label>
            </p>
            `;
        })
        listOptions += `</form>`;
    }

    document.getElementById('orderOptions').innerHTML = itemInfo + amount + listOptions;
}

// 返回點餐數量
function orderAmount() {
    return document.getElementById('itemAmount').value;
}

// 判定點餐可選選目
function orderRadio(name) {
    // console.log(name);
    let nameInput = document.querySelector(`input[name="${name}"]:checked`);
    if (nameInput) {
        // console.log(nameInput.value);
        return nameInput.value;
    } else {
        console.log('no');
    }
}

// 關閉彈窗
endOrderClass = [...document.querySelectorAll('.endOrder')];

endOrderClass.forEach(ele => {
    ele.onclick = function () {
        // 如果是點擊購物車按紐
        if (this.getAttribute('data-order')) {
            let itemOrder = {};
            itemOrder.name = chooseItem;
            itemOrder.size = orderRadio('size');
            itemOrder.sugar = orderRadio('sugar');
            itemOrder.ice = orderRadio('ice');
            itemOrder.amount = orderAmount();
            itemOrder.cost = items.find(i => i.name === chooseItem).cost;
            // console.log('data-order');
            order.push(itemOrder);
            document.getElementById('checkoutCost').innerHTML = "$ " + total();
        }

        // 關閉彈窗
        document.getElementById("infoOrder").close();
        // 重置選擇的商品
        chooseItem = '';
    }
})

// 查看購物車
document.getElementById('check').onclick = function () {
    hide('order');
    show('checkout');
    checkoutList()
    document.getElementById('totalCost').innerHTML = "$ " + total();
}

// 返回點餐
document.getElementById('return').onclick = function () {
    hide('checkout');
    show('order');
}

// 輸出購物車列表
function checkoutList() {
    let checkoutListId = document.getElementById('checkoutList');
    let checkoutItem = '';
    order.forEach(ele => {
        checkoutItem += `
        <div class="checkout_item">
            <div class="info">
                <p class="name">
                    ${ele.name}
                </p>
                <p>
                    x ${ele.amount}
                </p>
                <p class="depiction">
                    ${ele.size} ‧ ${ele.sugar} ‧ ${ele.ice}
                </p>
            </div>
            <div>
                $ ${ele.cost * ele.amount}
            </div>
        </div>
        `;
    })
    checkoutListId.innerHTML = checkoutItem;
}

// 計算總價
function total() {
    return order.reduce((sum, item) => {
        return sum + (parseInt(item.amount) * parseInt(item.cost));
    }, 0);
}

// 初始化
function into() {
    itemsTitle()
    clickOrder();
    hide('checkout');

    let inputClass = [...document.querySelectorAll('.inputNum')]
    inputClass.forEach(input => {
        input.addEventListener('input', function () {
            total(inputClass);
        });
    })
}

into();

// 隱藏／顯示
function hide(id) {
    let getId = document.getElementById(id);
    getId.style.display = "none";
}
function show(id) {
    let getId = document.getElementById(id);
    getId.style.display = "block";
}