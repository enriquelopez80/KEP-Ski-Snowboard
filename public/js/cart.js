$(document).ready(function () {

    const addToCart = () => {
        event.preventDefault();
        let cartItem = {};
        cartItem.name = $(".uk-modal-title").html();
        cartItem.imgSrc = $(".uk-modal-img").attr("src");
        cartItem.price = $(".uk-modal-price").html();
        cartItem.id = $("#modal-sections").data("id");

        //PREVENT DEFAULT UNDEFINED IF UNSELECTED: (CREATE NOTIFICATION FROM KAMON SLACK)
        cartItem.color = $('*[data-class="selected-color"]').html();
        if (cartItem.color === undefined) {
            alert("PLEASE SELECT A COLOR")
            return
        }
        //PREVENT DEFAULT UNDEFINED IF UNSELECTED: (CREATE NOTIFICATION FROM KAMON SLACK)
        cartItem.size = $('*[data-class="selected-size"]').html();
        if (cartItem.size === undefined) {
            alert("PLEASE SELECT A SIZE")
            return
        }
        console.log(JSON.stringify(cartItem, undefined, 2));
        saveDataToCart(cartItem)
        renderCart()
    };

    const saveDataToCart = (data) => {
        let cart = [];
        if (JSON.parse(localStorage.getItem("cart") !== null)) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        // PUSH NEW ITEM ONTO CART-ARRAY
        cart.push(data);
        // RE-SERIALIZE THE ARRAY BACK INTO A STRING TO STORE IN LOCAL STORAGE
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const renderCart = () => {
        let currentCart = JSON.parse(localStorage.getItem("cart"));
        if (currentCart != null) {
            $("#cart").empty()
            $("#cart").append(`<h3>Your Order</h3>`)
            currentCart.forEach(item => {
                $("#cart").append(`
                <ul class="uk-nav uk-nav-default">
                <li class="uk-active cart-item" data-id="${item.id}">${item.name.toUpperCase()}</li>
                <li class="uk-parent">
                    <ul class="uk-nav-sub">
                        <li>${item.color}</li>
                        <li>${item.size}</li>
                        <li>${item.price}</li>
                    </ul>
                </li>
                <li class="uk-nav-divider"></li>
                </ul>
                `);
            })
            $("#cart").append(`
            <div class="checkout-button" >
            <a href="#" id="checkout"><span class="uk-margin-small-right" uk-icon="icon: credit-card"></span>Checkout</a>
            </div>
            <div class="empty-cart-button">
            <a href="#" id="emptyCart"><span class="uk-margin-small-right" uk-icon="icon: trash"></span>Empty Cart</a>
            </div>
            `)
            $(".checkout-button").css({ "margin-top": "25px", "margin-bottom": "10px" });
        } else {
            $("#cart").empty()
            $("#cart").append(`<h3>Your Cart is Empty!</h3>`)
        }

    };

    const resetCart = () => {
        event.preventDefault()
        localStorage.clear()
        $("#cart").html(`<h3>Your Cart is Empty!</h3>`)
    };

    const checkout = (event) => {
        event.preventDefault();
        let cartArray = [];
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.forEach(item => {
            let invoiceItem = {};
            invoiceItem.name = item.name;
            invoiceItem.color = item.color;
            invoiceItem.size = item.size;
            cartArray.push(invoiceItem);
        })
        ajaxCheckOut(cartArray);
    };

    const ajaxCheckOut = (data) => {
        $.ajax({
            type: "PUT",
            url: "/checkout",
            data: { data },
            success: function (data) {
                // console.log(JSON.stringify(data, undefined, 2));
                const invoiceArrayJSON = data.map(item => {
                    return item.fulfillmentValue;
                });
                localStorage.setItem("invoice", JSON.stringify(invoiceArrayJSON));
                renderInvoicePage(renderInvoiceItems)
            }
        })
    };

    const renderInvoicePage = (cb) => {
        let invoice = JSON.parse(localStorage.getItem("invoice"));
        let $target = $("body")
        $target.html(`
        <div class="uk-position-top"> <nav class="uk-navbar-container uk-navbar-transparent navMerch" uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-light; top: 200" uk-navbar> <div class="uk-navbar-left uk-dark navbar"> <ul class="uk-navbar-nav"> <li> <a href="#">Men's</a> <div class="uk-navbar-dropdown uk-navbar-dropdown-width-2"> <div class="uk-navbar-dropdown-grid uk-child-width-1-2" uk-grid> <div> <ul class="uk-nav uk-navbar-dropdown-nav"> <li class="uk-active"><a href="#">Apparel</a></li><li class="uk-nav-divider"></li><li><a href="/mens/jackets" id="mensJackets">Jackets</a></li><li><a href="/mens/fleece" id="mensFleece">Fleece</a></li><li><a href="/mens/vests" id="mensVests">Vests</a></li><li><a href="/mens/pants" id="mensPants">Pants</a></li></ul> </div><div> <ul class="uk-nav uk-navbar-dropdown-nav"> <li class="uk-active"><a href="#">Accessories</a></li><li class="uk-nav-divider"></li><li><a href="/accessories/mens/hats">Hats</a></li><li><a href="/accessories/mens/scarves">Scarves</a></li><li><a href="/accessories/mens/gloves">Gloves</a></li><li><a href="/accessories/mens/socks">Socks</a></li></ul> </div></div></div></li><li> <a href="#">Women's</a> <div class="uk-navbar-dropdown uk-navbar-dropdown-width-2"> <div class="uk-navbar-dropdown-grid uk-child-width-1-2" uk-grid> <div> <ul class="uk-nav uk-navbar-dropdown-nav"> <li class="uk-active"><a href="#">Apparel</a></li><li class="uk-nav-divider"></li><li><a href="/womens/jackets" id="womensJackets">Jackets</a></li><li><a href="/womens/fleece" id="womensFleece">Fleece</a></li><li><a href="/womens/vests" id="womensVests">Vests</a></li><li><a href="/womens/pants" id="womensPants">Pants</a></li></ul> </div><div> <ul class="uk-nav uk-navbar-dropdown-nav"> <li class="uk-active"><a href="#">Accessories</a></li><li class="uk-nav-divider"></li><li><a href="/accessories/womens/hats">Hats</a></li><li><a href="/accessories/womens/scarves">Scarves</a></li><li><a href="/accessories/womens/gloves">Gloves</a></li><li><a href="/accessories/womens/socks">Socks</a></li></ul> </div></div></div></li></li><li> <a href="#">Accessories</a> <div class="uk-navbar-dropdown uk-navbar-dropdown-width-2"> <div class="uk-navbar-dropdown-grid uk-child-width-1-2" uk-grid> <div> <ul class="uk-nav uk-navbar-dropdown-nav"> <li class="uk-active"><a href="#">Men's</a></li><li class="uk-nav-divider"></li><li><a href="/accessories/mens/hats">Hats</a></li><li><a href="/accessories/mens/scarves">Scarves</a></li><li><a href="/accessories/mens/gloves">Gloves</a></li><li><a href="/accessories/mens/socks">Socks</a></li></ul> </div><div> <ul class="uk-nav uk-navbar-dropdown-nav"> <li class="uk-active"><a href="#">Women's</a></li><li class="uk-nav-divider"></li><li><a href="/accessories/womens/hats">Hats</a></li><li><a href="/accessories/womens/scarves">Scarves</a></li><li><a href="/accessories/womens/gloves">Gloves</a></li><li><a href="/accessories/womens/socks">Socks</a></li></ul> </div></div></div></li><li> <a href="#">Ski</a> <div class="uk-navbar-dropdown"> <ul class="uk-nav uk-navbar-dropdown-nav"> <li class="uk-active"><a href="#">Equipment</a></li><li class="uk-nav-divider"></li><li><a href="/ski/skis" id="skis">Skis</a></li><li><a href="/ski/bindings" id="skiBindings">Bindings</a></li><li><a href="/ski/boots" id="skiBoots">Boots</a></li><li class="uk-nav-header">Safety</li><li class="uk-nav-divider"></li><li><a href="/equipment/helmets" class="helmets">Helmets</a></li></ul> </div></li><li> <a href="#">Snowboard</a> <div class="uk-navbar-dropdown"> <ul class="uk-nav uk-navbar-dropdown-nav"> <li class="uk-active"><a href="#">Equipment</a></li><li class="uk-nav-divider"></li><li><a href="/snowboard/boards" id="snowboards">Boards</a></li><li><a href="/snowboard/bindings" id="snowBindings">Bindings</a></li><li><a href="/snowboard/boots" id="snowBoots">Boots</a></li><li class="uk-nav-header">Safety</li><li class="uk-nav-divider"></li><li><a href="/equipment/helmets" class="helmets">Helmets</a></li></ul> </div></li></ul> </div><div class="uk-navbar-right navbarRight"> <div> <a class="uk-navbar-toggle uk-dark" uk-search-icon href="#"></a> <div class="uk-drop" uk-drop="mode: click; pos: right-center; offset: 0"> <form class="uk-search uk-search-navbar uk-width-1-1"> <span uk-search-icon></span> <input class="uk-search-input uk-light" type="search" placeholder="Search our merch..." autofocus> </form> </div></div><div class="uk-offcanvas-content"> <button class="uk-icon-button" id="dislay-cart-button" uk-icon="icon: cart;" class="uk-button" type="button" uk-toggle="target: #offcanvas-overlay"></button> <div id="offcanvas-overlay" uk-offcanvas="flip: true"> <div class="uk-offcanvas-bar"> <button class="uk-offcanvas-close" type="button" uk-close></button> <div id="cart"> <h3>Your Cart is Empty!</h3> </div></div></div></div></div></nav></div><div class="uk-container invoice-container" style="margin-top: 85px; background-color: white"> <h1 style="margin-top: 50px; margin-bottom: 20px; border-bottom: 1px solid black">Complete Your Order</h1> <h2 style="margin-bottom: 20px;">Order Summary</h2> <div class="uk-margin"> <dl class="uk-description-list uk-description-list-divider" id="invoice-target"> </dl> </div><form style="margin-top: 40px"> <fieldset class="uk-fieldset"> <h2 style="margin-bottom: 20px">Shipping and Payment</h2> <div class="uk-margin"> <label for="customer">Recipient:</label> <input class="uk-input" id="customer-name" type="text"> </div><div class="uk-margin"> <label for="uk-select">Select Payment Method:</label> <select class="uk-select"> <option>VISA</option> <option>Mastercard</option> <option>Amex</option> </select> </div><div class="uk-margin"> <label for="address">Shipping Address:</label> <input class="uk-input" id="customer-address" type="text"> </div><div class="uk-margin"> <label for="shipping-instructions">Shipping Instructions:</label> <textarea class="uk-textarea" rows="4" id="shipping-instructions"></textarea> </div></fieldset> <p uk-margin> <button class="uk-button uk-button-primary uk-button-large" id="place-order">Place Order</button> <button class="uk-button uk-button-default uk-button-large">Continue Shopping</button> </p></form></div><script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><script type="text/javascript" src="../js/index.js"></script><script type="text/javascript" src="../js/cart.js"></script>        `).css({ "background-color": "silver" })
        cb(invoice)
    }

    const renderInvoiceItems = (itemsArray) => {
        let $target = $("#invoice-target");
        let subTotal = 0;
        itemsArray.forEach(item => {
            $target.append(`
            <dt style="font-weight: 600">${item.name}</dt>
            <dd>COLOR: ${item.color}</dd>
            <dd>SIZE: ${item.size}</dd>
            <dd>PRICE: $${item.itemPrice}</dd>
            `)
            subTotal += item.itemPrice;
        })
        $target.append(`
        <div class="uk-margin">
        <h4>ORDER TOTAL: $${subTotal}</h4>
        </div>
        `)
    }

    const placeOrder = (event) => {
        event.preventDefault()
        let orderInfo = {}
        let cart = JSON.parse(localStorage.getItem("invoice"))
        orderInfo.customer = $("#customer-name").val().trim();
        orderInfo.shipTo = $("#customer-address").val().trim();
        orderInfo.instructions = $("#shipping-instructions").val().trim();
        orderInfo.productIds = cart.map(item => {
            return item.id
        })
        console.log(orderInfo)
    }

    //SHOPPING CART CLICK LISTENERS//
    //*****************************//
    $(document).on("click", "#addToCart", addToCart)
    $(document).on("click", "#emptyCart", resetCart)
    $(document).on("click", "#checkout", checkout)
    $(document).on("click", "#place-order", placeOrder)

    //ON PAGE LOAD://
    renderCart()

});
