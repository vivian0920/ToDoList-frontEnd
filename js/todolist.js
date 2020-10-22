//新增代辦項目
var todolist=[];
var id=1;

function addList(){
   
    var _title=$('#title').val();
    var _message=$('#message').val();

    if(_title==""||_message==""){
        alert("請輸入標題和內容!")
    }else{
        var newTodo={
            'id':id,
            'title':_title,
            'content':_message,
            'status':false

        };
        todolist.push(newTodo);
        newList(newTodo);
        id++;

        $('#title').val('');
        $('#message').val('');

    }
}

//顯示代辦清單頁面
function newList(data){
    var status=(data.status)?"checked":"";
    var titleClass=(data.status)?"title2":"title";
    var messageClass=(data.status)?"message2":"message";
    var editClass=(data.status)?"none":"inline";

    var content=
        `<div class="content" id="${data.id}">
            <div class="${titleClass}">
                <input type="checkbox" onclick="changeStatus('${data.id}',this)" />
                <text id="title${data.id}">${data.title}</text>
                <button class="i_btn" onclick="removeList('${data.id}')">刪除</button>
                <button class="i_btn" id="edit${data.id}" style="display:${editClass}" 
                onclick="editList('${data.id}')">修改</button>
                <button class="i_btn" id="update${data.id}" style="display:none" 
                onclick="updateList('${data.id}')">確定</button>
            </div>
            <div class="${messageClass}">
                <text id="message${data.id}">${data.content}</text>
            </div>
        </div>`;

    $('body').append(content);
}

//修改代辦清單項目
    //按下修改後變輸入框
    function editList(id){
        $('#edit'+id).css("display","none");
        $('#update'+id).css("display","inline");


        var input=document.createElement("input");
        input.type="text";
        input.id="edit_title"+id;
        input.valus=$('#title'+id).text();
        input.size=Math.max(20/4*3,4);

        $('#title'+id).css("display","none");
        $('#title'+id).parent().append(input);

        var message_input=document.createElement("input");
        message_input.type="text";
        message_input.id="edit_message"+id;
        message_input.value=$('message'+id).text();
        message_input.size=Math.max(50/4*3,4);

        $('#message'+id).css("display","none");
        $('#message'+id).parent().append(message_input);
    }
    //修改完按下確認後
    function updateList(id){
        var title=$('#edit_title'+id).val();
        var message=$('#edit_message'+id).val();

        $('#title'+id).text(title);
        $('#message'+id).text(message);

        $('#edit'+id).css("display","inline");
        $('#update'+id).css("display","none");

        $('#title'+id).css("display","inline");
        $('#message'+id).css("display","inline");

        $('#edit_title'+id).remove();
        $('#edit_message'+id).remove();
        

    }
//刪除代辦項目
function removeList(id){
    var index=todolist.findIndex(element=>element.id==id);
    todolist.splice(index,1);
    $('#'+id).remove();

}
//改變代辦項目狀態
function  changeStatus(id,btnstatus){
    var title=btnstatus.parentNode;
    var message=title.nextElementSibling;
    if(btnstatus.checked){
        title.className="title2";
        message.className="message2";
        $('#edit'+id).css("display","none");
        $('#update'+id).css("display","none");

        if(document.getElementById("#edit_title"+id)){
            $('#title'+id).css("display","inline");
            $('#message'+id).css("display","inline");
            $('#edit_title'+id).remove();
             $('#edit_message'+id).remove();

        }
    }else{
        title.className="title";
        message.className="message";
        $('#edit'+id).css("display","inline");


    }





}

