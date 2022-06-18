let globalTaskData = [];
taskContents = document.getElementById("taskContents");

const addCard = () => {
  const newTaskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageURL").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDiscription").value,
  };

  taskContents.insertAdjacentHTML(
    "beforeend",
    generateTaskCard(newTaskDetails)
  );

  globalTaskData.push(newTaskDetails);
  saveToLocalStorage();
};

// TODO Change the image to selection tab later

const generateTaskCard = ({ id, url, title, type, description }) => {
  return `
        <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
            <div class="card">
              <div class="card-header">
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-outline-warning me-1" name=${id} onClick="editTask(this)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger" name=${id} onClick="deleteTask(this)">
                    <i class="fas fa-trash" name=${id} onClick="deleteTask(this)"></i>
                  </button>
                </div>
              </div>
              <img src="./images/Studies-bg-todo.jpg" alt="Image" />
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <span class="badge bg-info">${type}</span>
              </div>
              <div class="card-footer">
                <button class="btn btn-outline-success float-end" name=${id} data-bs-toggle="modal" data-bs-target="#viewCardModal" onClick=openTask(this)>
                  Open Task
                </button>
              </div>
            </div>
        </div>
    `;
};

const saveToLocalStorage = () => {
  localStorage.setItem("taskData", JSON.stringify({ tasks: globalTaskData }));
};

const reloadFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("taskData"));

  if (localStorageData) {
    globalTaskData = localStorageData.tasks;
    globalTaskData.map((task) => {
      taskContents.insertAdjacentHTML("beforeend", generateTaskCard(task));
    });
  }
};

const deleteTask = (id) => {
  const target = id.getAttribute("name");
  globalTaskData = globalTaskData.filter((task) => task.id !== target);
  saveToLocalStorage();
  window.location.reload();
};

const editTask = (id) => {
  id.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
  id.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
  id.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")
  id.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
  id.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveTask(this)")
};

const saveTask = (e) => {
  const targetID = e.getAttribute("name");
  globalTaskData.forEach(tasks => {
      if (tasks["id"] == targetID) {
          tasks["title"] = e.parentNode.parentNode.childNodes[5].childNodes[1].outerText;
          tasks["type"] = e.parentNode.parentNode.childNodes[5].childNodes[5].outerText;
          tasks["description"] = e.parentNode.parentNode.childNodes[5].childNodes[3].outerText;
      }
    });
  e.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onClick", "openTask(this)");
  e.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "Open Task"
  saveToLocalStorage();
  window.location.reload();
}

const openTask = (e) =>{
  const targetID = document.getElementById("viewBody");
  targetID.innerHTML = "<b>Title: " + e.parentNode.parentNode.childNodes[5].childNodes[1].outerText +"</b><br>"+ 
                                    "<b><i>Type: </b>" + e.parentNode.parentNode.childNodes[5].childNodes[5].outerText +"</i> <br>"+
                                    "<b>Description: </b>" + e.parentNode.parentNode.childNodes[5].childNodes[3].outerText;
}
