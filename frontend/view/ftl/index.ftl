<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.6 -->
    <link rel="stylesheet" href="${ctx}/view/assets/lib/AdminLTE/bootstrap/css/bootstrap.min.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <script src="${ctx}/view/assets/lib/minispa/miniSPA.js"></script>
    <script src="${ctx}/view/assets/lib/requirejs/require.js"></script>
    <![endif]-->
    <title>高并发秒杀</title>
    <style type="text/css">
        body {
            font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","WenQuanYi Micro Hei",sans-serif;
        }
    </style>
    <script src="${ctx}/view/assets/lib/jquery/dist/jquery.js"></script>   
	<script src="${ctx}/view/assets/lib/requirejs/require.js"></script>
 	 <script >
 	     var SPA = {};
         SPA.gotoView = function(viewName) {          //handle url change
			$.ajax({
			  type: "GET",
			  url: viewName,
			  cache: false,
			  success: function(html){
                  $("#viewcontainer").html(html); 
			  },
			  error:
			  function(event,request, settings){
				    alert("error:" + setings.url);
			  }
			});
         }
    </script>
</head>
<body>
   <a href="javascript:void(0);" onclick="SPA.gotoView('user')">替换页面</a>
	<div id='viewcontainer'> 
    	<router-view></router-view>
		<script src="${ctx}/view/assets/script/main.js"></script>
    </div>
</body>
</html>
