var popup = (function(id) {

    var mask = document.getElementById('mask');
    var popup = {};

    return function(id){
    	if(!id){
    		mask.style.display = "none";
    		for(var i in popup){
    			document.getElementById(i).style.display = "none";
    		}
    	}else{
    		popup[id] = !popup[id];

    		mask.style.display = "block";
    		document.getElementById(id).style.display = "block";
    	}
    }
})()

window.addEventListener('load',function(){
    document.getElementById('mask').addEventListener('click',function(){popup()});

    //生成底部的链接
    var href = window.location.href;
    var resumeUrl = document.createElement('a');
    resumeUrl.appendChild(document.createTextNode("感谢您花费宝贵的时间查看我的简历，希望在将来能有幸与您一起共事！"));
    resumeUrl.setAttribute("href",href);
    document.getElementById('resume-url').appendChild(resumeUrl);
})
