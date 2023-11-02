<!-- Made by Daniel Kertsmik -->

<template>
  <div class=""> 
    <!-- Bootstrap classes container -->
    <div class="container-fluid">
      <main>
        <div class="container">


          <!-- Add TODO-->
          <div class="card p-3 my-3">
            <div class="mb-4">
              <div class="">
                <input
                  v-model="newTask"
                  type="text"
                  class="form-control my-3"
                  placeholder="Write TODO..."
                />
                <textarea
                  v-model="newTaskDesc"
                  type="text"
                  class="form-control my-3"
                  placeholder="Write description..."
                ></textarea>
                <select
                  class="form-select form-select-sm mb-3 w-100"
                  v-model="selectedPriority"
                  id="priority"
                  aria-label="Default select example"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button @click="addItem" class="btn btn-primary w-100">Add</button>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-6">
              <div class="card p-3 my-3">
                <h4 class="text-center text-danger">TODO | {{ todoTasks.length }}</h4>
                <input
                  v-model="todoSearch"
                  type="text"
                  class="form-control mb-4 mt-4"
                  placeholder="Search in TODO..."
                />

                <table class="table">
                  <tr class="text-center">
                    <th class="col-4">Title</th>
                    <th class="col-4">Description</th>
                    <th class="col-2">Priority</th>
                    <th class="col-2">Button</th>
                  </tr>
                  <tr v-for="(task, index) in filteredTodoTasks" :key="index">
                    <td>{{ task.text }}</td>
                    <td class="text-muted">{{ task.desc }}</td>
                    <td :class="getPriorityClass(task.priority)">●</td>
                    <td>
                      <div class="btn-group d-flex justifie-content-center">
                        <button @click="moveToDone(task)" class="btn btn-success btn-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-circle-check"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ffffff"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        </button>
                        <button @click="editItem(task)" class="btn btn-warning btn-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-edit"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ffffff"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path
                              d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"
                            />
                            <path d="M16 5l3 3" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Done item -->
            <div class="col-xl-6">
              <div class="card p-3 my-3">
                <h4 class="text-center text-success">Done | {{ doneTasks.length }}</h4>
                <input
                  v-model="doneSearch"
                  type="text"
                  class="form-control mb-4 mt-4"
                  placeholder="Search in Done..."
                />
                <table class="table">
                  <tr class="text-center">
                    <th class="col-4">Title</th>
                    <th class="col-4">Description</th>
                    <th class="col-2">Priority</th>
                    <th class="col-2">Button</th>
                  </tr>
                  <tr v-for="(task, index) in filteredDoneTasks" :key="index">
                    <td>{{ task.text }}</td>
                    <td class="text-muted">{{ task.desc }}</td>
                    <td :class="getPriorityClass(task.priority)">●</td>
                    <td>
                      <div class="btn-group d-flex justifie-content-center w-100">
                        <button @click="deleteItem(task)" class="btn btn-danger btn-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-trash"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ffffff"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>
                        <button @click="undoItem(task)" class="btn btn-warning btn-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-arrow-back-up"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ffffff"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 14l-4 -4l4 -4" />
                            <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
// Creatr ref variables to use
const newTask = ref('')
const newTaskDesc = ref('')
const todoTasks = ref([])
const doneTasks = ref([])
const todoSearch = ref('')
const doneSearch = ref('')
const selectedPriority = ref('low')

// Do init
onMounted(() => {
  const savedTodoTasks = localStorage.getItem('todoTasks')
  if (savedTodoTasks) {
    todoTasks.value = JSON.parse(savedTodoTasks)
  }

  const savedDoneTasks = localStorage.getItem('doneTasks')
  if (savedDoneTasks) {
    doneTasks.value = JSON.parse(savedDoneTasks)
  }
})

// Add item function
function addItem() {
  if (newTask.value.trim() !== 'low') {
    let priorityValue = 1 
    if (selectedPriority.value === 'medium') {
      priorityValue = 2 
    } else if (selectedPriority.value === 'high') {
      priorityValue = 3 
    }

    const newTaskObject = {
      text: newTask.value,
      desc: newTaskDesc.value,
      done: false,
      priority: priorityValue 
    }

    todoTasks.value.push(newTaskObject)
    newTaskDesc.value = ''
    newTask.value = ''
    selectedPriority.value = 'low'
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks.value))
  }
}

// Move to done function when clicked
function moveToDone(task) {
  const index = todoTasks.value.findIndex((tasks) => tasks === task)

  if (index !== -1) {
    todoTasks.value.splice(index, 1)
    doneTasks.value.push(task)
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks.value))
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks.value))
  }
}

// Edit item buy putting it back to the editor
function editItem(task) {
  newTask.value = task.text
  newTaskDesc.value = task.desc

  const index = todoTasks.value.findIndex((tasks) => tasks === task)

  if (index !== -1) {
    todoTasks.value.splice(index, 1)
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks.value))
  }
}

// delete from done
function deleteItem(task) {
  const index = doneTasks.value.findIndex((tasks) => tasks === task)

  if (index !== -1) {
    doneTasks.value.splice(index, 1)
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks.value))
  }
}

// set back to todo
function undoItem(task) {
  const index = doneTasks.value.findIndex((tasks) => tasks === task)

  if (index !== -1) {
    doneTasks.value.splice(index, 1)
    todoTasks.value.push(task)
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks.value))
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks.value))
  }
}

// Different priorities for items
function getPriorityClass(priority) {
  switch (priority) {
    case 2:
      return 'text-warning h4 text-center'
    case 3:
      return 'text-danger h3 text-center'
    case 1:
      return 'text-success h5 text-center'
    default:
      return '' 
  }
}

// search for item todo
const filteredTodoTasks = computed(() => {
  if (todoSearch.value === '') {
    return todoTasks.value
      .filter((task) => task.text.toLowerCase().includes(todoSearch.value.toLowerCase()))
      .sort((a, b) => b.priority - a.priority) 
  } else {
    return todoTasks.value.filter((task) =>
      task.text.toLowerCase().includes(todoSearch.value.toLowerCase())
    )
  }
})

// search for item done
const filteredDoneTasks = computed(() => {
  if (doneSearch.value === '') {
    return doneTasks.value
      .filter((task) => task.text.toLowerCase().includes(doneSearch.value.toLowerCase()))
      .sort((a, b) => b.priority - a.priority)
  } else {
    return doneTasks.value.filter((task) =>
      task.text.toLowerCase().includes(doneSearch.value.toLowerCase())
    )
  }
})
</script>
