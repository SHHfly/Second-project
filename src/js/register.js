require(["config"], () => {
    require(["url","header","footer","jquery"], (url) => {
        class Register{
            constructor(){
                this.nameInput = $("#exampleInputEmail1");
                this.pwdInput = $("#exampleInputPassword1");
                this.regBtn = $("#register");
                this.init();
                //console.log( this.nameInput);
            }
            init(){
                
                this.regBtn.on("click",()=>{
                    let username = this.nameInput.val(),
                        password = this.pwdInput.val();
                    $.ajax({
                        url:url.ajaxPhp + "register.php",
                        type : "post",
                        data :{username,password},
                        success : data => {
                                if(data.res_code ===1){
                                    alert(data.res_message + ",即将跳转到登录页面");
                                    location.href="login.html";

                                }
                                
                                
                        
                        },
                        dataType : 'json'
                    })
                    return false;
                })
                
            }
        }
        new Register();
    })
})