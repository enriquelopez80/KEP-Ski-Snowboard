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
            <div class="checkout-button">
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

    // const checkout = (event) => {
    //     event.preventDefault();
    //     // let cartData = {};
    //     let cart = JSON.parse(localStorage.getItem("cart"));
    //     $.ajax({
    //         type: "PUT",
    //         url: "/checkout",
    //         data: {
    //             ids: cart.map(item => {return item.id}) 
    //         },
    //         // dataType: JSON,
    //         success: () => {
    //             console.log("SUCCESS!")
    //         }
    //     })
    // };

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
        // let ids = cart.map(item => {return item.id});
        // console.log(ids)
        console.log(cartArray);
        ajaxCheckOut(cartArray);
    };

    const ajaxCheckOut = (data) => {
        $.ajax({
            type: "PUT",
            url: "/checkout",
            data: {data},
            success: () => {
                console.log('SUCCESS')
            }
        })
    };

    //SHOPPING CART CLICK LISTENERS//
    //*****************************//
    $(document).on("click", "#addToCart", addToCart)
    $(document).on("click", "#emptyCart", resetCart)
    $(document).on("click", "#checkout", checkout)

    //ON PAGE LOAD://
    renderCart()

});
