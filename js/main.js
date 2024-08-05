
 

////////////////////////////////////////////////////////
document.getElementById('whatsappShareButton').addEventListener('click', function() {
    
    var message = `
                                                 \n * مرحبا بك فى (BODA_STORE)
                  \n * دلوقتى تقدر تشحن جميع العاب الموبايل باسعار مميزه جدا 
                             \n * وجميع طرق الدفع القانونيه للتمتع بتجربه امنه 
                         \n   * اتمنى ذياره موقعنا فريقنا يسعده تقديم أفضل خدمة لك 
                                   \n https://a-b-d-0.github.io/BODA_Store/
           \n  * نشكر حضرتك لثقتك في متجرنا, ونتمنى أن نكون دائمًا عند حسن ظن حضرتك `; // 
    var phoneNumber = ""; // أضف رقم الهاتف إن وجد

    var whatsappUrl = "https://wa.me/";

    if (phoneNumber) {
        whatsappUrl += phoneNumber + "?text=" + encodeURIComponent(message);
    } else {
        whatsappUrl += "?text=" + encodeURIComponent(message);
    }

    window.open(whatsappUrl, '_blank');
});

///////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const productContainer = document.querySelector('.mobile-games');

    toggleButton.addEventListener('click', function() {
        if (productContainer.style.maxHeight === '280px' || productContainer.style.maxHeight === '') {
            productContainer.style.maxHeight = 'none';
            toggleButton.textContent = 'عرض أقل';
        } else {
            productContainer.style.maxHeight = '280px';
            toggleButton.textContent = 'عرض أكثر';
        }
    });
    
});

/////////////////////////////////////////////////////
 document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton2');
    const productContainer = document.querySelector('.mobile-games');

    toggleButton.addEventListener('click', function() {
        if (productContainer.style.maxHeight === '490px' || productContainer.style.maxHeight === '') {
            productContainer.style.maxHeight = 'none';
            toggleButton.textContent = 'عرض أقل';
        } else {
            productContainer.style.maxHeight = '490px';
            toggleButton.textContent = 'عرض أكثر';
        }
    });
    
});

/////////////////////////////////////////////////////

nah = document.querySelector(".navigation");
header = document.querySelector("header");
  click = document.querySelector(".list");

  document.querySelector('header').addEventListener('click', function() {
    nah.classList.toggle("Active")
  });
  
 ///////////////////////////-----////////////////////
 ////////////////////////////////////////////////////////////
 document.getElementById('toggle-cart').addEventListener('click', function() {
    window.scrollBy({
        top: 10000, // مقدار التمرير بالبيكسل
        
        behavior: 'smooth' // يجعل التمرير سلساً
    });
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButtonmobile');
    const productContainer = document.querySelector('.product-box');

    toggleButton.addEventListener('click', function() {
        if (productContainer.style.maxHeight === '300px' || productContainer.style.maxHeight === '') {
            productContainer.style.maxHeight = 'none';
            toggleButton.textContent = 'عرض أقل';
        } else {
            productContainer.style.maxHeight = '300px';
            toggleButton.textContent = 'عرض أكثر';
        }
    });
    
});
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButtonmobile2');
    const productContainer = document.querySelector('.product-box');

    toggleButton.addEventListener('click', function() {
        if (productContainer.style.maxHeight === '390px' || productContainer.style.maxHeight === '') {
            productContainer.style.maxHeight = 'none';
            toggleButton.textContent = 'عرض أقل';
        } else {
            productContainer.style.maxHeight = '390px';
            toggleButton.textContent = 'عرض أكثر';
        }
    });
    
});




 
