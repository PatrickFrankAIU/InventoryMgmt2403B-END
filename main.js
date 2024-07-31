let inventory = [
    {
        category: "Fruits",
        products: [
            { product: "Apples", quantity: 10 },
            { product: "Bananas", quantity: 5 },
            { product: "Oranges", quantity: 8 },
        ]
    },
    {
        category: "Vegetables",
        products: [
            { product: "Tomatoes", quantity: 15 },
            { product: "Carrots", quantity: 12 },
            { product: "Peppers", quantity: 9 },
        ]
    }
];

let shipment = [];
let order = [];

let categoryMenu = document.getElementById('categoryInput');
let productMenu = document.getElementById('productInput');

function createCategories() {
    inventory.forEach(category => {
        let categoryOption = document.createElement("option");
        categoryOption.value = category.category;
        categoryOption.textContent = category.category;
        categoryMenu.appendChild(categoryOption);
    });
}

function createProducts() {
    productMenu.innerHTML = "";
    let selectedCategory = inventory.find(category => category.category === categoryMenu.value);
    if (selectedCategory) {
        selectedCategory.products.forEach(product => {
            let productOption = document.createElement('option');
            productOption.value = product.product;
            productOption.text = product.product;
            productMenu.appendChild(productOption);
        });
    }
}

categoryMenu.addEventListener('change', createProducts);

function addNewCategory() {
    const categoryName = document.getElementById("newCategoryInput").value;
    const categoryExists = inventory.find(category => category.category === categoryName);
    if (!categoryExists && categoryName.trim() !== '') {
        inventory.push({category: categoryName, products: []});
        displayInventory();
        createCategories(); // Update category menu
    }
    document.getElementById('newCategoryInput').value = '';
}

function addShipment() {
    const categoryInput = document.getElementById('categoryInput').value;
    const productInput = document.getElementById('productInput').value;
    const quantityInput = parseInt(document.getElementById('quantityInput').value);

    if (!categoryInput || !productInput || isNaN(quantityInput)) {
        alert("Please fill out all the fields.");
        return;
    }

    let category = inventory.find(cat => cat.category === categoryInput);
    if (!category) {
        category = {category: categoryInput, products: []};
        inventory.push(category);
    }

    let product = category.products.find(prod => prod.product === productInput);
    if (product) {
        product.quantity += quantityInput;
    } else {
        category.products.push({product: productInput, quantity: quantityInput});
    }

    let shipCategory = shipment.find(cat => cat.category === categoryInput);
    if (!shipCategory) {
        shipCategory = {category: categoryInput, products: []};
        shipment.push(shipCategory);
    }

    let shipProduct = shipCategory.products.find(prod => prod.product === productInput);
    if (shipProduct) { 
        shipProduct.quantity += quantityInput;
    } else {
        shipCategory.products.push({product: productInput, quantity: quantityInput});
    }

    displayInventory();
    displayShipment();
}

function inputOrder() {
    const categoryInput = document.getElementById('categoryInput').value;
    const productInput = document.getElementById('productInput').value;
    const quantityInput = parseInt(document.getElementById('quantityInput').value);

    if (!categoryInput || !productInput || isNaN(quantityInput)) {
        alert("Please fill out all the fields.");
        return;
    }

    let category = inventory.find(cat => cat.category === categoryInput);
    if (!category) {
        category = {category: categoryInput, products: []};
        inventory.push(category);
    }

    let product = category.products.find(prod => prod.product === productInput);
    if (product) {
        product.quantity -= quantityInput;
    } else {
        category.products.push({product: productInput, quantity: -quantityInput});
    }

    let orderCategory = order.find(cat => cat.category === categoryInput);
    if (!orderCategory) {
        orderCategory = {category: categoryInput, products: []};
        order.push(orderCategory);
    }

    let orderProduct = orderCategory.products.find(prod => prod.product === productInput);
    if (orderProduct) {
        orderProduct.quantity += quantityInput;
    } else {
        orderCategory.products.push({product: productInput, quantity: quantityInput});
    }

    displayInventory();
    displayOrder();
}

function queryQuantity() {
    const queryProductInput = document.getElementById('queryProductInput').value;
    let found = false;
    inventory.forEach(category => {
        const product = category.products.find(prod => prod.product === queryProductInput);
        if (product) {
            alert(`${queryProductInput} Quantity: ${product.quantity}`);
            found = true;
        }
    });
    if (!found) {
        alert(`Product '${queryProductInput}' is not in the inventory.`);
    }
}

function displayInventory() {
    const inventoryDisplay = document.getElementById('inventoryDisplay');
    inventoryDisplay.innerHTML = '';
    inventory.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.innerHTML = `<strong>${category.category}</strong>:`;
        category.products.forEach(product => {
            categoryEl.innerHTML += `<div>${product.product}: ${product.quantity}</div>`;
        });
        inventoryDisplay.appendChild(categoryEl);
    });
}

function displayShipment() {
    const shipmentDisplay = document.getElementById('shipmentDisplay');
    shipmentDisplay.innerHTML = '';
    shipment.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.innerHTML = `<strong>${category.category}</strong>:`;
        category.products.forEach(product => {
            categoryEl.innerHTML += `<div>${product.product}: ${product.quantity}</div>`;
        });
        shipmentDisplay.appendChild(categoryEl);
    });
}

function displayOrder() {
    const orderDisplay = document.getElementById('orderDisplay');
    orderDisplay.innerHTML = '';
    order.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.innerHTML = `<strong>${category.category}</strong>:`;
        category.products.forEach(product => {
            categoryEl.innerHTML += `<div>${product.product}: ${product.quantity}</div>`;
        });
        orderDisplay.appendChild(categoryEl);
    });
}

// Initial display of inventory and category options
createCategories();
createProducts();
displayInventory();
