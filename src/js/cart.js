require(['config'],()=>{
    require(['template','header','jquery','footer'],(template,header)=>{
        class Cart{
            constructor(){
                this.container = $(".cart-list");
                this.render();
                this.checkChange();
                this.edit(); 
                this.allCheck(); 
                
            }
            render(){
                let data = localStorage.getItem('cart');
                if(data){
                    data = JSON.parse(data);
                    //console.log(data.length);
                    //console.log(data);
                    this.container.html(template("cart-item",{data}));
                    $('.checkboxBtn').each(function(){
                        let str = $(this).parents(".cart-item").attr('check-id');
                        if(str ==='false') str = false;
                        $(this).prop('checked',str);     
                    })
                }else{
                    this.container.html(`<p class="cart-item qiong">您还没有买东西</p>`);
                }
                header.calcCart();
                this.caclTotal();
                
            }
            checkChange(){
                let _this = this;
                this.container.on("change",".checkboxBtn",function(){
                    _this.caclTotal();
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    let id = $(this).parents('.cart-item').attr('data-id');
                    
                    let index = -1;
                    cart.some((shop,i)=>{
                        index = i ;
                        return shop.id == id;
                    });
                    //console.log(index);
                    cart[index].checked = !cart[index].checked;
                    localStorage.setItem('cart',JSON.stringify(cart));
                    
                })
            }
            caclTotal(){
                let allNum = 0;
                let allPrice = 0.00;
                let _this = this;
                this.count = 0;
                $(".cart-item").each(function(){
                    if($(this).find(".checkboxBtn").prop('checked')){
                        allPrice += ($(this).find(".xiaoji").html()-0);
                        allNum += ($(this).find(".number").val()-0);
                        _this.count++;
                        
                    }
                })
                $('#allNum').html(allNum);
                $('#allPrice').html((allPrice).toFixed(2));
                let cart = localStorage.getItem('cart');
                if(cart){
                    cart = JSON.parse(cart);
                    if(this.count == cart.length){
                        $('.allcheckBtn').prop('checked',true);
                    }else{
                        $('.allcheckBtn').prop('checked',false);
                    }
                }else{
                    $('.allcheckBtn').prop('checked',false);
                }
                
            }
            edit(){
                let _this = this;
                this.container.on("click",".Jia",function(){
                    let data = JSON.parse(localStorage.getItem('cart'));
                    let priceSpan = $(this).parents('.cart-item').find('.price');
                    let xiaojiSpan = $(this).parents('.cart-item').find('.xiaoji');
                    let num = $(this).prev().val();
                    num ++;
                    $(this).prev().val(num);
                    let id = $(this).parents('.cart-item').attr('data-id');
                    let index = -1;
                    data.some((shop,i)=>{
                        index = i ;
                        return shop.id == id;
                    })
                    data[index].num = num;
                    localStorage.setItem('cart',JSON.stringify(data));
                    //_this.render(JSON.stringify(data));
                    xiaojiSpan.html((priceSpan.html()*num).toFixed(2));
                    _this.caclTotal();
                })
                this.container.on("click",".Jan",function(){
                    let data = JSON.parse(localStorage.getItem('cart'));
                    let num = $(this).next().val();
                    let priceSpan = $(this).parents('.cart-item').find('.price');
                    let xiaojiSpan = $(this).parents('.cart-item').find('.xiaoji');
                    num --;
                    if(num===0) num = 1;
                    $(this).next().val(num);
                    let id = $(this).parents('.cart-item').attr('data-id');
                    let index = -1;
                    data.some((shop,i)=>{
                        index = i ;
                        return shop.id == id;
                    })
                    data[index].num = num;
                    localStorage.setItem('cart',JSON.stringify(data));
                    //_this.render(JSON.stringify(data));
                    xiaojiSpan.html((priceSpan.html()*num).toFixed(2));
                    _this.caclTotal();
                    
                })
                this.container.on("click",".delShop",function(){
                    
                    if(confirm('确定不买了吗？')){
                        let data = JSON.parse(localStorage.getItem('cart'));
                    
                        let id = $(this).parents('.cart-item').attr('data-id');
                        let index = -1;
                        data.some((shop,i)=>{
                            index = i ;
                            return shop.id == id;
                        })
                        data.splice(index,1);
                        localStorage.setItem('cart',JSON.stringify(data));
                        $(this).parents('.cart-item').remove();
                        _this.caclTotal();
                       // console.log(data);
                        //console.log(data.length);
                        if(data.length === 0){
                           // console.log('纱门窗及');
                            localStorage.clear();
                            _this.render();   
                        }
                    }   
                })
            }
            allCheck(){
                let _this = this;              
                $('.allcheckBtn').on('change',function(){
                    let allChecked = $('.allcheckBtn').prop('checked');
                    let checkedBtns = $('.checkboxBtn');
                    checkedBtns.each(function(){
                        $(this).prop('checked',allChecked);        
                    })
                    let cart = localStorage.getItem('cart');
                    if(cart){
                        cart = JSON.parse(cart);
                        cart.forEach(data=>{
                            data.checked = allChecked;
                        })
                    }
                    localStorage.setItem('cart',JSON.stringify(cart));
                    _this.caclTotal();
                })
            }
        }
        new Cart();
    })
})