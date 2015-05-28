(function() {

	var searchBtn = document.getElementById("seBtn"),
		container = document.getElementById("gridContainer"),
		back = document.getElementById("gView");
	searchBtn.addEventListener('click',loadData,true);
	function loadData(){
		var inputText = document.getElementById("searchText").value;
		while(container.firstChild) {
			container.removeChild(container.firstChild);
		}
		console.log(encodeURI(inputText));
		var xhr = new XMLHttpRequest();
		xhr.open("GET","https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c0874bd4d45529e98f8bc7814bcae573&text="+encodeURI(inputText)+"&extras=url_s%2Curl_o&format=json&nojsoncallback=1",true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				alert("loaded");
				loadImages(xhr.responseText);
			}
		}
		xhr.send(null);
	};

	function loadImages(dataString) {
		var dataObj = JSON.parse(dataString);
		console.log(dataObj);
		var photos = dataObj.photos.photo;
		for(id in photos) {
			var item = createGridItem(id, photos[id].url_s);
			
			item.addEventListener('click',function() {
				var url = "url("+photos[parseInt(this.id)].url_o+")",
					popUp = document.createElement("div"),
					overLay = document.createElement("div");

					overLay.className = "black-overlay";
					popUp.className = "full-image-view";
					
					popUp.style.backgroundImage = url;
					
					overLay.style.display = "block";
					popUp.style.display = "block";

					popUp.style.backgroundRepeat = "no-repeat";

					back.appendChild(overLay);
					overLay.appendChild(popUp);
					
					console.log("hello");
					
					overLay.addEventListener('click',closeImage,false);
					popUp.addEventListener('click',closeImage,false);

			},
			false);

			container.appendChild(item);
			console.log(item.id);
		}
	};

	function createGridItem(index,url) {
		var gridItem = document.createElement("div");
		gridItem.id = index;
		gridItem.className="col-md-3 grid-item";
		gridItem.style.backgroundImage = "url("+url+")";

		return gridItem;
	};

	function closeImage() {
		this.style.display = "none";
		this.parentNode.removeChild(this);
	}

}());