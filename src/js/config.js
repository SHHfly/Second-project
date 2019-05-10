require.config({
    baseUrl : "/",
    paths : {
      "header" : "js/module/header",
      "footer" : "js/module/footer",
      "jquery":"libs/jquery/jquery-3.2.1.min",
      "template" : "libs/art-template/template-web",
      "url" : "js/module/url",
      "cookie":"libs/jquery-plugins/jquery.cookie",
      "zoom" : "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min"
    },
    shim:{
      "cookie":{
        deps:['jquery']
      },
      "zoom":{
        deps:['jquery']
      }
    }
  })