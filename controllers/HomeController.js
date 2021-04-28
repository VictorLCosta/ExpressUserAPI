class HomeController{

    async index(req, res){
        req.send('APP - EXPRESS');
    }
}

module.exports = new HomeController();