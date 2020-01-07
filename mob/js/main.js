customElements.define('add-page', class extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
<ion-header>
  <ion-toolbar>
    <ion-title>Add an item</ion-title>
    <ion-buttons slot="primary">
      <ion-button onClick="dismissModal()">
        <ion-icon slot="icon-only" name="close"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
	<ion-item>
		<ion-label position="floating">Name</ion-label>
		<ion-input required id="name"></ion-input>
    </ion-item>
    <ion-item>
		<ion-label position="floating">Link</ion-label>
		<ion-input required id="link"></ion-input>
	</ion-item>
	<div class="ion-padding"><ion-button type="submit" expand="block" onclick="addItem(dqs('#name').value, dqs('#link').value)">Add</ion-button></div>
</ion-content>`;
	}
});

function dqs(selector) {
	return document.querySelector(selector)
}

function link(url) {
	window.location.href = url;
}

function presentAddModal() {
	// create the modal with the `modal-page` component
	const modalElement = document.createElement('ion-modal');
	modalElement.component = 'add-page';

	// present the modal
	document.body.appendChild(modalElement);
	return modalElement.present();
}

function dismissModal() {
	document.querySelector("ion-modal").dismiss()
}

function addItem(name, li) {
	var cont = document.createElement("ion-item");
	cont.setAttribute("button", "true")
	cont.onclick = () => {
		link(li)
	}
	var text = document.createElement("p");
	text.innerHTML = name;
	cont.appendChild(text);
	document.querySelector("ion-list").appendChild(cont);
	dismissModal()
}

async function showUpdateToast() {
	var toast = document.createElement('ion-toast');
	toast.message = 'New Update available!';
	toast.position = 'bottom';
	toast.buttons = [{
		text: 'Update',
		handler: () => {
			newWorker.postMessage({ action: 'skipWaiting' });
		}
	}
	];

	document.body.appendChild(toast);
	return toast.present();
}