// DATE & TIME
document.getElementById('date').innerText =
    `Date: ${new Date().toLocaleDateString()} — ${new Date().toLocaleTimeString()}`;

// ITEMS DATA
const items = [
    { name: "AA Batteries (2-pack)", price: 30, qty: 0 },
    { name: "Almonds (100g)", price: 60, qty: 0 },
    { name: "Bandages", price: 25, qty: 0 },
    { name: "Bath Soap (100g)", price: 30, qty: 0 },
    { name: "Besan (500g)", price: 45, qty: 0 },
    { name: "Biscuits (small pack)", price: 35, qty: 0 },
    { name: "Bun (50g)", price: 15, qty: 0 },
    { name: "Bottled Water (1L)", price: 20, qty: 0 },
    { name: "Bread (400g)", price: 35, qty: 0 },
    { name: "Butter (100g)", price: 55, qty: 0 },
    { name: "Canned Soup", price: 110, qty: 0 },
    { name: "Chips (small pack)", price: 20, qty: 0 },
    { name: "Chilli Powder (100g)", price: 25, qty: 0 },
    { name: "Cold Drink (250ml)", price: 35, qty: 0 },
    { name: "Cold Drink (500ml)", price: 40, qty: 0 },
    { name: "Vicks Candy", price: 5, qty: 0 },
    { name: "Cotton Earbuds", price: 20, qty: 0 },
    { name: "Detergent Bar", price: 10, qty: 0 },
    { name: "Detergent Powder (500g)", price: 50, qty: 0 },
    { name: "Dish Soap (500ml)", price: 55, qty: 0 },
    { name: "Flour/Atta (1kg)", price: 55, qty: 0 },
    { name: "Hair Oil (50ml)", price: 35, qty: 0 },
    { name: "Hand Wash (200ml)", price: 45, qty: 0 },
    { name: "Instant Noodles (Maggi)", price: 14, qty: 0 },
    { name: "Jam (100g)", price: 30, qty: 0 },
    { name: "LED Bulb (9W)", price: 80, qty: 0 },
    { name: "Matchbox", price: 3, qty: 0 },
    { name: "Milk (500ml)", price: 28, qty: 0 },
    { name: "Moong Dal (500g)", price: 55, qty: 0 },
    { name: "Notebook (small)", price: 25, qty: 0 },
    { name: "Oil Sachet (50ml)", price: 42, qty: 0 },
    { name: "Date", price: 500, qty: 0 },
    { name: "Organo (100g)", price: 30, qty: 0 },
    { name: "Paper Towels", price: 60, qty: 0 },
    { name: "Peeper (50g)", price: 12, qty: 0 },
    { name: "Peanut Butter (200g)", price: 120, qty: 0 },
    { name: "Pen (Single)", price: 10, qty: 0 },
    { name: "Print page (100)", price: 75, qty: 0 },
    { name: "Rice (1kg)", price: 55, qty: 0 },
    { name: "Salt (1kg)", price: 18, qty: 0 },
    { name: "Sanitizer (50ml)", price: 25, qty: 0 },
    { name: "Shampoo Sachet", price: 2, qty: 0 },
    { name: "Sugar (1kg)", price: 45, qty: 0 },
    { name: "Tea (100g)", price: 32, qty: 0 },
    { name: "Toffee (small pack)", price: 25, qty: 0 },
    { name: "Tooth  Paste (50g)", price: 40, qty: 0 },
    { name: "Toilet Paper (2-roll)", price: 55, qty: 0 },
    { name: "Toor Dal (500g)", price: 70, qty: 0 },
    { name: "Toothpaste (100g)", price: 55, qty: 0 },
    { name: "Turmeric Powder (100g)", price: 20, qty: 0 },
    { name: "Wheat Rusk (200g)", price: 35, qty: 0 }
];

// RENDER ITEM LIST
const itemsList = document.getElementById("items-list");

items.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
        <span>${item.name} - ₹${item.price}</span>
        <div class="qty-controls">
            <button onclick="decreaseQty(${i})">-</button>
            <input type="number" id="qty-${i}" value="${item.qty}" min="0" 
                   onchange="updateQty(${i}, this.value)" 
                   onkeyup="updateQty(${i}, this.value)" 
                   class="qty-input">
            <button onclick="increaseQty(${i})">+</button>
        </div>
    `;
    itemsList.appendChild(div);
});

// SEARCH
document.getElementById("search").addEventListener("input", function() {
    const text = this.value.toLowerCase();
    const all = document.querySelectorAll(".item");

    all.forEach(div => {
        const name = div.querySelector("span").innerText.toLowerCase();
        div.style.display = name.includes(text) ? "flex" : "none";
    });
});

// QTY FUNCTIONS
function increaseQty(i) {
    items[i].qty++;
    document.getElementById(`qty-${i}`).value = items[i].qty;
}

function decreaseQty(i) {
    if (items[i].qty > 0) {
        items[i].qty--;
        document.getElementById(`qty-${i}`).value = items[i].qty;
    }
}

// NEW FUNCTION: Update quantity via keyboard input
function updateQty(i, value) {
    const qty = parseInt(value) || 0;
    if (qty >= 0) {
        items[i].qty = qty;
        document.getElementById(`qty-${i}`).value = qty;
    }
}

// CALCULATE BILL
function calculateBill() {
    const cname = document.getElementById("customerName").value || "N/A";
    const mobile = document.getElementById("mobile").value || "N/A";

    const discount = Number(document.getElementById("discount").value);

    let subTotal = 0;
    let html = `
        <p><b>Customer:</b> ${cname}<br>
        <b>Mobile:</b> ${mobile}</p>
        <table border="1" cellpadding="5">
            <tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th></tr>
    `;

    items.forEach(item => {
        if (item.qty > 0) {
            const t = item.qty * item.price;
            subTotal += t;
            html += `<tr>
                        <td>${item.name}</td>
                        <td>₹${item.price}</td>
                        <td>${item.qty}</td>
                        <td>₹${t}</td>
                     </tr>`;
        }
    });

    const discountAmount = (subTotal * discount) / 100;
    const finalTotal = subTotal - discountAmount;

    html += `
        <tr><td colspan="3">Subtotal</td><td>₹${subTotal}</td></tr>
        <tr><td colspan="3">Discount (${discount}%)</td><td>₹${discountAmount}</td></tr>
        <tr><td colspan="3"><b>Total</b></td><td><b>₹${finalTotal}</b></td></tr>
        </table>
    `;

    document.getElementById("bill").innerHTML = html;
}

document.getElementById("calculateBtn").addEventListener("click", calculateBill);

// PDF
document.getElementById("downloadPdf").addEventListener("click", () => {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const cname = document.getElementById("customerName").value || "N/A";
    const mobile = document.getElementById("mobile").value || "N/A";

    doc.setFontSize(16);
    doc.text("Patel Stores", 14, 15);
    doc.setFontSize(12);
    doc.text("Kurebhar", 14, 21);

    doc.text(`Date: ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()}`, 14, 28);

    doc.text(`Customer: ${cname}`, 14, 36);
    doc.text(`Mobile: ${mobile}`, 14, 42);

    const tableColumn = ["Item", "Price", "Qty", "Total"];
    const tableRows = [];
    let subtotal = 0;

    items.forEach(item => {
        if (item.qty > 0) {
            const total = item.qty * item.price;
            subtotal += total;
            tableRows.push([item.name, `${item.price}`, item.qty, `${total}`]);
        }
    });

    const discount = Number(document.getElementById("discount").value);
    const discountAmount = (subtotal * discount) / 100;
    const finalTotal = subtotal - discountAmount;

    doc.autoTable({
        startY: 50,
        head: [tableColumn],
        body: tableRows,
    });

    const summary = [
        ["Subtotal", subtotal.toFixed(2)],
        ["Discount", discount + "%"],
        ["Discount Amount", discountAmount.toFixed(2)],
        ["Final Total", finalTotal.toFixed(2)]
    ];

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [
            ["Summary", "Amount"]
        ],
        body: summary
    });

    doc.save("bill.pdf");

    setTimeout(() => location.reload(), 700);
});