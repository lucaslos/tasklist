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
            ended: null
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
        elem.innerHTML = '<h1>'+data.title+'</h1><p>'+data.description+'</p><div name="delete" class="delete"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><polygon points="19,6.4 17.6,5 12,10.6 6.4,5 5,6.4 10.6,12 5,17.6 6.4,19 12,13.4 17.6,19 19,17.6 13.4,12 "></polygon></g></svg></div><div name="done" class="done"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><polygon points="9,16.2 4.8,12 3.4,13.4 9,19 21,7 19.6,5.6 "></polygon></g></svg></div>';
        
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
            elem.className = "task";
            elem.id = data.id;
            elem.setAttribute("name", "task");
            elem.innerHTML = '<h1>'+data.title+'</h1><p>'+data.description+'</p><div name="delete" class="delete"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><polygon points="19,6.4 17.6,5 12,10.6 6.4,5 5,6.4 10.6,12 5,17.6 6.4,19 12,13.4 17.6,19 19,17.6 13.4,12 "></polygon></g></svg></div><div name="done" class="done"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><polygon points="9,16.2 4.8,12 3.4,13.4 9,19 21,7 19.6,5.6 "></polygon></g></svg></div>';
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
            elem.innerHTML = '<h1>'+data.title+'</h1><p>'+data.description+'</p><div class="date">Finished at '+data.ended+'</div><div name="delete" class="delete"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><polygon points="19,6.4 17.6,5 12,10.6 6.4,5 5,6.4 10.6,12 5,17.6 6.4,19 12,13.4 17.6,19 19,17.6 13.4,12 "></polygon></g></svg></div><div name="restore" class="restore"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><path d="M17.6,6.4C16.2,4.9,14.2,4,12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8c3.7,0,6.8-2.6,7.7-6h-2.1c-0.8,2.3-3,4-5.6,4c-3.3,0-6-2.7-6-6s2.7-6,6-6c1.7,0,3.1,0.7,4.2,1.8L13,11h7V4L17.6,6.4z"></path></g></svg></div>';
            wrapper.appendChild(elem);
        }
    }
    
    setTimeout(updatePosition,5);
}

function updateEventListeners() {
    var del = document.getElementsByName("delete"),
        done = document.getElementsByName("done"),
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
}

function updatePosition() {
    var cards = document.getElementsByName("task"),
        above = 0,
        counter = 0;
    
    for(i=0; i<cards.length; i++) {
        if(cards[i].className != "task finished") {
            cards[i].style.top = above+(6*counter)+"px";

            above += cards[i].clientHeight;
            counter++;
        }
    }
    
    for(i=0; i<cards.length; i++) {
        
        if(cards[i].className == "task finished") {
            cards[i].style.top = above+(6*counter)+"px";

            above += cards[i].clientHeight;
            counter++;
        }
    }
    
    updateEventListeners();
}

loadTasks();

function deleteTask() {
    this.removeEventListener("click", deleteTask, false);
    var card = this.parentElement,
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
            },300);
            
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
            card.innerHTML = '<h1>'+task.title+'</h1><p>'+task.description+'</p><div name="delete" class="delete"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><polygon points="19,6.4 17.6,5 12,10.6 6.4,5 5,6.4 10.6,12 5,17.6 6.4,19 12,13.4 17.6,19 19,17.6 13.4,12 "></polygon></g></svg></div><div name="done" class="done"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><polygon points="9,16.2 4.8,12 3.4,13.4 9,19 21,7 19.6,5.6 "></polygon></g></svg></div>';
            
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
            var month = time.getMonth()+1;
            var year = time.getFullYear();
            var hour = time.getHours();
            var minute = time.getMinutes();
            
            tasks[i] = JSON.stringify({
                title:  task.title,
                description: task.description,
                id: task.id,
                status: false,
                ended: day+"/"+month+"/"+year+" "+hour+":"+minute
            });
            
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
            card.className = "task finished";
            
            card.innerHTML = '<h1>'+task.title+'</h1><p>'+task.description+'</p><div class="date">Finished at '+day+"/"+month+"/"+year+" "+hour+":"+minute+'</div><div name="delete" class="delete"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><polygon points="19,6.4 17.6,5 12,10.6 6.4,5 5,6.4 10.6,12 5,17.6 6.4,19 12,13.4 17.6,19 19,17.6 13.4,12 "></polygon></g></svg></div><div name="restore" class="restore"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="display: block;"><g><path d="M17.6,6.4C16.2,4.9,14.2,4,12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8c3.7,0,6.8-2.6,7.7-6h-2.1c-0.8,2.3-3,4-5.6,4c-3.3,0-6-2.7-6-6s2.7-6,6-6c1.7,0,3.1,0.7,4.2,1.8L13,11h7V4L17.6,6.4z"></path></g></svg></div>'
            
            setTimeout(updatePosition,5);
            
            break;
        }
    }
}
