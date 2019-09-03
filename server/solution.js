

var Solution = function() {
  var Heap = require('mnemonist/heap');
  var heap = new Heap();
  heap.push({priority:1, task: 'grace'})
  heap.push({priority: 2, task:' yu'})

  console.log('heap peek:', heep.peek().task);

}


Solution.prototype.one = function() {
  console.log('I am one')
}

Solution.prototype.two = function() {
  console.log('I am two')
}

exports.solution = new Solution();
