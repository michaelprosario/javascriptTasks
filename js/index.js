function getTestRecord()
{
	var task = {};
	task.Description = "A task";
	task.Priority = 1;
	task.Status = "open";

	return task;
}

//====================================================================================================

function showForm()
{
	tblForm = document.getElementById("tblForm");
	tblForm.style.display = "block";
}

//====================================================================================================

var currentRecord;
function openRecord(strID)
{
	showForm();

	currentRecord = tasks.GetRecord(strID);	

	var txtID = document.getElementById("txtID");
	var txtDescription = document.getElementById("txtDescription");
	var txtPriority = document.getElementById("txtPriority");
	txtDescription.focus();
	
	txtID.value = currentRecord.Id;
	txtDescription.value = currentRecord.Description;
	txtPriority.value = currentRecord.Priority;
}

//====================================================================================================

function deleteRecord(strID)
{
	if(confirm("Click OK to delete record."))
	{
		currentRecord = tasks.Delete(strID);	
		refreshList();
		tasks.SaveTableInLocalStorage();

	}
}

//====================================================================================================

function saveRecord()
{
	var txtID = document.getElementById("txtID");
	var txtDescription = document.getElementById("txtDescription");
	var txtPriority = document.getElementById("txtPriority");

	if(txtID.value == "")
	{
		var record = {};
		record.Description = txtDescription.value;
		record.Priority = parseInt(txtPriority.value);

		tasks.Add(record);

	}else{
		var record = tasks.GetRecord(txtID.value);
		record.Description = txtDescription.value;
		record.Priority = parseInt(txtPriority.value);

		tasks.Update(record);
	}

	tasks.SaveTableInLocalStorage();

	refreshList();

	tblForm = document.getElementById("tblForm");
	tblForm.style.display = "none";

}

//====================================================================================================

function refreshList()
{
	var divTaskList = document.getElementById("divTaskList");
	var data = tasks.GetAll();
	if(data.length == 0)
	{
		divTaskList.innerHTML = "Click 'add' to enter a new task.";
	}else{
		var html = new EJS({url: '/tasks.ejs'}).render({ "tasks": data });
		divTaskList.innerHTML = html; 
	}
}

//====================================================================================================

var tasks;
function bodyOnLoad()
{
	tasks = new TasksModel();
	tasks.LoadTableFromLocalStorage();
	refreshList();
}

//====================================================================================================

function newRecord()
{
	showForm();

	var txtID = document.getElementById("txtID");
	var txtDescription = document.getElementById("txtDescription");
	var txtPriority = document.getElementById("txtPriority");

	txtID.value = "";
	txtDescription.value = "";
	txtPriority.value = "1";

	txtDescription.focus();

}

