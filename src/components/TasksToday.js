let list = [
{"id":1,"task":"a","deadline":"Anytime","isDone":false},

{"id":2,"task":"s","deadline":"2021-09-09","isDone":false},

{"id":3,"task":"c","deadline":"Anytime","isDone":false},

{"id":4,"task":"v","deadline":"Anytime","isDone":false},

{"id":5,"task":"abcd","deadline":"2021-09-21","isDone":false,"startTime":"","endTime":""},
{"id":6,"task":"s2","deadline":"2021-09-09","isDone":false},
]


function compare( a, b ) {

    if ( a.deadline < b.deadline ){
      return -1;
    }
    if ( a.deadline > b.deadline ){
      return 1;
    }
    return 0; 

}

list.sort( compare );

let listGroups = {};

list.forEach(item => {
  let group = listGroups[item.deadline];
  if(group){
    group.push(item);
  }
  else {
    listGroups[item.deadline] = [item];
  }
})
