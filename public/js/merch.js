$(document).ready(function () {

    const buildModalObj = (data) => {
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

    const createButtonsHTML = (set, buttonType) => {
        let buttons = "";
        for (let item of set) {
            if (buttonType === "color") {
                buttons += `<button class="uk-button uk-button-${buttonType} uk-button-default uk-button-small">${item}</button>`
            } else if (buttonType === "size") {
                buttons += `<button class="uk-button uk-button-${buttonType} uk-button-default uk-button-small">${item}</button>`
            }
        }
        return buttons;
    }

    const renderModal = (data) => {
        $(".uk-modal-title").text(data.name);
        $(".uk-modal-img").attr("src", `${data.imgSrc}`);
        $(".uk-modal-price").text(`$${data.itemPrice}`);
        $(".colors-available").html(createButtonsHTML(data.color, "color"))
        $(".sizes-available").html(createButtonsHTML(data.size, "size"))
    }

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    //MERCH ON-CLICK LISTENER://
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

    //TOGGLE SELECTED SIZE:
    $(document).on("click", ".uk-button-color", function () {
        let $color = $(this).html();
        $(".uk-button-color").attr("data-class", "unselected");
        $(this).attr("data-class", "selected-color");
        console.log($color);
        return
    })

    //TOGGLE SELECTED COLOR:
    $(document).on("click", ".uk-button-size", function () {
        let $size = $(this).html();
        $(".uk-button-size").attr("data-class", "unselected");
        $(this).attr("data-class", "selected-size");
        console.log($size);
        return
    })

});



