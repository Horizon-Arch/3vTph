function formatNumberWithSpaces(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const rebarterData = {
    g: {
        name: "Болота",
        rebarter: [
            {name: "Болотный камень", cost: 2},
            {name: "Зеленая плесень", cost: 1}
        ]
    },
    f: {
        name: "Обочина",
        rebarter: [
            {name: "Корень-вонючка", cost: 3},
            {name: "Срачник", cost: 4},
            {name: "Остатки медной проволоки", cost: 4}
        ]
    },
    a: {
        name: "Бар",
        rebarter: [
            {name: "Росток чернобыльской ромашки", cost: 4},
            {name: "Остатки Радиопередатчика", cost: 4},
            {name: "Рассольник", cost: 4},
            {name: "Фрагменты данных «Альфа»", cost: 21}
        ]
    },
    b: {
        name: "Бар 100-Ренгтен",
        rebarter: [
            {name: "Северный мох", cost: 5},
            {name: "Остатки аккумулятора", cost: 7},
            {name: "Дурман-камень", cost: 8},
            {name: "Фрагменты данных «Бета»", cost: 40}
        ]
    },
    c: {
        name: "Север",
        rebarter: [
            {name: "Квантовая батарея", cost: 42},
            {name: "Рыжий папоротник", cost: 10},
            {name: "Остатки пси-маячка", cost: 7},
            {name: "Вещество 07270", cost: 8},
            {name: "Фрагменты данных «Гамма»", cost: 66}
        ]
    },
    d: {
        name: "Любеч-3",
        rebarter: [
            {name: "Горьколистник", cost: 12},
            {name: "Лимб", cost: 15},
            {name: "Лимбоплазма", cost: 200},
            {name: "Фрагменты данных «Лямбда»", cost: 86},
            {name: "Аномальная батарея", cost: 240}
        ]
    }
};

document.getElementById('location').addEventListener('change', function() {
    const selectedLocation = this.value;
    const rebarterDiv = document.getElementById('rebarter');
    const rebarterInputs = document.getElementById('rebarterInputs');

    rebarterInputs.innerHTML = '';

    if (selectedLocation) {
        const selectedMaterials = rebarterData[selectedLocation].rebarter;

        selectedMaterials.forEach(material => {
            const inputDiv = document.createElement('div');
            inputDiv.innerHTML = `
                <label>${material.name}:</label>
                <input type='number' id='${material.name.replace(/\s+/g, '_')}' min='0' value=''>
            `;
            rebarterInputs.appendChild(inputDiv);
        });

        rebarterDiv.style.display = 'block';
    } else {
        rebarterDiv.style.display = 'none';
    }
});

function outputFormattedResult() {
    const selectedLocation = document.getElementById('location').value;
    const selectedMaterials = rebarterData[selectedLocation].rebarter;
    
    let totalCost = 0;
    let itemName = document.getElementById('itemName').value || '<...>';
    
    let outputDetails = `**Обменные монеты на ${itemName}:**\n`;

    selectedMaterials.forEach(material => {
        const quantity = parseInt(document.getElementById(material.name.replace(/\s+/g, '_')).value) || 0;
        
        if (quantity > 0) {
            const materialCost = quantity * material.cost; 
            outputDetails += `> ${material.name}: ${formatNumberWithSpaces(materialCost)};\n`;
            totalCost += materialCost; 
        }
    });

    outputDetails += `Суммарно: **${formatNumberWithSpaces(totalCost)}.**`;

    document.getElementById('result').innerText = outputDetails;
    document.getElementById('result').style.display = 'block';
}

function resetFormA() {
    const rebarterInputs = document.querySelectorAll('#rebarterInputs input[type="number"]');
    rebarterInputs.forEach(input => {
        input.value = '';
    });
    document.getElementById('itemName').value = '';
}

function resetForm() {
    document.getElementById('rebarter').style.display = 'none'; 
    document.getElementById('rebarterInputs').innerHTML = ''; 
    document.getElementById('itemName').value = ''; 
    document.getElementById('result').style.display = 'none';
}
