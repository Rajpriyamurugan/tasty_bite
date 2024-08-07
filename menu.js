document.addEventListener('DOMContentLoaded', () => {
    const menuForm = document.getElementById('menu-form');
    const menuItemsList = document.getElementById('menu-items');
    let editingItem = null;

    // Extended sample items
    const sampleItems = [
        { name: 'Tasty Burger', description: 'A delicious burger with all the toppings.', price: 150, image: 'images/p-1.jpg' },
        { name: 'Tasty Pizza', description: 'Cheesy and delicious pizza with a crispy crust.', price: 500, image: 'images/p-2.jpg' },
        { name: 'Spaghetti Carbonara', description: 'Classic Italian pasta with creamy sauce and pancetta.', price: 400, image: 'images/p-3.jpg' },
        { name: 'Caesar Salad', description: 'Fresh salad with romaine lettuce, croutons, and Caesar dressing.', price: 250, image: 'images/p-4.jpg' },
        { name: 'Chicken Curry', description: 'Spicy and flavorful chicken curry served with rice.', price: 350, image: 'images/p-5.jpg' },
        { name: 'Chocolate Cake', description: 'Rich and moist chocolate cake with a creamy frosting.', price: 200, image: 'images/p-6.jpg' },
        { name: 'Greek Yogurt Parfait', description: 'Layered yogurt parfait with fresh fruits and granola.', price: 180, image: 'images/greeks.jpeg' },
        { name: 'Vegetable Stir-Fry', description: 'A colorful mix of vegetables stir-fried with a savory sauce.', price: 300, image: 'images/fry.jpeg' },
        { name: 'Margherita Pizza', description: 'Classic pizza topped with tomatoes, mozzarella, and fresh basil.', price: 400, image: 'images/m pizza.jpeg' },
        { name: 'BBQ Ribs', description: 'Tender ribs smothered in tangy barbecue sauce.', price: 600, image: 'images/ribs.jpeg' },
        { name: 'Falafel Wrap', description: 'Crispy falafel wrapped in pita with fresh vegetables and tahini sauce.', price: 220, image: 'images/wrap.jpeg' },
        { name: 'Shrimp Tacos', description: 'Soft tacos filled with spicy shrimp and topped with avocado salsa.', price: 350, image: 'images/tacos.jpeg' },
        { name: 'Lamb Chops', description: 'Grilled lamb chops with a rosemary and garlic marinade.', price: 700, image: 'images/chops.jpeg' },
        { name: 'Pancakes', description: 'Fluffy pancakes served with maple syrup and butter.', price: 250, image: 'images/pan cake.jpeg' },
        { name: 'Chicken Caesar Wrap', description: 'Grilled chicken, romaine lettuce, and Caesar dressing in a wrap.', price: 280, image: 'images/chicken.jpg' },
        { name: 'Vegetarian Chili', description: 'A hearty chili packed with vegetables and spices.', price: 300, image: 'images/veg chilli.jpeg' }
    ];

    // Initialize menu with sample items
    sampleItems.forEach(item => addMenuItem(item));

    menuForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('item-name').value;
        const description = document.getElementById('item-description').value;
        const price = document.getElementById('item-price').value;
        const image = document.getElementById('item-image').files[0];

        if (name && description && price && image) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgURL = e.target.result;
                if (editingItem) {
                    // Update existing item
                    editingItem.name = name;
                    editingItem.description = description;
                    editingItem.price = price;
                    editingItem.image = imgURL;
                    updateMenuItem(editingItem.element, editingItem);
                    editingItem = null;
                } else {
                    // Add new item
                    const newItem = { name, description, price, image: imgURL };
                    addMenuItem(newItem);
                }
                menuForm.reset();
            };
            reader.readAsDataURL(image);
        }
    });

    function addMenuItem(item) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">₹${item.price}</span>
            </div>
            <div class="item-actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        menuItemsList.appendChild(listItem);

        // Add event listeners for delete and edit buttons
        listItem.querySelector('.delete').addEventListener('click', () => {
            listItem.remove();
        });

        listItem.querySelector('.edit').addEventListener('click', () => {
            document.getElementById('item-name').value = item.name;
            document.getElementById('item-description').value = item.description;
            document.getElementById('item-price').value = item.price;
            // Setting up image preview is omitted; consider implementing it if needed
            editingItem = {
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.image,
                element: listItem
            };
        });
    }

    function updateMenuItem(element, item) {
        element.querySelector('img').src = item.image;
        element.querySelector('h3').textContent = item.name;
        element.querySelector('p').textContent = item.description;
        element.querySelector('.price').textContent = `₹${item.price}`;
    }
});
