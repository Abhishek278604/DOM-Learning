const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
addBtn.addEventListener("click", ()=>{
    if(input.value === ""){
        alert("First Input Some Item In Input Box !!");
        return;
    }
    addItem(input.value.trim());
    input.value = "";
    input.focus();
});

input.addEventListener("keydown",(e)=>{
    if(e.key === 'Enter') addBtn.click();
});

removeAllBtn.addEventListener("click", ()=> {
    if(list.children.length === 0) return;
    if(confirm("Remove all items from the list !!!")){
        list.innerHTML = "";
    }
});

let itemCount = 0;

function addItem(text){
    itemCount++;
    const li = document.createElement("li");

    const numSpan = document.createElement("span");
    numSpan.className = "item-num";
    numSpan.textContent = "#" + itemCount + ". ";

    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = text;
    span.addEventListener("dblclick",()=>{
        startEditing(span);
    });

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", ()=> {
        startEditing(span);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete");
    delBtn.addEventListener("click", ()=> {
        li.remove();
    });

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);
    li.appendChild(numSpan);
    li.appendChild(span);
    li.appendChild(btnGroup);
    list.appendChild(li);
}


function startEditing(span){
    if(span.classList.contains("editable")){
        return;
    }

    const originalText = span.textContent;
    span.classList.add("editable");
    span.contentEditable = "true";
    span.focus();

    const range = document.createRange();
    range.selectNodeContents(span);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    function finishEdit(){
        span.contentEditable = "false";
        span.classList.remove("editable");
        const newText = span.textContent.trim();
        if(newText === ""){
            span.textContent = originalText;
        }
        span.removeEventListener("blur",finishEdit);
        span.removeEventListener("keydown",handleKey);
    }

    function handleKey(e){
        if(e.key === "Enter"){
            e.preventDefault();
            span.blur();
        }
        if(e.key === "Escape"){
            span.textContent = originalText;
            span.blur();
        }
    }

    span.addEventListener("blur",finishEdit);
    span.addEventListener("keydown",handleKey);
}