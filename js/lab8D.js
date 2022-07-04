class Node{
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}

let linkedList = {
    add: function(value){
        if(this.head === undefined){
            this.head = null;
        }

        let node = new Node(value);
        if(this.head === null){
            this.head = node;
        }else{
            let currentNode = this.head;
            while(currentNode.next !== null){
                currentNode = currentNode.next;
            }
            currentNode.next = node;
        }
    },

    remove: function(value) {

        let currentNode = this.head;
        if (currentNode !== null) {

            //1st element
            if (currentNode.data === value) {
                this.head = currentNode.next;
            } else {
                while (currentNode.next !== null) {
                    if (currentNode.next.data === value) {
                        currentNode.next = currentNode.next.next;
                        break;
                    } else {
                        currentNode = currentNode.next;
                    }
                }
            }
        }
    },

    print: function() {
        let result = 'LinkedList{';

        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.next === null) {
                result += currentNode.data;
            } else {
                result += currentNode.data + ','
            }
            currentNode = currentNode.next;
        }

        result += '}';
        console.log(result);
    }
}

let mylinkedlist = Object.create(linkedList);
mylinkedlist.add(1);
mylinkedlist.add(2);
mylinkedlist.add(3);
mylinkedlist.print(); //in the console, you should see: LinkedList{1,2,3}
mylinkedlist.remove(3);
mylinkedlist.print(); //in the console, you should see: LinkedList{1,3}