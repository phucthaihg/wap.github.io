class Node{
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
    }

    add(value){
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
    }

    remove(value) {

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
    }

    print() {
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
let linkedlist = new LinkedList();
linkedlist.add(1);
linkedlist.add(2);
linkedlist.add(3);
linkedlist.print(); //in the console, you should see: LinkedList{1,2,3}
linkedlist.remove(3);
linkedlist.print(); //in the console, you should see: LinkedList{1,3}