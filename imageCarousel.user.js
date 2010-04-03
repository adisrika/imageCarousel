// ==UserScript== 
// @name			loadreq
// @namespace	adi.sriku366@gmail.com SriKanth
// @description	script that adds req js/css
// @include		http://images.search.yahoo.com/search/images/*
// @include     http://images.google.com/images/*
// ==/UserScript== 
function addJS(url)
{
	var script = document.createElement('script');
	script.setAttribute('type',    'text/javascript');
	script.setAttribute('charset', 'UTF-8');
	script.src = url;
	var body = document.getElementsByTagName('body')[0];
	if(body)
	{
		body.appendChild(script);
	}
}

function addCSS(url)
{
	var cssLink = document.createElement('link');
	cssLink.setAttribute('type','text/css');
	cssLink.setAttribute('rel','stylesheet');
	cssLink.href = url;
	var head = document.getElementsByTagName('head')[0];
	if(head)
	{
		head.appendChild(cssLink);
	}
	document.body.className += " yui-skin-sam"; 
}

function checkJS(){
	addJS('http://yui.yahooapis.com/2.8.0r4/build/yahoo-dom-event/yahoo-dom-event.js');
	addJS('http://yui.yahooapis.com/2.8.0r4/build/element/element-min.js');
	addJS('http://yui.yahooapis.com/2.8.0r4/build/carousel/carousel-min.js');
	var newscript = document.createElement('script');
	newscript.setAttribute('type',    'text/javascript');
	newscript.setAttribute('charset', 'UTF-8');
	newscript.innerHTML = 'var carousel = new YAHOO.widget.Carousel("parentContainerId",{numVisible: 3});carousel.render();';
	window.addEventListener(
		'load',
		function(){
			setTimeout(
				function(){
					document.body.appendChild(newscript);
				},
				10);
		},
		false
	);
}

function addImagestoCarousel()
{
	var images = document.images;
	var imagesLength = images.length;
	var maxwidth = 0;
	var maxheight = 0;
	
	//Calculating max height and width
	for(var i=0;i<imagesLength;i++)
	{
		if(images[i].width > maxwidth)
		{
			maxwidth = images[i].width;
		}
		
		if(images[i].height > maxheight)
		{
			maxheight = images[i].height;
		}
	}
	alert(maxheight + ' ' + maxwidth);
	var liHtml = '<ol height="' + maxheight + ';">';
	for(var i=0;i<imagesLength;i++)
	{
		var imgheight =  maxwidth * (images[i].height/images[i].width);
		liHtml += '<li><img alt="" src="'+ images[i].src + '" width="' + maxwidth + '" height="' + imgheight + '"></li>';
	}
	liHtml += '</ol>';
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'parentContainerId');
	newdiv.setAttribute('style','margin-left:auto;margin-right:auto;margin-bottom:20px;')
	newdiv.innerHTML = liHtml;
	document.body.appendChild(newdiv);
}

addImagestoCarousel();
addCSS('http://yui.yahooapis.com/2.8.0r4/build/carousel/assets/skins/sam/carousel.css');
checkJS();
