

// Returns true when string "str" is empty or null.
function stringIsNullOrEmpty(str)
{
    return str == "" || str == null;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// Class provides methods for adding, updating, removing, and listing tasks
function TasksModel()
{
    this.taskArray = new Array();


    //This method ensures that properties of record are valid.
    this.CheckRecord = function(record){
        if(stringIsNullOrEmpty(record.Description))
        {
            throw "Description is null or not defined."
        }
    }


    //This method adds record to tasks
    this.Add = function(record)
    {      
        //Assign an ID 
        record.Id = guid();

        this.CheckRecord(record);
        this.taskArray.push(record);
    }

    //This method returns the number of records in system
    this.GetRecordCount = function()
    {
        return this.taskArray.length;
    }

    //This method finds a record by a recordID.
    this.GetIndexOfRecord = function(strRecordID){
        var result = null;
        var i=0; 
        for(i=0;  i<this.taskArray.length;  i++){
            var currentRecord = this.taskArray[i];
            if(currentRecord.Id == strRecordID){
                result = i;
            }
        }

        return result;
    }

    //This method removes a record from the tasks model
    this.Delete = function(strRecordID)
    {
        var recordIndex = this.GetIndexOfRecord(strRecordID);
        if(recordIndex != null){
            this.taskArray.splice(recordIndex,1);
        }

    }

    //This method returns a particular record specified by recordID
    this.GetRecord = function(strRecordID){
        var result = null;

        var recordIndex = this.GetIndexOfRecord(strRecordID);
        if(recordIndex != null){
            result = this.CloneRecord(this.taskArray[recordIndex]);
        }

        return result;
    }

    //This method returns all records in the system
    this.GetAll = function()
    {
        return this.taskArray;
    }

    //This method changes a particular record ...
    this.Update = function(record){

        this.CheckRecord(record);

        var result = null;
        var recordIndex = this.GetIndexOfRecord(record.Id);
        if(recordIndex != null){
            this.taskArray[recordIndex] = record;
        }
    }

    //This method creates a copy of a task.
    this.CloneRecord = function(task){
    
        var record = {};

        record.Id = task.Id;
        record.Description = task.Description;
        record.Priority = task.Priority;

        return record;

    }

	this.SaveTableInLocalStorage = function()
	{
		var serializedArr = JSON.stringify( this.taskArray );
		localStorage.setItem('tasks', serializedArr);
	}

	this.LoadTableFromLocalStorage = function()
	{	
		this.taskArray = localStorage.getItem('tasks');
		this.taskArray = JSON.parse(this.taskArray);
	}



		


}
