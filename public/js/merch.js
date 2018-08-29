$(document).ready(function () {

    //CLICK-LISTENERS//
    //***************//

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
    /*
        1) Add To Cart -- SUBMIT to local storage(?) the following:
            - the modal item name, description, (all the other obvious ones)  //--*OR see below--//
            - the SELECTED size (meaning send .text() of the size button with class of 'selected')
            - the SELECTED color (meaning send .text() of the color button with class of 'selected')
    
        2) Color & Size -- CLICK LISTENERS to toggle 'selected'
            - the 'selected' class... To prevent multiple selections "Add To Cart" would also 
              have to trigger some kind of validation (loop thru color buttons) whereby only "1"
              button with class of selected would allow submission to cart
    
              *OR: 
    
    */
    //*****************************//
    //*****************************//

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
});

//******UTILS******//
//*****************//

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








