!function(e){function t(t){for(var a,i,o=t[0],l=t[1],c=t[2],u=0,h=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&h.push(n[i][0]),n[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(d&&d(t);h.length;)h.shift()();return r.push.apply(r,c||[]),s()}function s(){for(var e,t=0;t<r.length;t++){for(var s=r[t],a=!0,o=1;o<s.length;o++){var l=s[o];0!==n[l]&&(a=!1)}a&&(r.splice(t--,1),e=i(i.s=s[0]))}return e}var a={},n={0:0},r=[];function i(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=a,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(s,a,function(t){return e[t]}.bind(null,a));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/wp-content/themes/fictional-university-theme/bundled-assets/";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var d=l;r.push([30,1]),s()}({11:function(e,t,s){},30:function(e,t,s){"use strict";s.r(t);s(11);var a=class{constructor(){this.menu=document.querySelector(".site-header__menu"),this.openButton=document.querySelector(".site-header__menu-trigger"),this.events()}events(){this.openButton.addEventListener("click",()=>this.openMenu())}openMenu(){this.openButton.classList.toggle("fa-bars"),this.openButton.classList.toggle("fa-window-close"),this.menu.classList.toggle("site-header__menu--active")}},n=s(9);var r=class{constructor(){if(document.querySelector(".hero-slider")){const e=document.querySelectorAll(".hero-slider__slide").length;let t="";for(let s=0;s<e;s++)t+=`<button class="slider__bullet glide__bullet" data-glide-dir="=${s}"></button>`;document.querySelector(".glide__bullets").insertAdjacentHTML("beforeend",t),new n.a(".hero-slider",{type:"carousel",perView:1,autoplay:3e3}).mount()}}};var i=class{constructor(){document.querySelectorAll(".acf-map").forEach(e=>{this.new_map(e)})}new_map(e){var t=e.querySelectorAll(".marker"),s={zoom:16,center:new google.maps.LatLng(0,0),mapTypeId:google.maps.MapTypeId.ROADMAP},a=new google.maps.Map(e,s);a.markers=[];var n=this;t.forEach((function(e){n.add_marker(e,a)})),this.center_map(a)}add_marker(e,t){var s=new google.maps.LatLng(e.getAttribute("data-lat"),e.getAttribute("data-lng")),a=new google.maps.Marker({position:s,map:t});if(t.markers.push(a),e.innerHTML){var n=new google.maps.InfoWindow({content:e.innerHTML});google.maps.event.addListener(a,"click",(function(){n.open(t,a)}))}}center_map(e){var t=new google.maps.LatLngBounds;e.markers.forEach((function(e){var s=new google.maps.LatLng(e.position.lat(),e.position.lng());t.extend(s)})),1==e.markers.length?(e.setCenter(t.getCenter()),e.setZoom(16)):e.fitBounds(t)}},o=s(10),l=s.n(o);var c=class{constructor(){this.addSearchHTML(),this.resultsDiv=document.querySelector("#search-overlay__results"),this.openButton=document.querySelectorAll(".js-search-trigger"),this.closeButton=document.querySelector(".search-overlay__close"),this.searchOverlay=document.querySelector(".search-overlay"),this.searchField=document.querySelector("#search-term"),this.isOverlayOpen=!1,this.isSpinnerVisible=!1,this.previousValue,this.typingTimer,this.events()}events(){this.openButton.forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),this.openOverlay()})}),this.closeButton.addEventListener("click",()=>this.closeOverlay()),document.addEventListener("keydown",e=>this.keyPressDispatcher(e)),this.searchField.addEventListener("keyup",()=>this.typingLogic())}typingLogic(){this.searchField.value!=this.previousValue&&(clearTimeout(this.typingTimer),this.searchField.value?(this.isSpinnerVisible||(this.resultsDiv.innerHTML='<div class="spinner-loader"></div>',this.isSpinnerVisible=!0),this.typingTimer=setTimeout(this.getResults.bind(this),750)):(this.resultsDiv.innerHTML="",this.isSpinnerVisible=!1)),this.previousValue=this.searchField.value}async getResults(){try{const e=(await l.a.get(universityData.root_url+"/wp-json/university/v1/search?term="+this.searchField.value)).data;this.resultsDiv.innerHTML=`\n        <div class="row">\n          <div class="one-third">\n            <h2 class="search-overlay__section-title">General Information</h2>\n            ${e.generalInfo.length?'<ul class="link-list min-list">':"<p>No general information matches that search.</p>"}\n              ${e.generalInfo.map(e=>`<li><a href="${e.permalink}">${e.title}</a> ${"post"==e.postType?"by "+e.authorName:""}</li>`).join("")}\n            ${e.generalInfo.length?"</ul>":""}\n          </div>\n          <div class="one-third">\n            <h2 class="search-overlay__section-title">Programs</h2>\n            ${e.programs.length?'<ul class="link-list min-list">':`<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}\n              ${e.programs.map(e=>`<li><a href="${e.permalink}">${e.title}</a></li>`).join("")}\n            ${e.programs.length?"</ul>":""}\n\n            <h2 class="search-overlay__section-title">Professors</h2>\n            ${e.professors.length?'<ul class="professor-cards">':"<p>No professors match that search.</p>"}\n              ${e.professors.map(e=>`\n                <li class="professor-card__list-item">\n                  <a class="professor-card" href="${e.permalink}">\n                    <img class="professor-card__image" src="${e.image}">\n                    <span class="professor-card__name">${e.title}</span>\n                  </a>\n                </li>\n              `).join("")}\n            ${e.professors.length?"</ul>":""}\n\n          </div>\n          <div class="one-third">\n            <h2 class="search-overlay__section-title">Campuses</h2>\n            ${e.campuses.length?'<ul class="link-list min-list">':`<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}\n              ${e.campuses.map(e=>`<li><a href="${e.permalink}">${e.title}</a></li>`).join("")}\n            ${e.campuses.length?"</ul>":""}\n\n            <h2 class="search-overlay__section-title">Events</h2>\n            ${e.events.length?"":`<p>No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`}\n              ${e.events.map(e=>`\n                <div class="event-summary">\n                  <a class="event-summary__date t-center" href="${e.permalink}">\n                    <span class="event-summary__month">${e.month}</span>\n                    <span class="event-summary__day">${e.day}</span>  \n                  </a>\n                  <div class="event-summary__content">\n                    <h5 class="event-summary__title headline headline--tiny"><a href="${e.permalink}">${e.title}</a></h5>\n                    <p>${e.description} <a href="${e.permalink}" class="nu gray">Learn more</a></p>\n                  </div>\n                </div>\n              `).join("")}\n\n          </div>\n        </div>\n      `,this.isSpinnerVisible=!1}catch(e){console.log(e)}}keyPressDispatcher(e){83!=e.keyCode||this.isOverlayOpen||"INPUT"==document.activeElement.tagName||"TEXTAREA"==document.activeElement.tagName||this.openOverlay(),27==e.keyCode&&this.isOverlayOpen&&this.closeOverlay()}openOverlay(){return this.searchOverlay.classList.add("search-overlay--active"),document.body.classList.add("body-no-scroll"),this.searchField.value="",setTimeout(()=>this.searchField.focus(),301),console.log("our open method just ran!"),this.isOverlayOpen=!0,!1}closeOverlay(){this.searchOverlay.classList.remove("search-overlay--active"),document.body.classList.remove("body-no-scroll"),console.log("our close method just ran!"),this.isOverlayOpen=!1}addSearchHTML(){document.body.insertAdjacentHTML("beforeend",'\n      <div class="search-overlay">\n        <div class="search-overlay__top">\n          <div class="container">\n            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>\n            <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">\n            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>\n          </div>\n        </div>\n        \n        <div class="container">\n          <div id="search-overlay__results"></div>\n        </div>\n\n      </div>\n    ')}};var d=class{constructor(){document.querySelector("#my-notes")&&(l.a.defaults.headers.common["X-WP-Nonce"]=universityData.nonce,this.myNotes=document.querySelector("#my-notes"),this.events())}events(){this.myNotes.addEventListener("click",e=>this.clickHandler(e)),document.querySelector(".submit-note").addEventListener("click",()=>this.createNote())}clickHandler(e){(e.target.classList.contains("delete-note")||e.target.classList.contains("fa-trash-o"))&&this.deleteNote(e),(e.target.classList.contains("edit-note")||e.target.classList.contains("fa-pencil")||e.target.classList.contains("fa-times"))&&this.editNote(e),(e.target.classList.contains("update-note")||e.target.classList.contains("fa-arrow-right"))&&this.updateNote(e)}findNearestParentLi(e){let t=e;for(;"LI"!=t.tagName;)t=t.parentElement;return t}editNote(e){const t=this.findNearestParentLi(e.target);"editable"==t.getAttribute("data-state")?this.makeNoteReadOnly(t):this.makeNoteEditable(t)}makeNoteEditable(e){e.querySelector(".edit-note").innerHTML='<i class="fa fa-times" aria-hidden="true"></i> Cancel',e.querySelector(".note-title-field").removeAttribute("readonly"),e.querySelector(".note-body-field").removeAttribute("readonly"),e.querySelector(".note-title-field").classList.add("note-active-field"),e.querySelector(".note-body-field").classList.add("note-active-field"),e.querySelector(".update-note").classList.add("update-note--visible"),e.setAttribute("data-state","editable")}makeNoteReadOnly(e){e.querySelector(".edit-note").innerHTML='<i class="fa fa-pencil" aria-hidden="true"></i> Edit',e.querySelector(".note-title-field").setAttribute("readonly","true"),e.querySelector(".note-body-field").setAttribute("readonly","true"),e.querySelector(".note-title-field").classList.remove("note-active-field"),e.querySelector(".note-body-field").classList.remove("note-active-field"),e.querySelector(".update-note").classList.remove("update-note--visible"),e.setAttribute("data-state","cancel")}async deleteNote(e){const t=this.findNearestParentLi(e.target);try{const e=await l.a.delete(universityData.root_url+"/wp-json/wp/v2/note/"+t.getAttribute("data-id"));t.style.height=t.offsetHeight+"px",setTimeout((function(){t.classList.add("fade-out")}),20),setTimeout((function(){t.remove()}),401),e.data.userNoteCount<5&&document.querySelector(".note-limit-message").classList.remove("active")}catch(e){console.log("Sorry")}}async updateNote(e){const t=this.findNearestParentLi(e.target);var s={title:t.querySelector(".note-title-field").value,content:t.querySelector(".note-body-field").value};try{await l.a.post(universityData.root_url+"/wp-json/wp/v2/note/"+t.getAttribute("data-id"),s);this.makeNoteReadOnly(t)}catch(e){console.log("Sorry")}}async createNote(){var e={title:document.querySelector(".new-note-title").value,content:document.querySelector(".new-note-body").value,status:"publish"};try{const t=await l.a.post(universityData.root_url+"/wp-json/wp/v2/note/",e);if("You have reached your note limit."!=t.data){let e;document.querySelector(".new-note-title").value="",document.querySelector(".new-note-body").value="",document.querySelector("#my-notes").insertAdjacentHTML("afterbegin",` <li data-id="${t.data.id}" class="fade-in-calc">\n            <input readonly class="note-title-field" value="${t.data.title.raw}">\n            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>\n            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>\n            <textarea readonly class="note-body-field">${t.data.content.raw}</textarea>\n            <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>\n          </li>`);let s=document.querySelector("#my-notes li");setTimeout((function(){e=s.offsetHeight+"px",s.style.height="0px"}),30),setTimeout((function(){s.classList.remove("fade-in-calc"),s.style.height=e}),50),setTimeout((function(){s.style.removeProperty("height")}),450)}else document.querySelector(".note-limit-message").classList.add("active")}catch(e){console.error(e)}}};new a,new r,new i,new c,new d}});