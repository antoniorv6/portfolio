console.log(firebase)

const db = firebase.firestore();
const publicationsList = document.getElementById("publications_container");

let publicationsRef;
let unsubscribe;
let modalContentElement;

modalContentElement = document.getElementById("modalContent")

publicationsRef = db.collection('publications');
unsubscribe = publicationsRef.orderBy('date', 'desc').onSnapshot(querySnapshot => {
const items = querySnapshot.docs.map(doc => {
    return `<div class="work__img" onclick="getPublication(\'${(doc.data().title)}\')">
                <h3 class="caption">${doc.data().title}</h3>
                <img src=${doc.data().imageURL} alt="">
            </div>`
})
console.log(items);
publicationsList.innerHTML = items.join('');
});


var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function getPublication(title)
{
    let unsubscribe_pub = publicationsRef.where('title', '==', title).onSnapshot(querySnapshot => {
        const docitems = querySnapshot.docs.map(doc => {
            let abstract = doc.data().abstract
            if (abstract == undefined)
            {
              abstract = "-"
            }
            return `<span class="close" onclick="closeModal()">&times;</span>
                    <h2>${doc.data().title}</h2>
                    <br>
                    <p><b>Authors</b>: ${doc.data().authors}</p>
                    <p><b>Published in</b>: ${doc.data().journal}</p>
                    <p><b>Publishing Date</b>: ${Date(doc.data().date)}</p>
                    <p><b>Abstract</b>: ${abstract}</p>
                    <br>
                    <a href="${doc.data().url}" class="button">Go to the full paper</a>
                    `
    })
    modalContentElement.innerHTML = docitems.join('');
    modal.style.display = "block";
  });
}

