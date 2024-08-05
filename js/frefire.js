document.addEventListener('DOMContentLoaded', function() {
    fetch('./JSON/frefire.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            window.products = data; // Save products globally
            displayProducts(data);
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));

    let cart = [];

    function displayProducts(products) {
        const productsContainer = document.getElementById('product-box');
        
        const cartcontainer = document.getElementById('cart-container');
        
        productsContainer.innerHTML = ''; // Clear previous content

        products.forEach(product => {
            const productDiv = document.createElement('div');
            
            productDiv.className = 'product';
            ///////////
            
            
            
            ////////////////
            productDiv.dataset.category = product.category; // Add category data attribute
            const discountText = product.descount.trim() ? `<p>${product.descount}</p>` : '';
            const discountDivStyle = product.descount.trim() ? '' : 'display: none;';
            productDiv.innerHTML = `
                
                <div class="image-uc" onclick="addToCart(${product.id})">
                    <img src="./${product.image}" alt="${product.name}" />
                
                    <div class="title">
                        <h3>${product.name}</h3>
                        <img class="imgProduct" src="./${product.imgProduct}" alt="${product.imgProduct}" />
                    </div>
                </div>
                <div class="price-EGP">
                    <h3>
                        ${product.price} <span> ج.م </span>
                    </h3>
                </div>
                    <h4 style="${discountDivStyle}" class="discount">
                        ${discountText}
                    </h4>
                <div class="button-add">
                    ${product.price === 'stock' ? 
                    '<button style="background-color: red;" disabled>   </button>'
                     : `<button class="addcart" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-shopping" style="color: #060606;"></i>
                        </button>`}
                </div>
            `;
            
            productsContainer.appendChild(productDiv);

        });
        
       
    }

    function showConfirmationMessage(message) {
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'confirmation-message';
        confirmationMessage.textContent = message;
        document.body.appendChild(confirmationMessage);
    
        const cartIcon = document.getElementById('toggle-cart');
    
        // تحديد موقع العنصر الجديد في منتصف الشاشة
        confirmationMessage.style.top = '50%';
        confirmationMessage.style.left = '50%';
        confirmationMessage.style.transform = 'translate(-50%, -50%)';
    
        // إضافة الحركة بعد فترة قصيرة من الوقت
        setTimeout(() => {
            const cartIconRect = cartIcon.getBoundingClientRect();
            confirmationMessage.style.transform = `translate(${cartIconRect.left - confirmationMessage.offsetLeft}px, ${cartIconRect.top - confirmationMessage.offsetTop}px) scale(0)`;
            confirmationMessage.style.opacity = '0';
        }, 1000);
    
        // إزالة العنصر من DOM بعد الأنيميشن
        setTimeout(() => {
            confirmationMessage.remove();
        }, 1500);
    }

    window.addToCart = function(productId) {
        const product = window.products.find(p => p.id === productId);
        if (product && product.price !== 'stuk') {
            if (!cart[product.category]) {
                cart[product.category] = [];
            }
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            displayCart();
            updateCartSummary();
            
            // عرض رسالة تأكيد
            showConfirmationMessage(` تم اضافه  ${product.name}  الى السله.`);
        
            
        }
    }

    window.removeFromCart = function(productId) {
        const productIndex = cart.findIndex(item => item.id === productId);
        if (productIndex !== -1) {
            if (cart[productIndex].quantity > 1) {
                cart[productIndex].quantity--;
            } else {
                cart.splice(productIndex, 1);
            }
            displayCart();
            updateCartSummary();
        }
    }

    function displayCart() {
        const cartContainer = document.getElementById('cart');
        cartContainer.innerHTML = '';
        let totalEGP = 0;
        let totalUC = 0;
        

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart';
            cartItem.innerHTML = `
                <h3>
                    ${item.name}
                    <span>${item.description}</span
                </h3>
                <i class="fa-solid fa-right-long fa-fade" style="color: #f70a0a;"></i>
                <h3>${item.price} EGP</h3>
                <h3 class="quantity">${item.quantity}</h3>
                <i class="fa-solid fa-trash fa-fade" style="color: #f40101;"onclick="removeFromCart(${item.id})"></i>
            `;
            totalEGP += item.price * item.quantity;
            totalUC += item.quantity;
             
            cartContainer.appendChild(cartItem);
        });

        document.getElementById("totalUC").textContent = `UC: ${totalUC}`;
        document.getElementById("totalEGP").textContent = `EGP:${totalEGP}`;
        
        
    }

    function updateCartSummary() {
        const totalUC = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalEGP = cart.reduce((sum, item) => sum + item.price * item.quantity , 0);

        document.getElementById('totalUC').textContent = `${totalUC}`;
        document.getElementById('totalEGP').textContent = `\n  اجمالى السعر : ${totalEGP} جنيه` ;
        // Show or hide the "Share Cart" button based on cart content
        const shareCartBtn = document.getElementById('payment');
        if (totalUC === 0) {
            shareCartBtn.style.display = 'none';
        } else {
            shareCartBtn.style.display = 'block';
        }
        
    }

    
    ///////////////////--share product by vodafone---////////////////////
    document.getElementById('share-vodafone').addEventListener('click', function() {
        const customerName = document.getElementById('customer-name').value;
        const customerId = document.getElementById('customer-id').value;
        
        let cartDetails = ` نورت الاستور يا : (${customerName}) \n\n :الايدى(ID): ${customerId} \n `;

        cartDetails += `-\n -------------------------------------- `;
        cartDetails += `\n  الرجاء مراجع طلبك قبل التحويل: \n\n`;

        cart.forEach(item => {
            cartDetails += `- ${item.name} ${item.description} :==> (x ${item.quantity})  = ${item.price * item.quantity} EGP\n\n`;
        });
                                                          
        if (!customerId) {
            alert(' الرجاء كتابه اسم الاعب والايدى(ID)');
            return;
        }

        const totalUC = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalEGP = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        cartDetails += `\n عدد الشحنات : ${totalUC} `;
        cartDetails += `\n اجمالى السعر : ${totalEGP} جنيه  `;                                                                                                                                                                                                                                                                                      
        cartDetails += `\n ------------------------------------ `;
        cartDetails += `\n  طريقه التحويل : (فودافون كاش)  `;
        cartDetails += `\n   رقم المحفظه :(01060440804) \n`;
        cartDetails += `\n  1-الرجاء ارسال المال على رقم المحفظه الموضح `;
        cartDetails += `\n  2-ارسال صوره التحويل واضحه لاتمام طلبك بنجاح `;
        

        const whatsappUrl = `https://wa.me/+201060440804?text=${encodeURIComponent(cartDetails)}`;
        window.open(whatsappUrl, '_blank');
    });


    ///////////////////--share product by instapay---////////////////////

    document.getElementById('share-instapay').addEventListener('click', function() {
        const customerName = document.getElementById('customer-name').value;
        const customerId = document.getElementById('customer-id').value;
        
        let cartDetails = ` نورت الاستور يا : (${customerName})\n\n :الايدى(ID): ${customerId}\n`;

        cartDetails += `-\n ------------------------------------ `;
        cartDetails += `\n  الرجاء مراجع طلبك قبل التحويل: \n\n`;

        cart.forEach(item => {
            cartDetails += `- ${item.name} ${item.description} :==> (x${item.quantity}) = ${item.price * item.quantity} EGP\n\n`;
        });
                                                          
        if (!customerId) {
            alert(' الرجاء كتابه اسم الاعب والايدى(ID)');
            return;
        }

        const totalUC = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalEGP = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        cartDetails += `\n عدد الشحنات : ${totalUC} `;
        cartDetails += `\n اجمالى السعر : ${totalEGP} جنيه  `;                                                                                                                                                                                                                                                                                      
        cartDetails += `\n ------------------------------------ `;
        cartDetails += `\n  طريقه التحويل : ( انستا باى )  `;
        cartDetails += `\n   عنوان الدفع (@)  :\n`;
        cartDetails += `\nabdelrahman_78789898@instapay\nhttps://ipn.eg/S/abdelrahman_78789898/instapay/4NZZiQ \n`
        cartDetails += `\n  1-الرجاء ارسال المال على العنوان الموضح `;
        cartDetails += `\n  2-ارسال صوره التحويل واضحه لاتمام طلبك بنجاح `;
        

        const whatsappUrl = `https://wa.me/+201060440804?text=${encodeURIComponent(cartDetails)}`;
        window.open(whatsappUrl, '_blank');
    });

});


