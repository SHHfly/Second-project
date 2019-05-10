define(["jquery"],()=>{
    class Footer{
        constructor(){
            this.container = $("footer");
            this.init();
        }
        init(){
            //console.log(this.container);
            this.container.load("/html/module/footer.html");
        }
    }
    new Footer();
})