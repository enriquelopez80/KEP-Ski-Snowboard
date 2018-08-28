const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {

    findItemById: (id, cb) => {
        db.Merch.findOne({
            where: {
                id: id
            }
        }).then(data => {
            cb(data)
        })
    },

    findOneByProdName: (productName, cb) => {
        db.Merch.findOne({
            where: {
                name: productName
            }
        }).then(data => {
            cb(data)
        })
    },

    findAllByProdName: (productName, cb) => {
        db.Merch.findAll({
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
                let searchResults = data;
                let productNamesArr = data.map(nonUniqueRows => {
                    return nonUniqueRows.name
                });
                let dataArr = [productNamesArr, searchResults]
                return dataArr
            }).then(dataArr => {
                let searchResults = dataArr[1];
                let unique = dataArr[0].filter((value, index, self) => {
                    return self.indexOf(value) === index;
                });
                let uniqueIndices = unique.map((value) => {
                    return dataArr[0].indexOf(value)
                })
                let dataArray = [uniqueIndices, searchResults];
                return dataArray
            }).then(dataArray => {
                let uniqueIndices = dataArray[0];
                let searchResults = dataArray[1];
                // USE UNIQUE-INDICES TO FETCH DISTINCT DATA (BY NAME) FROM ORIGINAL SEARCH RESULTS //
                return uniqueIndices.map((uniqueIndex) => {
                    return searchResults[uniqueIndex]
                })
            }).then(data => {
                cb(data)
            })
    },

    onlyUnique: (value, index, self) => {
        return self.indexOf(value) === index;
    }


}