console.log(firebase)

const db = firebase.firestore();
const publicationsList = document.getElementById("publications_container");
const projectsList = document.getElementById("software_container")

let publicationsRef;
let projectsRef;
let unsubscribe;
let modalContentElement;

modalContentElement = document.getElementById("modalContent")

publicationsRef = db.collection('publications');
projectsRef = db.collection('projects');


unsubscribe = publicationsRef.orderBy('date', 'desc').onSnapshot(querySnapshot => {
const items = querySnapshot.docs.map(doc => {
    return `<div class="work__img" onclick="getPublication(\'${(doc.data().title)}\')">
                <h3 class="caption">${doc.data().title}</h3>
                <img src=${doc.data().imageURL} alt="">
            </div>`
})
publicationsList.innerHTML = items.join('');
});

unsubscribe_projects = projectsRef.orderBy('date', 'desc').onSnapshot(querySnapshot => {
const items = querySnapshot.docs.map(doc => {
    return `<div class="work__img" onclick="getProject(\'${(doc.data().title)}\')">
                <h3 class="caption">${doc.data().title}</h3>
                <img src=${doc.data().imageURL} alt="">
            </div>`
})
console.log(items);
projectsList.innerHTML = items.join('');
});


var modal = document.getElementById("myModal");

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

function getProject(title)
{
    let unsubscribe_pub = projectsRef.where('title', '==', title).onSnapshot(querySnapshot => {
        const docitems = querySnapshot.docs.map(doc => {
            let completeString = ` <span class="close" onclick="closeModal()">&times;</span>
                                   <h2>${doc.data().title}</h2>
                                   <br>
                                   <p><b>Developed with/for: </b>: ${doc.data().team}</p>
                                   <p><b>Publishing Date</b>: ${Date(doc.data().date)}</p>
                                   <p><b>Description</b>: ${doc.data().description}</p>
                                   <p><b>Contributions</b>: ${doc.data().contributions}</p>
                                   <br>
                                   <a href="${doc.data().codeURL}" class="button">Get the code <i class='bx bxl-github' ></i></a>`

            if(doc.data().videoURL != undefined)
            {
              completeString += `<p><b>Demo video</b>:<br> <iframe width="560" height="315" src="${doc.data().videoURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            }

            let toolsString = `<p><b>Used tools</b>: <ul>`;
            const technologies = doc.data().tools;
            technologies.forEach(element => {
              toolsString += `<li>${element}</li>`;
            });
            toolsString += '</ul>';

            return completeString + toolsString
    })
    modalContentElement.innerHTML = docitems.join('');
    modal.style.display = "block";
  });
}
