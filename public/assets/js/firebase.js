console.log(firebase)

const db = firebase.firestore();
const publicationsList = document.getElementById("publications_container");

let publicationsRef;
let unsubscribe;
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


function getPublication(title)
{
    console.log("ug")
    let unsubscribe_pub = publicationsRef.where('title', '==', title).onSnapshot(querySnapshot => {
        const items = querySnapshot.docs.map(doc => {
            console.log(doc.data())
    })})
}

