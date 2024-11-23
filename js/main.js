var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var bookmarkList = document.getElementById("bookmarkList");

var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

var URL_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
var ANIMATION_DELAY = 0.05;

function addBookmark() {
  if (!validateForm(siteNameInput, siteUrlInput)) {
    return;
  }

  var bookmark = {
    name: siteNameInput.value,
    url: formatUrl(siteUrlInput.value),
  };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
  clearForm(siteNameInput, siteUrlInput);
}

function validateForm(siteName, siteUrl) {
  var isValid = true;

  if (siteName.value.trim() === "") {
    siteName.classList.add("is-invalid");
    isValid = false;
  } else {
    siteName.classList.remove("is-invalid");
  }

  if (siteUrl.value.trim() === "" || !isValidUrl(siteUrl.value)) {
    siteUrl.classList.add("is-invalid");
    isValid = false;
  } else {
    siteUrl.classList.remove("is-invalid");
  }

  return isValid;
}

function isValidUrl(url) {
  return URL_PATTERN.test(url);
}

function formatUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

function displayBookmarks() {
  var content = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var bookmark = bookmarks[i];
    content += `
        <tr style="animation-delay: ${i * ANIMATION_DELAY}s">
            <td class="index-cell">#${i + 1}</td>
            <td>
                <i class="fas fa-bookmark me-2" style="color: var(--primary-color)"></i>
                ${bookmark.name}
            </td>
            <td class="text-center">
                <button class="visit-btn" onclick="visitSite('${
                  bookmark.url
                }')">
                    <i class="fas fa-external-link-alt me-2"></i>Visit
                </button>
            </td>
            <td class="text-center">
                <button class="delete-btn" onclick="deleteBookmark(${i})">
                    <i class="fas fa-trash-alt me-2"></i>Delete
                </button>
            </td>
        </tr>
    `;
  }
  bookmarkList.innerHTML = content;
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
}

function visitSite(url) {
  window.open(url, "_blank");
}

function clearForm(siteName, siteUrl) {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-invalid");
  siteUrl.classList.remove("is-invalid");
  siteName.focus();
}

siteNameInput.addEventListener("input", function () {
  this.classList.remove("is-invalid");
});

siteUrlInput.addEventListener("input", function () {
  this.classList.remove("is-invalid");
});

displayBookmarks();
