 //1.获取类名的兼容函数用到getClass
 function getClass(classname,obj){

	  	var obj=obj||document;
	  	if(obj.getElementsByClassName){
	  		return obj.getElementsByClassName(classname);
	  	}else{
	  		var alls=obj.getElementsByTagName("*");
	  		var arr=[];
	  		for(var a=0;a<alls.length;a++){
	           if(getText(alls[a].className,classname)){
	               arr.push(alls[a]);
	           } 
	  		}
	     }
	    return arr;
	  } 

        function getTet(aa,classname){
	    	 var newarr=aa.split(" ");
	    	 for(var b=0;b<newarr.length;b++){
	    	 	if(newarr[b]==classname){
	               return true;
	    	 	}
	    	 }  
	    	 return false;
	    } 

//2.获取与设置对象的纯文本的兼容函数，用到getText函数
function getText(obj,val){
    if (val!=undefined) {//设置
        if (obj.textContent || obj.textContent=="") {//为真时，表示是W3C的浏览器
           
            obj.textContent=val;
            //return obj.textContent;
        } else{//表示IE
            obj.innerText=val;
            //return obj.innerText

        }
    } else{//获取
        if (obj.textContent) {//为真时，表示是W3C的浏览器
            return obj.textContent;
        } else{//表示IE
            return obj.innerText;
        }
    }
}

//3.获取对象外部样式的兼容函数用到 getStyle函数
function getStyle(obj,Attr){
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj,null)[Attr]
    } else{
        return obj.currentStyle[Attr]
    }
}


//4.将所有的函数分一块
	    function $(selector,father){
          var obj=father||document;
          if(typeof selector=="string"){//判断selector是否是string类型
          	var selector=selector.replace(/^\*|\s*$/g,"");//用来找出字符串前后的空格，通过空的字符串去代替它
              if(selector.charAt(0)=="."){//类名
                 return getClass(selector.slice(1),obj);
              }else if(selector.charAt(0)=="#"){//ID名
                 return obj.getElementById(selector.slice(1),obj);
              }else if(/^[a-z|1-10]{1,10}$/g.test(selector)){
              	 return obj.getElementsByTagName(selector);
              }
          }else if(typeof selector=="function")
            window.onload=function(){
            	selector();
            }
	    }

//5.获取对象的子节点
//a:只获取元素节点   b：获取元素+文本节点
function getChilds(father,type){
   var type=type||"a";//type没有赋值时，默认为"a"(第二个参数省略时，默认只获取元素节点)
   var childs=father.childNodes;//找到所有的儿子
   var newarr=[];//声明一个容器
   for(var i=0;i<childs.length;i++){
    if(type=="a"){
       if(childs[i].nodeType==1){
        newarr.push(childs[i]);
       }
    }else if(type=="b"){//获得元素+文本节点
       if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
            //节点类型为1或者（文本节点中的值不为空，并且）
            newarr.push(childs[i]);
       }
      
       }
      
     }
      return newarr;
   }
   
// 6.获取第一个子节点
 function getFirst(father){
    return getChilds(father)[0];
 }
//7.获取最后一个子节点
function getLast(father){
    return getChilds(father)[getChilds(father).length-1];
 }
//8.随机获取一个节点
 function getNum(father,num){//num指下标，从0开始
    return getChilds(father)[num];
 }
//9.获取下一个兄弟节点
function getDown(brother){ 
   var down=brother.nextSibling;
   while(down.nodeType==3||down.nodeType==8){
      down=down.nextSibling;
      if(down==null){
          return false;
      }
   }

  return down;   
}

//10.获取上一个兄弟节点
function getUp(up){
   var up=up.previousSibling;
   if(up==null){
  return false;
   }
   while(up.previousSibling==3||up.previousSibling==8){
      up=up.previousSibling;
      if(up==null){
         return false;
      }
   }
     return up;
}

//11.要插入到某个对象之后(只适用于div)
//newobj:要追加的对象
//obj:在哪个对象之前
// function insertAfter(newobj,obj){
//    var down=getDown(obj);
//    if(down){
//     insertBefore(newobj,obj);
//    }
// }
//对象共有的方法一般是加在原型上的。而原型只能给构造函数添加，
//所以共的方法是添加到对象的构造函数的原型上
//this:指的是最终调用这个方法的对象。而这个对象是通过构造函数new出来的对象。
Object.prototype.insertAfter=function(newobj,obj){
  var down=getDown(obj);//获取obj的下一个兄弟节点
  if(down){//如果这个兄弟节点存在
    this.insertBefore(newobj,obj);//就把newobj插入到这个兄弟节点的前面（也就是obj对象的后面）
  }else{//如果这个兄弟节点不存在，表示obj就是最后一个节点了
    this.appenChild(newobj);
  }
}

//12.同一事件添加多个处理程序的兼容函数
function addEvent(obj,event,fun){
  if(obj.addEventListener){
     return obj.addEventListener(event,fun,false);
  }else{
    return obj.attachEvent("on"+event,fun);
  }
}

//13.同一事件移除多个处理程序的兼容函数
function removeEvent(obj,event,fun){
  if(obj.removeEventListener){
     return obj.removeEventListener(event,fun,false);
  }else{
    return obj.detachEvent("on"+event,fun);
  }
}

//14.解决鼠标滚轮事件的兼容函数
//obj:要执行滚轮事件的对象
//upfn:往上滚动的处理程序
//downfn:往下滚动的处理程序
function mouseWheel(obj,upfun,downfun){
  //添加滚轮事件的兼容函数
   if(obj.attachEvent){
      obj.attachEvent("onmousewheel",scrollFn);
   }else if(obj.addEventListener){
      obj.addEventListener("onmousewheel",scrollFn,false);
      obj.addEventListener("DOMMouseScroll",scrollFn,false);
   }

  function scrollFn(e){
    var ev=e||window.event;
    if(ev.detail==-3||ev.wheelDelta==120){
      if(upfun){
        upfun.call(obj);
      }
    }else if(ev.detail==3||ev.wheelDelta==-120){
       if(downfun){
        downfun.call(obj);
       }
    }
    var ev=e||window.event;
    if(ev.preventDefault){
      ev.preventDefault();//阻止默认浏览器动作（W3C）
       }else{
        ev.returnValue=false;//IE中阻止函数器默认动作的方式
      }
  }
}


//15.hover鼠标的移入移除
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/

//16.
function getObj(){
   return obj=document.documentElement.scrollTop?document.documentElement:document.body;
}

/*17.获取具有定位属性的父元素 相对于body的left top值
   offset(obj).left 相对于body left
   offset(obj).top  相对于body  top*/
function offset(obj){
  var parent=obj.parentNode;
  var arr=[];
  var x=0;
  var y=0;
  while(parent.nodeName!=="BODY"){
    var pos=getStyle(parent,"position");//获取外部样式
    if(pos=="fixed"||pos=="absolute"||pos=="relativa"){
      arr.push(parent);
    }
    parent=parent.parentNode;
  }
  for(var i=0;i<arr.length;i++){
    var left=arr[i].offsetLeft;//offsetLeft指自身到有定位属性的父容器的距离
    var blw=parseInt(getStyle(arr[i],"borderLeftWidth"));//获取外部样式
    x+=left+blw;
    var top=arr[i].offsetTop;
    var btw=parseInt(getStyle(arr[i],"borderTopWidth"));
    y+=top+btw;
  }
  return {left:x,top:y};

}