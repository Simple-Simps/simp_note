


//function to add a note with fetch
async function addANote(noteTitle, noteBody) {
  const data = { title: noteTitle, note: noteBody }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch('/newNote', options)
  const json = await response.json()
  console.log(json)
}

//function to get all of the notes with fetch
async function getAllNotes() {
  const response = await fetch('/allNotes')
  const json = await response.json()
  console.log(json)
  return await json
}

//function to get one note using a query string
async function getOneNote(noteTitle) {
  const response = await fetch(`/oneNote/?note=${noteTitle}`)
  const json = await response.json()
  console.log(json)
  return await json
}


// example function for creating a p tag to display a note
async function createPTag(noteTitle) {
  const noteDiv = document.querySelector('#printList')
  const note = await getOneNote(noteTitle)
  if (note[0].note != undefined) {
    const newNote = `<ul id="myList"><li>${note[0].note}</li></ul>` 
    noteDiv.innerHTML = newNote

  } else {
    const newNote = `<p>[This note contains no body]</p>`
    noteDiv.innerHTML = newNote
  }
}
function dlt(){
  const  list = document.getElementById("#myList");
  list.removeChild(list.childNodes[0]);
}

async function createList(noteTitle) {
  const noteDiv = document.querySelector('#noteList')
  noteDiv.innerHTML += '<li class="'+noteTitle+'\" onclick="createPTag(\''+noteTitle+'\'); hideNote()">'+noteTitle+'</li>'
}

function hideNote() {
  var x = document.querySelector("#printList")
  if(x.style.display === "flex"){
    x.style.display = "none"
  } else {
    x.style.display = "flex"
  }
}

// toggle theme mode
const toggleTheme = document.getElementById("themeBtn")

function darkMode() {
    const themeBtn = document.getElementById("themeBtn")
    // themeBtn.innerHTML = "Light Mode"
    themeBtn.style.backgroundColor = "whitesmoke"
    //themeBtn.style.color = 'black'

    navigation = document.getElementById("navigation")
    navigation.style.backgroundColor = "#222226"
    navigation.style.color = "white"

    main = document.getElementById("main")
    main.style.backgroundColor = "#333337"
    main.style.color = 'white'
}


function lightMode() {
    const themeBtn = document.getElementById("themeBtn2")
    // themeBtn.innerHTML = "Dark Mode"
    //themeBtn.style.backgroundColor = "#7F8486"

    navigation = document.getElementById("navigation")
    navigation.style.backgroundColor = "#B0B5B5"
    navigation.style.color = "black"

    main = document.getElementById("main")
    main.style.backgroundColor = "whitesmoke"
    main.style.color = 'black'
}

function pinkMode() {
  const themeBtn = document.getElementById("themeBtn3")
  // themeBtn.innerHTML = "Dark Mode"
  //themeBtn.style.backgroundColor = "#7F8486"

  navigation = document.getElementById("navigation")
  navigation.style.backgroundColor = "pink"
  navigation.style.color = "black"

  main = document.getElementById("main")
  main.style.backgroundColor = "grey"
  main.style.color = 'black'
}

function blueMode() {
  const themeBtn = document.getElementById("themeBtn4")

    //themeBtn.style.backgroundColor = "#7F8486"

  navigation = document.getElementById("navigation")
  navigation.style.backgroundColor = "aqua"
  navigation.style.color = "black"

  main = document.getElementById("main")
  main.style.backgroundColor = "grey"
  main.style.color = 'black'
}

// toggleTheme.addEventListener("click", () => {
//     if(toggleTheme.innerHTML == "Dark Mode"){
//       darkMode()
//     }else{
//       lightMode()
//     }
//   })


// add a note, and save and cancel buttons
const newNoteBtn = document.getElementById("newNoteBtn")
let alreadyCreated = false
function showNewNote() {
    if (alreadyCreated==false){
        alreadyCreated=true
        const text1 = document.createElement('div')
        text1.setAttribute('id','text1')
        text1.innerHTML= '<textarea type="hidden" value="1" id="textArea" style="display:none;"></textarea>'
        document.getElementById('text').appendChild(text1)
        const mtDiv = document.getElementById("text1");
        console.log(mtDiv)
         // create note
        const newNote = document.createElement("textArea");
        newNote.setAttribute("class","textBox");
        newNote.setAttribute("name","textBox")
        newNote.setAttribute("id","textBox")
        mtDiv.appendChild(newNote);

        // create save button
        const saveBtn = document.createElement("button");
        saveBtn.setAttribute("class","saveBtn");
        saveBtn.setAttribute("id","saveBtn")
        saveBtn.innerHTML = "Save"

        mtDiv.appendChild(saveBtn)


        // create cancel button
        const cancelBtn = document.createElement("button");
        cancelBtn.setAttribute("class",'cancelBtn');
        cancelBtn.setAttribute("id",'cancelBtn');
        cancelBtn.innerHTML = "Cancel"
        mtDiv.appendChild(cancelBtn)


        const saveButton = document.getElementById("saveBtn")
        

        saveButton.addEventListener("click", () => {
            var myText = document.getElementById("textBox");
            const textArray = myText.value.split("\n\n")
            const [noteTitle, ...p] = textArray
            addANote(noteTitle,textArray[1])
            createList(noteTitle)
            myText.remove
            myText.value = ''
            document.getElementById('text1').remove()
            alreadyCreated=false
            
        })
        
        
        const cancelButton = document.getElementById("cancelBtn")
        cancelButton.addEventListener("click" , () => {
          document.getElementById('text1').remove()
          alreadyCreated=false

        })

        }
   


    }

newNoteBtn.addEventListener("click", showNewNote);

async function side(){
  const res = await getAllNotes();
  for(let res2 in res){
    createList(res[res2]['title'])
  }
}




//starting functions
side()
