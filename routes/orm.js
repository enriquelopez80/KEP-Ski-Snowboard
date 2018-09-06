const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {

    findOneById: (id, cb) => {
        let responseObj = {};
        db.Merch.findOne({
            where: {
                id: id
            }
        }).then(data => {
            responseObj.merch = data;
            cb(responseObj)
        })
    },

    findAllByIdArray: (idArray, cb) => {
        let responseObj = {};
        db.Merch.findAll({
            where: {
                id: idArray
            }
        }).then(data => {
            responseObj.merch = data;
            cb(responseObj)
        })
    },

    findCartItems: (queryArray, cb) => {
        let dataArr = queryArray.map(function (item) {
            return db.Merch.findOne({
                where: {
                    [Op.and]: [{ name: item.name }, { color: item.color }, { size: item.size }]
                }
            })
        })
        Promise
            .all(dataArr).then(function () {
                cb(dataArr)
            })
    },

    findOneByProdName: (productName, cb) => {
        let responseObj = {};
        db.Merch.findOne({
            where: {
                name: productName
            }
        }).then(data => {
            responseObj.merch = data;
            cb(responseObj)
        })
    },

    findAllByProdName: (productName, cb) => {
        let responseObj = {};
        db.Merch.findAll({
            where: {
                name: productName
            }
        }).then(data => {
            responseObj.merch = data;
            cb(responseObj)
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
        let responseObj = {};
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
                responseObj.merch = data;
                cb(responseObj)
            })
    },

    findByDeptClassSubclass: (depName, className, subclass, cb) => {
        let responseObj = {};
        db.Merch.findAll({
            where: {
                department: depName,
                class: className,
                subclass: subclass
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
                responseObj.merch = data;
                cb(responseObj)
            })
    },

    onlyUnique: (value, index, self) => {
        return self.indexOf(value) === index;
    }

}
