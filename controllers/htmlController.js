let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
    
    app.get('/', (req, res) => {
        res.json({ 'Test': 'OK' });
    });
    
    app.get("/solar", (req, res) => {
        res.render("index.ejs");
    });
        
}
