
function getTestRecord()
{
	var task = {};
	task.Description = "A task";
	task.Priority = 1;

	return task;
}


QUnit.test( "make sure we can add task.", function( assert ) {

	var tasks = new TasksModel();
	var task = getTestRecord();
	tasks.Add(task);
	assert.ok(tasks.GetRecordCount() > 0, "record should be added.")
});

QUnit.test( "make sure get tasks works.", function( assert ) {
    var tasks = new TasksModel();
	var task = getTestRecord();
    tasks.Add(task);
	var task2 = getTestRecord();
    tasks.Add(task2);

	var task3 = getTestRecord();
    tasks.Add(task3);
    assert.ok(tasks.GetRecordCount() > 0, "record should be added.")

    var record = tasks.GetRecord(task2.Id);
    assert.ok(record.Description == task2.Description,"get record should work");
});


QUnit.test( "make sure delete tasks works.", function( assert ) {

    var tasks = new TasksModel();

	var task = getTestRecord();
    tasks.Add(task);
    assert.ok(tasks.GetRecordCount() > 0, "record should be added.")
    tasks.Delete(task.Id);
    assert.ok(tasks.GetRecordCount() == 0, "record should be removed.")
    
});

QUnit.test( "make sure get all works.", function( assert ) {

    var tasks = new TasksModel();

    var k=0;

    for(k=0;  k<200; k++)
    {
		var task = getTestRecord();
        tasks.Add(task);
    }

    assert.ok(tasks.GetRecordCount() == 200, "we should have 200 things.");
    assert.ok(tasks.GetAll().length == 200,"array should have 200 things.");

});

QUnit.test( "make sure update works.", function( assert ) {

    var tasks = new TasksModel();

	var task = getTestRecord();
    tasks.Add(task);
    
    var t2 = tasks.GetRecord(task.Id);
    t2.Description = "Foo";
    t2.Priority = 2;
    tasks.Update(t2);

    var t3 = tasks.GetRecord(task.Id);
    assert.ok(t3.Description == t2.Description, "Description should be changed.");
    assert.ok(t3.Priority == t2.Priority, "Priority should be changed.");
    
});

QUnit.test( "make sure task has description.", function( assert ) {
    var tasks = new TasksModel();
	var task = getTestRecord();

    try{
        tasks.Add(task);
		
    }catch(e){
        assert.ok(true,"everything is cool.")
		
    }

    task.Description = null;
    try{
        tasks.Add(task);
		assert.ok(false,"failed.");
    }catch(e){
        assert.ok(true,"everything is cool.")        
    }
       
});



