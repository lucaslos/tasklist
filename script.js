function addEvents() {
    //global var
    
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if(tasks == null)  tasks = [];
    
    document.getElementById("addTaskButtom").addEventListener("click", controlAddTask, false);
    document.getElementById("createTask").addEventListener("click", addTask, false);
}

function hide(elem) {
    elem.style.display = "none";
}

function show(elem,type) {
    elem.style.display = "block";
}

function log(v) {
    console.log(v);
}

function twoDigtsNum(n){
    return n > 9 ? "" + n: "0" + n;
}

addEvents();

function controlAddTask() {
    var box = document.getElementById("addTask"),
        bg = document.getElementById("background");
    
    if(box.className == "expanded") {
        box.className = "";
        
        bg.style.opacity = "0";
        
        setTimeout(function(){
            hide(bg);
        },500);
    } else {
        box.className = "expanded";
        
        setTimeout(function(){
            bg.style.opacity = "1";
        },1);
        
        show(bg);
    }
}

function addTask() {
    var title = document.getElementById("title"),
        description = document.getElementById("description");
    
    if(title.value == "" && description.value == "") {
        
    } else {
        var newTask = JSON.stringify({
            title:  title.value, 
            description: description.value,
            id: new Date().getTime(),
            status: true,
            ended: null,
            highlighted: false
        });
        
        tasks.unshift(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        title.value = "";
        description.value = "";
        
        controlAddTask();
        
        var data = JSON.parse(newTask);
        
        var elem = document.createElement("div");
        elem.className = "task";
        elem.id = data.id;
        elem.setAttribute("name", "task");
        elem.innerHTML = '<h1>'+data.title+'</h1><p>'+data.description+'</p><div name="menu" class="menu"><i class="material-icons">more_vert</i><div class="options"><div class="delete" name="delete"><i class="material-icons">delete</i></div><div class="edit" name="edit"><i class="material-icons">edit</i></div></div></div> \
            <div name="highlight" class="highlight"><i class="material-icons">grade</i></div> \
<div name="done" class="done"><i class="material-icons">done</i></div>';
        
        if(document.getElementsByName("task")[0] == null) {
            document.getElementById("tasks").appendChild(elem);
        } else {
            document.getElementById("tasks").insertBefore(elem, document.getElementsByName("task")[0]);
        }
        
        setTimeout(updatePosition,5);
    }
}

function loadTasks() {
    var wrapper = document.getElementById("tasks"),
        length = tasks.length;
    
    if(length == 0) return;
    
    for(i=0; i<length; i++){
        var data = JSON.parse(tasks[i]);
        
        if(data.status){
            var elem = document.createElement("div");
            if("highlighted" in data){
                if(data.highlighted){
                    elem.className = "task highlighted";
                } else {
                    elem.className = "task";
                }
            } else {
                elem.className = "task";
            }
            elem.id = data.id;
            elem.setAttribute("name", "task");
            elem.innerHTML = '<h1>'+data.title+'</h1><p>'+data.description+'</p><div name="menu" class="menu"><i class="material-icons">more_vert</i><div class="options"><div class="delete" name="delete"><i class="material-icons">delete</i></div><div class="edit" name="edit"><i class="material-icons">edit</i></div></div></div> \
            <div name="highlight" class="highlight"><i class="material-icons">grade</i></div> \
<div name="done" class="done"><i class="material-icons">done</i></div>';
            wrapper.appendChild(elem);
        }
    }
    
    for(i=0; i<length; i++){
        var data = JSON.parse(tasks[i]);
        
        if(!data.status){
            var elem = document.createElement("div");
            elem.className = "task finished";
            elem.id = data.id;
            elem.setAttribute("name", "task");
            elem.innerHTML = '<h1>'+data.title+'</h1><p>'+data.description+'</p><div class="date">Finished at '+data.ended+'</div><div name="menu" class="menu"><i class="material-icons">more_vert</i><div class="options"><div class="delete" name="delete"><i class="material-icons">delete</i></div><div class="edit" name="edit"><i class="material-icons">edit</i></div></div></div><div name="restore" class="restore"><i class="material-icons">restore</i></div>';
            wrapper.appendChild(elem);
        }
    }
    
    setTimeout(updatePosition,5);
}

function updateEventListeners() {
    var del = document.getElementsByName("delete"),
        done = document.getElementsByName("done"),
        menu = document.getElementsByName("menu"),
        edit = document.getElementsByName("edit"),
        highlight = document.getElementsByName("highlight"),
        restore = document.getElementsByName("restore");
    
    for(i=0; i<del.length; i++){
        del[i].removeEventListener("click", deleteTask, false);
        del[i].addEventListener("click", deleteTask, false);
    }
    
    for(i=0; i<done.length; i++){
        done[i].removeEventListener("click", finishTask, false);
        done[i].addEventListener("click", finishTask, false);
    }
    
    for(i=0; i<restore.length; i++){
        restore[i].removeEventListener("click", restoreTask, false);
        restore[i].addEventListener("click", restoreTask, false);
    }
    
    for(i=0; i<menu.length; i++){
        menu[i].removeEventListener("click", openMenu, false);
        menu[i].addEventListener("click", openMenu, false);
    }
    
    for(i=0; i<edit.length; i++){
        edit[i].removeEventListener("click", editTask, false);
        edit[i].addEventListener("click", editTask, false);
    }
    
    for(i=0; i<edit.length; i++){
        edit[i].removeEventListener("click", editTask, false);
        edit[i].addEventListener("click", editTask, false);
    }
    
    for(i=0; i<highlight.length; i++){
        highlight[i].removeEventListener("click", highlightTask, false);
        highlight[i].addEventListener("click", highlightTask, false);
    }
}

function updatePosition() {
    var cards = document.getElementsByName("task"),
        above = 0,
        counter = 0;
    
    for(i=cards.length-1; i>=0; i--) {
        if(cards[i].classList.contains("highlighted")) {
            cards[i].style.top = above+(6*counter)+"px";
            cards[i].style.height = cards[i].clientHeight+"px";
            
            above += cards[i].clientHeight;
            counter++;
        }
    }
    
    for(i=0; i<cards.length; i++) {
        if(!cards[i].classList.contains("highlighted") && !cards[i].classList.contains("finished")) {
            cards[i].style.top = above+(6*counter)+"px";
            cards[i].style.height = cards[i].clientHeight+"px";
            
            above += cards[i].clientHeight;
            counter++;
        }
    }
    
    for(i=0; i<cards.length; i++) {
        
        if(cards[i].classList.contains("finished")) {
            cards[i].style.top = above+(6*counter)+"px";
            cards[i].style.height = cards[i].clientHeight+"px";
            
            above += cards[i].clientHeight;
            counter++;
        }
    }
    
    updateEventListeners();
}

loadTasks();

function deleteTask() {
    
    this.removeEventListener("click", deleteTask, false);
    var card = this.parentElement.parentElement.parentElement,
        id = card.id;
    
    for(i=0; i<tasks.length; i++) {
        if(JSON.parse(tasks[i]).id == id) {
            if(tasks.length != 1) {
                tasks.splice(i,1);

                localStorage.setItem("tasks", JSON.stringify(tasks));
            } else {
                localStorage.removeItem("tasks");
                tasks = [];
            }
            
            card.className = "task deleted";
            
            setTimeout(function(){
                document.getElementById("tasks").removeChild(card);
                updatePosition();
            },500);
            
            break;
        }
    }
}

function restoreTask() {
    this.removeEventListener("click", finishTask, false);
    var card = this.parentElement,
        id = card.id;
    
    for(i=0; i<tasks.length; i++) {
        if(JSON.parse(tasks[i]).id == id) {
            if(document.getElementsByName("task")[0] == null) {            
                document.getElementById("tasks").appendChild(card);
            } else {
                document.getElementById("tasks").insertBefore(card, document.getElementsByName("task")[0]);
            }
            
            var task = JSON.parse(tasks[i]);
            
            tasks[i] = JSON.stringify({
                title:  task.title, 
                description: task.description,
                id: task.id,
                status: true,
                ended: null
            });
            
            tasks.unshift(tasks.pop());
            
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
            card.className = "task";
            card.innerHTML = '<h1>'+task.title+'</h1><p>'+task.description+'</p><div name="menu" class="menu"><i class="material-icons">more_vert</i><div class="options"><div class="delete" name="delete"><i class="material-icons">delete</i></div><div class="edit" name="edit"><i class="material-icons">edit</i></div></div></div><div name="done" class="done"><i class="material-icons">done</i></div>';
            
            setTimeout(updatePosition,5);
        }
    }
}

function finishTask() {
    this.removeEventListener("click", finishTask, false);
    var card = this.parentElement,
        id = card.id;
    
    for(i=0; i<tasks.length; i++) {
        if(JSON.parse(tasks[i]).id == id) {
            var task = JSON.parse(tasks[i]);
                
            var time = new Date();
            var day = time.getDate();
            var month = twoDigtsNum(time.getMonth()+1);
            var year = time.getFullYear();
            var hour = twoDigtsNum(time.getHours());
            var minute = twoDigtsNum(time.getMinutes());
            
            tasks[i] = JSON.stringify({
                title:  task.title,
                description: task.description,
                id: task.id,
                status: false,
                ended: day+"/"+month+"/"+year+" "+hour+":"+minute
            });
            
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
            card.className = "task finished";
            
            card.innerHTML = '<h1>'+task.title+'</h1><p>'+task.description+'</p><div class="date">Finished at '+day+"/"+month+"/"+year+" "+hour+":"+minute+'</div><div name="menu" class="menu"><i class="material-icons">more_vert</i><div class="options"><div class="delete" name="delete"><i class="material-icons">delete</i></div><div class="edit" name="edit"><i class="material-icons">edit</i></div></div></div><div name="restore" class="restore"><i class="material-icons">restore</i></div>'
            
            setTimeout(updatePosition,5);
            
            break;
        }
    }
}

function openMenu() {
    var menu = this.children[1];
    
    if(menu.className == "options"){
        menu.className = "options expanded";
        this.style.fill = "#ddd";
    } else {
        menu.className = "options";
        this.style.fill = "";
    }
}

function editTask() {
    this.removeEventListener("click", editTask, false);
    this.parentElement.className = "options";
    
    var card = this.parentElement.parentElement.parentElement,
        bg = document.getElementById("background"),
        addTask = document.getElementById("addTask"),
        id = card.id,
        cacheHTML = card.innerHTML,
        cacheClass = card.className,
        cacheTop = card.style.top;
    
    card.className = "edit task";
    show(bg);
    card.style.zIndex = "200";
    setTimeout(function(){
        bg.style.opacity = "1";
    },1);
    
    document.body.style.overflowY = "hidden";
    
    addTask.style.zIndex = "-1";
    
    for(i=0; i<tasks.length; i++) {
        if(JSON.parse(tasks[i]).id == id) {
            var task = JSON.parse(tasks[i]);
                                                               
            card.innerHTML = '<h1>Edit Task</h1><input id="editTitle" value="'+task.title+'" placeholder="Title"><textarea id="editDescription" placeholder="Description">'+task.description+'</textarea><div id="save">SAVE</div><div id="cancel">CANCEL</div>';
            document.getElementById("save").addEventListener("click", confirmEdit, false);
            document.getElementById("cancel").addEventListener("click", cancelEdit, false);
            document.getElementById("background").addEventListener("click", cancelEdit, false);
            
            card.className = "edit task";
            card.style.top = document.body.scrollTop+50+"px";
            
            setTimeout(function(){
                card.className = "edit task show";
            },500);
            
            function confirmEdit() {
                
                card.className = cacheClass;
                bg.style.opacity = "0";
                setTimeout(function(){
                    hide(bg);
                },500);
                document.body.style.overflowY = "auto";
                addTask.style.zIndex = "";
                
                tasks[i] = JSON.stringify({
                        title:  document.getElementById("editTitle").value, 
                        description: document.getElementById("editDescription").value,
                        id: task.id,
                        status: task.status,
                        ended: task.ended
                    });

                    localStorage.setItem("tasks", JSON.stringify(tasks));

                card.className = cacheClass;
                card.style.top = cacheTop;
                
                if(task.status){
                
                    card.innerHTML = '<h1>'+document.getElementById("editTitle").value+'</h1><p>'+document.getElementById("editDescription").value+'</p><div name="menu" class="menu"><i class="material-icons">more_vert</i><div class="options"><div class="delete" name="delete"><i class="material-icons">delete</i></div><div class="edit" name="edit"><i class="material-icons">edit</i></div></div></div> \
            <div name="highlight" class="highlight"><i class="material-icons">grade</i></div> \
<div name="done" class="done"><i class="material-icons">done</i></div>';
                } else {
                    
                    card.innerHTML = '<h1>'+document.getElementById("editTitle").value+'</h1><p>'+document.getElementById("editDescription").value+'</p><div class="date">Finished at '+task.ended+'</div><div name="menu" class="menu"><i class="material-icons">more_vert</i><div class="options"><div class="delete" name="delete"><i class="material-icons">delete</i></div><div class="edit" name="edit"><i class="material-icons">edit</i></div></div></div><div name="restore" class="restore"><i class="material-icons">restore</i></div>';
                    
                }
                
                this.addEventListener("click", editTask, false);
                
                setTimeout(updatePosition, 600);
            }
            
            function cancelEdit() {
                
                card.className = cacheClass;
                card.style.top = cacheTop;
                bg.style.opacity = "0";
                setTimeout(function(){
                    hide(bg);
                    card.style.zIndex = "";
                },500);
                document.body.style.overflowY = "auto";
                addTask.style.zIndex = "";
                
                card.innerHTML = cacheHTML;
                
                this.addEventListener("click", editTask, false);
                
                setTimeout(updatePosition, 600);
            }
            
            break;
        }
    }
    
}

function highlightTask() {
    var card = this.parentElement,
        id = card.id,
        state;
    
    if (card.classList.contains("highlighted")) {
        card.classList.toggle("highlighted");
        state = false;
        
    } else {
        card.classList.toggle("highlighted");
        state = true;
    }
        
        
    for(i=0; i<tasks.length; i++) {
        if(JSON.parse(tasks[i]).id == id) {
            var task = JSON.parse(tasks[i]);

            tasks[i] = JSON.stringify({
                title:  task.title, 
                description: task.description,
                id: task.id,
                status: true,
                ended: null,
                highlighted: state
            });

            localStorage.setItem("tasks", JSON.stringify(tasks));

            setTimeout(updatePosition, 5);

            break;
        }  
    }
}