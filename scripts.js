function openIframePopup(url) {

    //create local storage info

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '80vw'; // Example width
    iframe.style.height = '80vh'; // Example height
    iframe.style.border = 'none';

    // Get the content div and append the iframe
    const popupContent = document.getElementById('popupContent');
    popupContent.insertBefore(iframe, popupContent.lastChild); // Insert After the close button

    // Display the popup container
    document.getElementById('popupContainer').style.display = 'block';
}

function closePopup() {
    const popupContainer = document.getElementById('popupContainer');
    const popupContent = document.getElementById('popupContent');
    const iframe = popupContent.querySelector('iframe');

    if (iframe) {
        popupContent.removeChild(iframe); // Remove the iframe when closing
    }
    popupContainer.style.display = 'none';
}