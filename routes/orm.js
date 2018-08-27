const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {

    findByProdName: (productName, cb) => {
        db.Merch.findOne({
            where: {
                name: productName
            }
        }).then(data => {
            cb(data)
        })
    },

    homePageData: (id1, id2, cb) => {
        let responseObj = {}
        let mens = db.Merch.findOne({
            where: {
                id: id1,
            }
        })
        let womens = db.Merch.findOne({
            where: {
                id: id2,
            }
        })
        Promise
            .all([mens, womens])
            .then(data => {
                responseObj.mens = data[0];
                responseObj.womens = data[1];
                cb(responseObj)
            })
            .catch(err => {
                console.log(err);
            });
    },

    findByDeptAndClass: (depName, className, cb) => {
        db.Merch.findAll({
            where: {
                department: depName,
                class: className,
            },
        })
            .then(data => {
                let productNamesArr = data.map(nonUniqueRows => {
                    return nonUniqueRows.name
                })
                //CONVERT FIND-ALL RESULTS TO TO JS 'SET' OF UNIQUE NAMES:
                let uniqueProductNamesSet = new Set(productNamesArr);
                console.log("**********************************************************");
                console.log(uniqueProductNamesSet);
                console.log("**********************************************************");
                let setLength = uniqueProductNamesSet.size;

                let uniqueProductsArr = []
                //QUERY DATABASE FOR UNIQUE ITEM INFORMATION AND PUSH TO 'uniqueProductsArr' BEFORE SENDING BACK:
                for (name of uniqueProductNamesSet) {
                    db.Merch.findOne({
                        where: {
                            name: name
                        }
                    }).then(data => {
                        console.log(JSON.stringify(data, undefined, 2))
                        uniqueProductsArr.push(data)
                    })
                }
                return uniqueProductsArr
            }).then(uniqueProductsArr => {
                cb(uniqueProductsArr)
            })
    }

}