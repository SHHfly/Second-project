

define(["jquery","cookie"],()=>{
    class Header{
        constructor(){
            this.container = $("header");
            this.init().then(()=>{
                this.search();
                this.isLogin();
                this.calcCart();
            });
            //this.searchInput = $(".searchInput");
        }
        init(){
            //console.log(this.container);
            //this.container.load("/html/module/header.html");
           // console.log(this.searchInput);
           return new Promise(resolve =>{
                this.container.load("/html/module/header.html",()=>{
                    resolve();
                });
           })
        }
        search(){
            let searchInput = $(".searchInput");
            searchInput.on("keyup",function(){
                let value = $(this).val();
                //console.log(value);
                $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+value, data=>{
                    console.log(data.s);
                })
            })
        }
        isLogin(){
            this.login = $("#loginbox");
            this.unlogin = $("#unloginbox");
            this.showname = $("#showname");
            this.loginout = $("#loginout");
            let username = $.cookie('username');
            if(username){
                this.login.show();
                this.unlogin.hide();
                this.showname.html(username);
            }
            this.loginout.on('click',()=>{
                if(confirm("确定要退出吗")){
                    $.removeCookie("username",{path:'/'});
                    this.login.hide();
                    this.unlogin.show();
                }
                
            })
        }
        calcCart(){
            
            let cart = localStorage.getItem('cart');
            let num = 0;
            if(cart){
                cart = JSON.parse(cart);
                num = cart.reduce((n,shop)=>{
                    return n + shop.num; 
                },0);
            }
            $('#calcCart').html(num);
            
        }
    }
    return new Header();
})