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

//Change the image to the url of the image

const generateTaskCard = ({ id, url, title, type, description }) => {
  return `
        <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
            <div class="card">
              <div class="card-header">
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-outline-warning me-1" name=${id} onClick="editTask(this)">
                    <i class="fas fa-edit" name=${id} onClick="editTask(this)"></i>
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
                <button class="btn btn-outline-success float-end">
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
  const target = id.getAttribute("name");
  // globalTaskData = globalTaskData.filter((task) => task.id !== target);
  saveToLocalStorage();
  window.location.reload();
};
