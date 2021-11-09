const products = [];
const path = require('path');
const fs = require('fs');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

module.exports = class Products {
    constructor(t) {
        this.title = t;
    }

    save() {
        fs.readFile(p, (err, fileContent) => {
            console.log("fileContent", fileContent);
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            // console.log("file content", products);

            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log("err", err);
            });
        })
    }

    static fetchAll(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return cb([]);
            }
            return cb(JSON.parse(fileContent));
        })
    }
}