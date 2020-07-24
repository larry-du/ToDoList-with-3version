// import { creatList } from './template/creatListTemplate.js'
//取得編輯頁面元素
const eventAdd = document.querySelector('.event-add');
//取得增加任務按鈕元素
const addArea = document.querySelector('.add-area');
const editSaveArea = document.querySelector('.save-area');
//取得增加任務元素
const addTask = document.querySelector('.add-task');
const addTaskButton = document.querySelector('#add-button');
const cancelTaskButton = document.querySelector('#cancel-button');
const toDoListArea = document.querySelector('.to-do-list-area');
//取得localStorage資料,如無資料會是空陣列
let toDoListData = JSON.parse(localStorage.getItem('toDoListData')) || [];
// console.log(toDoListData)
//畫面渲染
render(queueData());

//開啟與關閉增加任務
function openAddTaskArea(e) {
    addArea.classList.add('add-area-none');
    eventAdd.classList.add('event-area-block');
    const openEvent = document.querySelector('.event');
}

function addTaskData(e) {
    //取得編輯頁面標題元素
    const title = document.querySelector('.type-title');
    // console.log(title.value)
    //取得日期元素
    const date = document.querySelector('.edit-info input[type="date"]');
    // console.log(date)
    //取得時間元素
    const time = document.querySelector('.edit-info input[type="time"]');
    //取得留言內容元素
    const comment = document.querySelector('.edit-info .comment-area');
    //存資料
    const allMessage = {
        title: title.value,
        date: date.value,
        time: time.value,
        comment: comment.value,
        id: Date.now(),
        isStar: false,
        complete: false,
        isEdit: false
    }

    //將資料上傳
    toDoListData.push(allMessage);
    //畫面渲染
    render(queueData());
    //資料存進localStorage
    localStorage.setItem('toDoListData', JSON.stringify(toDoListData));
    //輸入內容清空
    title.value = '';
    date.value = '';
    time.value = '';
    comment.value = '';
    //增加任務頁面關閉
    eventAdd.classList.remove('event-area-block');
    //增加任務按鈕開啟
    addArea.classList.remove('add-area-none');
}

function cancelTask() {
    const title = document.querySelector('.edit .type-title')
    const date = document.querySelector('.edit-info input[type="date"]');
    const time = document.querySelector('.edit-info input[type="time"]');
    const comment = document.querySelector('.edit-info .comment-area');
    // render();
    title.value = '';
    date.value = '';
    time.value = '';
    comment.value = '';
    eventAdd.classList.remove('event-area-block');
    addArea.classList.remove('add-area-none');
}

//動態新增的清單
function creatList(data) {
    return `
<div class="task container ${data.isEdit ? 'isEdit' : ''} ${data.isStar ? 'high-light' : ''} ${data.complete ? 'complete' : ''}">
    <div class="card">
        <div class="card-body">
            <div class="card-title">
                <div class="check-area">
                    <input type="checkbox"
                        id="task-check-${data.id}" ${data.complete ? 'checked' : ''}>
                    <label for="task-check-${data.id}"></label>
                </div>
                <input class="list-title" value="${data.title}" disabled>
            </div>
            <div class="edit-area">
                <i class="fas fa-star top-star"></i>
                <i class="fal fa-pen edit-pen"></i>
                <i class="fal fa-trash-alt trash"></i>
            </div>
        </div>
        <div class="status">
            <div class="date">
                <i class="far fa-calendar-alt"></i>
                <span>${data.date}</span>
            </div>
            <i class="fal fa-file"></i>
            <i class="fal fa-comment-dots"></i>
        </div>
    </div>
</div>`
}

//動態新增編輯清單
function creatEditList(data) {
    return `<div class="save-info">
    <div class="save-detail">
        <div class="deadline">
            <div class="deadline-icon">
                <i class="far fa-calendar-alt fa-fw"></i>
                <span>Deadline</span>
            </div>
            <div class="date-area">
                <input type="date">
                <input type="time">
            </div>
        </div>

        <div class="file">
            <div class="file-icon">
                <i class="fal fa-file fa-fw"></i>
                <span>file</span>
            </div>
            <div class="file-area">
                <div class="file-information">
                    <p>20180514.zip</p>
                    <p>uploaded yesterday</p>
                </div>
                <button class="add-file">
                </button>
            </div>

        </div>

        <div class="comment">
            <div class="comment-icon">
                <i class="fal fa-comment-dots fa-fw"></i>
                <span>comment</span>
            </div>

            <textarea class="comment-area"
                placeholder="Type your memo here..."></textarea>
        </div>
    </div>
    <div class="check-button">
    <button  class="cancel">
        <i class="fal fa-times"></i>
        Cancel
    </button>
    <button class="save">
        <i class="fal fa-plus"></i>
        Save
    </button>
</div>
</div>
`
}

function render(sortData) {
    toDoListArea.innerHTML = sortData.map(data => {
        return creatList(data)
    }).join('');
    deleteData();
    editTask();
    highLight();
    complete();
}

function highLight() {
    const [...topStars] = document.querySelectorAll('.task .top-star');
    topStars.map((topStar, topStarIndex) => {
        topStar.addEventListener('click', (e) => {
            const dataIndex = toDoListData.findIndex(data => data.id === Number(e.target.id))
            // console.log(i)
            toDoListData[dataIndex].isStar = !toDoListData[dataIndex].isStar
            localStorage.setItem('toDoListData', JSON.stringify(toDoListData));
            // const sortData = arrangementData();
            render(queueData());
        })
    })
}

function queueData() {
    const hightLight = toDoListData.filter(data => data.isStar);
    const normal = toDoListData.filter(data => !data.isStar);
    return [...hightLight, ...normal]
}

function complete() {
    const [...checkBoxs] = document.querySelectorAll('.task input[type="checkbox"]');
    // console.log(checkBoxs)
    checkBoxs.map(checkBox => {
        checkBox.addEventListener('click', (e) => {
            // console.log(e.target)
            const dataIndex = toDoListData.findIndex(data => data.id === Number(e.target.id))
            // console.log(dataIndex)
            toDoListData[dataIndex].complete = !toDoListData[dataIndex].complete;
            localStorage.setItem('toDoListData', JSON.stringify(toDoListData));
            render(queueData());
        })
    })
}

function deleteData() {
    const [...deleteButtons] = document.querySelectorAll('.task .trash');
    if (deleteButtons.length !== 0) {
        deleteButtons.map((deleteButton, deleteButtonIndex) => {
            deleteButton.addEventListener('click', (e) => {
                // console.log(taskList, deleteButtonIndex)
                // console.log(deleteButton)
                const dataIndex = toDoListData.findIndex(data => data.id === Number(e.target.id))
                // tasks[dataIndex].remove();
                // const updateData = toDoListData.filter((item, itemIndex) => itemIndex !== dataIndex);
                toDoListData.splice(dataIndex, 1)
                localStorage.setItem('toDoListData', JSON.stringify(toDoListData));
                render(queueData());
            });
        });
    }
}

function editTask() {
    const [...editButtons] = document.querySelectorAll('.task .edit-pen');
    const [...tasks] = document.querySelectorAll('.task');

    const editPage = creatEditList();
    editButtons.map((editButton, editButtonIndex) => {
        const task = tasks[editButtonIndex];
        task.insertAdjacentHTML('beforeend', editPage);

        const taskDate = task.querySelector('.save-info input[type="date"]');
        const taskTime = task.querySelector('.save-info input[type="time"]');
        const taskComment = task.querySelector('.save-info .comment-area');
        const taskTitle = task.querySelector('.list-title');
        const saveButton = task.querySelector('.save');
        const cancelButton = task.querySelector('.cancel');

        editButton.addEventListener('click', (e) => {
            taskTitle.disabled = !taskTitle.disabled;

            taskDate.value = toDoListData[editButtonIndex].date;
            taskTime.value = toDoListData[editButtonIndex].time;
            taskComment.value = toDoListData[editButtonIndex].comment;

            toDoListData[editButtonIndex].isEdit = !toDoListData[editButtonIndex].isEdit

            // const isEdit = document.querySelector('.isEdit');
            // task.classList.toggle('isEdit');
            // isEdit?.classList.remove('isEdit');
        })

        saveButton.addEventListener('click', function (event) {
            saveEdit(task, editButtonIndex);
        });

        cancelButton.addEventListener('click', function (event) {
            cancelEdit();
        });
    })
}

function saveEdit(task, index) {
    const taskTitle = task.querySelector('.task .list-title')
    const taskDate = task.querySelector('.save-info input[type="date"]');
    const taskTime = task.querySelector('.save-info input[type="time"]');
    const taskComment = task.querySelector('.save-info .comment-area');
    const isEdit = document.querySelector('.isEdit');

    const allMessage = {
        title: taskTitle.value,
        date: taskDate.value,
        time: taskTime.value,
        comment: taskComment.value,
        id: toDoListData[index].id
    }

    toDoListData[index] = allMessage;
    localStorage.setItem('toDoListData', JSON.stringify(toDoListData));

    isEdit?.classList.remove('isEdit');
}

function cancelEdit() {
    const isEdit = document.querySelector('.isEdit');
    isEdit?.classList.remove('isEdit');
}

addTask.addEventListener('click', openAddTaskArea);
addTaskButton.addEventListener('click', addTaskData);
cancelTaskButton.addEventListener('click', cancelTask);
