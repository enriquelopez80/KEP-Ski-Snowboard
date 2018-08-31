$(document).ready(function () {

    let resetCart = () => {
        localStorage.clear()
        $("#cart").html(`<h3>Your Cart is Empty!</h3>`)
    }

    let buildModalObj = (data) => {
        let modalObj = {};
        //CREATE UNIQUE SUBSET OF DATA FOR COLORS AND SIZES//
        let colors = data.map(function (item) { return item.color });
        let sizes = data.map(function (item) { return item.size });
        //BUILD OUT MODAL OBJ:
        modalObj.class = data[0].class;
        modalObj.color = colors.filter(onlyUnique);
        modalObj.department = data[0].department;
        modalObj.description = data[0].description;
        modalObj.id = data[0].id;
        modalObj.imgSrc = data[0].imgSrc;
        modalObj.inventoryUnits = data[0].inventoryUnits;
        modalObj.inventoryValue = data[0].inventoryValue;
        modalObj.itemPrice = data[0].itemPrice;
        modalObj.name = data[0].name;
        modalObj.size = sizes.filter(onlyUnique);
        modalObj.subclass = data[0].subclass
        return modalObj
    }

    let renderModal = (data) => {
        $(".uk-modal-title").text(data.name);
        $(".uk-modal-img").attr("src", `${data.imgSrc}`);
        $(".uk-modal-description").text(data.description);
        $(".colors-available").html(createButtonsHTML(data.color, "color"))
        $(".sizes-available").html(createButtonsHTML(data.size, "size"))
    }

    let createButtonsHTML = (set, buttonType) => {
        let buttons = "";
        for (let item of set) {
            if (buttonType === "color") {
                buttons += `<button class="uk-button uk-button-${buttonType} uk-button-default uk-button-small" style="border: 1px solid ${item}">${item}</button>`
            } else if (buttonType === "size") {
                buttons += `<button class="uk-button uk-button-${buttonType} uk-button-default uk-button-small">${item}</button>`
            }
        }
        return buttons;
    }

    let onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    let addToCart = () => {
        event.preventDefault();
        let cartItem = {};
        cartItem.name = $(".uk-modal-title").html();
        cartItem.imgSrc = $(".uk-modal-img").attr("src");
        cartItem.description = $(".uk-modal-description").html();
        cartItem.id = $("#modal-sections").data("id");
        console.log(JSON.stringify(cartItem, undefined, 2));
        saveDataToCart(cartItem)
        renderCart()
    }

    let saveDataToCart = (data) => {
        let cart = [];
        if (JSON.parse(localStorage.getItem("session") !== null)) {
            cart = JSON.parse(localStorage.getItem("session"));
        }
        // PUSH NEW ITEM ONTO CART-ARRAY
        cart.push(data);
        // RE-SERIALIZE THE ARRAY BACK INTO A STRING TO STORE IN LOCAL STORAGE
        localStorage.setItem("session", JSON.stringify(cart));
    }

    let renderCart = () => {

        let currentCart = JSON.parse(localStorage.getItem("session"));
        if (currentCart !== null) {
            $("#cart").empty()
            $("#cart").append(`<h3>Your Order</h3>`)
            currentCart.forEach(item => {
                $("#cart").append(`
                <li class="cart-item" data-id="${item.id}">${item.name.toUpperCase()}</li>
                `);
            })
            let $emptyCartBtn = $(`<a class="uk-button uk-button-default" id="emptyCart">EMPTY CART</a>`)
                .css({ "margin-top": "20px", "width": "100%", "background-color": "firebrick" })
            let $checkOutBtn = $(`<a class="uk-button uk-button-default" id="checkOut">Checkout</a>`)
                .css({ "margin-top": "20px", "width": "100%", "background-color": "green" })

            $("#cart").append($emptyCartBtn)
            $("#cart").append($checkOutBtn)
        } else {
            $("#cart").empty()
            $("#cart").append(`<h3>Your Order</h3>`)
        }
    }

    // let toggleSelectedClass = (target) => {
    //     let $target = $(this).html();
    //     $(`.uk-button-${target}`).attr("data-class", "unselected");
    //     $(this).attr("data-class", "selected");
    //     console.log($target);
    // }

    //CLICK-LISTENERS//
    //***************//

    $(document).on("click", ".uk-button-color", function () {
        let $color = $(this).html();
        $(".uk-button-color").attr("data-class", "unselected");
        $(this).attr("data-class", "selected");
        console.log($color);
        return
    })

    $(document).on("click", ".uk-button-size", function () {
        let $size = $(this).html();
        $(".uk-button-size").attr("data-class", "unselected");
        $(this).attr("data-class", "selected");
        console.log($size);
        return
    })


    $(document).on("click", ".uk-button", function () {
        let item = $(this).data("name");
        if (item) {
            $.ajax({
                url: `/all/${item}`,
                method: "GET",
                success: (data) => {
                    let modalObj = buildModalObj(data.merch);
                    renderModal(modalObj)
                }
            })
        }
        return
    });

    //SHOPPING CART CLICK LISTENERS//
    //*****************************//

    $(document).on("click", "#addToCart", addToCart)
    $(document).on("click", "#emptyCart", resetCart)
    // $(document).on("click", "#checkout", checkOut)

    //ON PAGE LOAD://
    renderCart()

});



