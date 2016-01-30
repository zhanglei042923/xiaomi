window.onload=function(){
/*111111111111111111*/
		var banner=$(".banner")[0];
		var img=$("img",banner);
		var yuandian=$(".yuandian")[0];
		var yuandian1=$(".yuandian1")[0];
		var yuanli=$("li",yuandian);
		var leftbtn=$(".leftbtn")[0];
		var rightbtn=$(".rightbtn")[0];
		for(var i=0;i<yuanli.length;i++){
			yuanli[i].index=i;
			yuanli[i].onclick=function(){
				for(var j=0;j<img.length;j++){
					yuanli[j].className="";
					img[j].style.zIndex=3;
				}
				yuanli[this.index].className="yuandian1";
				img[this.index].style.zIndex=4;
			}
		}
		var t=setInterval(move,2000)
		var num=0;
		function move(){
			num++;
			if(num==5){
				num=0;
			}
			for(var i=0;i<img.length;i++){
				img[i].style.zIndex=3;
				yuanli[i].className="";
			}
			img[num].style.zIndex=4;
			yuanli[num].className="yuandian1";
			
		}

		function rightMove(){
			num--;
			if(num<0){
				num=4;
			}
			for(var i=0;i<img.length;i++){
				img[i].style.zIndex=3;
				yuanli[i].className="";
			}
			img[num].style.zIndex=4;
			yuanli[num].className="yuandian1";
		}
		leftbtn.onmouseover=rightbtn.onmouseover=function(){
			clearInterval(t);
		}
		banner.onmouseover=function(){
			clearInterval(t);
		}
		banner.onmouseout=function(){
			t=setInterval(move,2000);
		}
		leftbtn.onmouseout=rightbtn.onmouseout=function(){
			t=setInterval(move,2000);
		}
		leftbtn.onclick=function(){
			rightMove();
		}
		rightbtn.onclick=function(){
			move();
		}

/*左右按钮*******************************************/
	function affa(num){
		var affa=$(".affa")[num];
		var left=$(".ee-left")[num];
		var right=$(".ee-right")[num];
		right.onclick=function(){
			animate(affa,{left:"-1224"},600,Tween.Linear);
		}
		left.onclick=function(){
			animate(affa,{left:"0"},600,Tween.Linear);
		}	
	}
	affa(0);
	affa(1);

/*选项卡*******************************************/
	function xuanX(num){
		var ajj=$(".ajj")[num];
		var right=$(".jj-right",ajj);
		var iiul=$(".iiul")[num];
		var li=$("li",iiul);
		for(var i=0;i<li.length;i++){
			li[i].index=i;
			li[i].onmouseover=function(){
				for(var j=0;j<right.length;j++){
					right[j].style.zIndex=2;
					li[j].className="";
				}
				right[this.index].style.zIndex=3;
				li[this.index].className="oneright";
			}

		}	
	}
	xuanX(0);
	xuanX(1);
	xuanX(2);
/*左导航下拉******************************************/
	function zuoX(){
		var left=$(".cc-left-li");
		var zc=$(".zc");
		for(var i=0;i<left.length;i++){
			left[i].index=i;
			left[i].onmouseover=function(){
				for(var j=0;j<zc.length;j++){
					zc[j].style.display="none";
					zc[j].style.zIndex=8;
				}
				zc[this.index].style.display="block";
				zc[this.index].style.display=23;
			}
			left[i].onmouseout=function(){
				for(var j=0;j<zc.length;j++){
					zc[j].style.display="none";
				}
			}
			
		}
	}
	zuoX();
/*底部图片轮播*******************************************************/
	// function bottoms(num){
	// 	var bottom=$(".h2-bottom")[num];
	// 	var bottomli=$(".h2-bottom1a",bottom);
	// 	var yuan=$(".tt-yuandian")[num];
	// 	var yuan1=$("li",yuan);
	// 	var hott=$('.hott');
	// 	var rightbtn1=$(".rightbtn1")[0];
	// 	var leftbtn=$(".leftbtn")[0];
	// 	var now=0;
	// 	for(var i=0;i<yuan1.length;i++){
	// 		yuan1[i].index=i;
	// 		yuan1[i].onclick=function(){
	// 			if(now>this.index){
	// 				bottomli[this.index].style.left=-294+"px";
	// 				animate(bottomli[now],{left:"294"},500,Tween.Linear);
	// 				yuan1[now].className="";

	// 			}
	// 			if(now<this.index){
	// 				bottomli[this.index].style.left=294+"px";
	// 				animate(bottomli[now],{left:"-294"},500,Tween.Linear);
	// 				yuan1[now].className="";

	// 			}
	// 				animate(bottomli[this.index],{left:"0"},500,Tween.Linear);
	// 				yuan1[now].className="hott";
	// 				now=this.index;
	// 		}
	// 	}

	// 	function moveLeft(){
	// 		leftbtn.onclick=function(){
	// 			for(var i=0;i<bottomli.length;i++){
					
	// 			}
	// 		}
	// 	}
	// }
	// bottoms(0);
	// bottoms(1);
	// bottoms(2);
	// bottoms(3);
	function bottoms(num){
	var leftbtn=$('.leftbtn1')[num];
	var rightbtn=$('.rightbtn1')[num];
	var bottom1=$('.h2-bottom1')[num];
	var ul=$('.tt-yuandian')[num];
	var hbottom=$('.h2-bottom')[num];
	var li=$('li',ul);
	hbottom.onmouseover=function(){
		leftbtn.style.opacity=0.7;
		rightbtn.style.opacity=0.7;
	}
	hbottom.onmouseout=function(){
		leftbtn.style.opacity=0;
		rightbtn.style.opacity=0;
	};
	var num=0;
	for(var i=0;i<li.length;i++){
		li[i].index=i;
		li[i].onclick=function(){
			for(var j=0;j<li.length;j++){
				li[j].className="";
			}
			animate(bottom1,{marginLeft:-296*this.index},300,Tween.Linear);
			li[this.index].className="hott";
		}
	}
	function left(){
		if(num==3){
			num=3;
			return;
		}
		num++;
		for(var i=0;i<li.length;i++){
			li[i].className="";
		}
		animate(bottom1,{marginLeft:-294*num},300,Tween.Linear)
		li[num].className="hott";
	}
	function right(){
		if(num==0){
			num=0;
			return;
		}
		num--;
		for(var i=0;i<li.length;i++){
			li[i].className="";
		}
		animate(bottom1,{marginLeft:-294*num},300,Tween.Linear)
		li[num].className="hott";
	}
	leftbtn.onclick=function(){
		left();
	}
	rightbtn.onclick=function(){
		right();
	}
}
	bottoms(0);
	bottoms(1);
	bottoms(2);
	bottoms(3);
/*li里显示评论*/
	// var ajjs=$(".ajj")[0];
	// var jjright1=$(".jj-right")[0];
	var jjright=$(".jjright");
	var xianshi=$(".xianshi");
	for(var i=0;i<jjright.length;i++){
		jjright[i].index=i;
		hover(jjright[i],function(){
			animate(xianshi[this.index],{height:59},400,Tween.Linear);
		},function(){
			animate(xianshi[this.index],{height:0},400,Tween.Linear);
		})
	}

/**上面下拉**************************/
	function xiaLa(){
		var yiji=$(".span-logo");
		var erji=$(".erji");
		for(var i=0;i<yiji.length;i++){
			yiji[i].index=i;
			hover(yiji[i],function(){
				erji[this.index].style.display="block";
			},function(){
				erji[this.index].style.display="none";
			})
			
		}
	}
	xiaLa();
	
}