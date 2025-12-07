import { defaultTestCode } from "../test-codes";

export const problem = {
  id: 13,
  name: "Build a Queue Using Stack",
  statement:
    "Create a Queue data structure implementation that internally uses only Stack operations. You cannot use arrays or any built-in queue methods.",
  description:
    "While JavaScript arrays provide both stack operations (push/pop) and queue operations (push/shift), this challenge restricts you to using only a Stack class with limited methods. Your task is to implement a fully functional Queue that leverages only stack operations under the hood. Think about how you can use two stacks or clever manipulation of a single stack to achieve FIFO (First In First Out) behavior.",
  difficulty: "medium",
  languages: ["javascript"],
  examples: [
    {
      input: "\n queue.enqueue(1);\n queue.enqueue(2);\n queue.dequeue();",
      output: "1 // First element added is first removed",
    },
    {
      input: "\n queue.enqueue(5);\n queue.peek();",
      output: "5 // Returns front element without removing",
    },
    {
      input: "\n queue.enqueue(10);\n queue.enqueue(20);\n queue.size();",
      output: "2 // Returns total number of elements",
    },
  ],
  sampleInput: "const q = new Queue(); q.enqueue(1); q.enqueue(2); q.dequeue();",
  code: `/**
 * You have access to a Stack class with these methods:
 * - push(element): adds element to top of stack
 * - pop(): removes and returns top element
 * - peek(): returns top element without removing
 * - size(): returns number of elements
 *
 * Note: Arrays are disabled for this exercise
 */

class Stack {
  constructor() {
    this.items = {};
    this.count = 0;
  }

  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.count === 0) return undefined;
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.count === 0) return undefined;
    return this.items[this.count - 1];
  }

  size() {
    return this.count;
  }
}

/**
 * Implement the Queue class using only Stack operations
 */
export default class Queue {
  constructor() {
    // Initialize your internal data structures here
  }

  /**
   * Add element to the back of the queue
   * @param {*} element - element to add
   */
  enqueue(element) {
    // Your code here
  }

  /**
   * Remove and return the front element
   * @return {*} the front element
   */
  dequeue() {
    // Your code here
  }

  /**
   * Return the front element without removing it
   * @return {*} the front element
   */
  peek() {
    // Your code here
  }

  /**
   * Return the number of elements in the queue
   * @return {number} size of queue
   */
  size() {
    // Your code here
  }
}
`,
  solution: `/**
 * Stack implementation (provided)
 */
class Stack {
  constructor() {
    this.items = {};
    this.count = 0;
  }

  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.count === 0) return undefined;
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.count === 0) return undefined;
    return this.items[this.count - 1];
  }

  size() {
    return this.count;
  }
}

/**
 * Queue implementation using two stacks
 * Strategy: Use one stack for enqueue operations and another for dequeue operations
 */
export default class Queue {
  constructor() {
    this.stackIn = new Stack();   // For enqueue operations
    this.stackOut = new Stack();  // For dequeue/peek operations
  }

  enqueue(element) {
    this.stackIn.push(element);
  }

  dequeue() {
    // Transfer elements from stackIn to stackOut if stackOut is empty
    if (this.stackOut.size() === 0) {
      while (this.stackIn.size() > 0) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    return this.stackOut.pop();
  }

  peek() {
    // Transfer elements from stackIn to stackOut if stackOut is empty
    if (this.stackOut.size() === 0) {
      while (this.stackIn.size() > 0) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    return this.stackOut.peek();
  }

  size() {
    return this.stackIn.size() + this.stackOut.size();
  }
}
`,
  testCases: `import Queue from './code';

describe('Queue using Stack', () => {
  test('should enqueue and dequeue elements in FIFO order', () => {
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });

  test('should return correct size', () => {
    const queue = new Queue();
    expect(queue.size()).toBe(0);
    queue.enqueue(10);
    expect(queue.size()).toBe(1);
    queue.enqueue(20);
    queue.enqueue(30);
    expect(queue.size()).toBe(3);
    queue.dequeue();
    expect(queue.size()).toBe(2);
  });

  test('should peek at front element without removing it', () => {
    const queue = new Queue();
    queue.enqueue(100);
    queue.enqueue(200);
    expect(queue.peek()).toBe(100);
    expect(queue.size()).toBe(2); // Size should remain same
    expect(queue.peek()).toBe(100); // Front should still be 100
  });

  test('should handle mixed operations', () => {
    const queue = new Queue();
    queue.enqueue('a');
    queue.enqueue('b');
    expect(queue.dequeue()).toBe('a');
    queue.enqueue('c');
    expect(queue.peek()).toBe('b');
    expect(queue.dequeue()).toBe('b');
    expect(queue.dequeue()).toBe('c');
  });

  test('should handle empty queue operations', () => {
    const queue = new Queue();
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.peek()).toBeUndefined();
    expect(queue.size()).toBe(0);
  });

  test('should handle single element', () => {
    const queue = new Queue();
    queue.enqueue(42);
    expect(queue.peek()).toBe(42);
    expect(queue.size()).toBe(1);
    expect(queue.dequeue()).toBe(42);
    expect(queue.size()).toBe(0);
  });

  test('should handle large number of operations', () => {
    const queue = new Queue();
    const testData = Array.from({ length: 100 }, (_, i) => i);

    testData.forEach(num => queue.enqueue(num));
    expect(queue.size()).toBe(100);

    for (let i = 0; i < 50; i++) {
      expect(queue.dequeue()).toBe(i);
    }
    expect(queue.size()).toBe(50);

    testData.slice(100, 120).forEach(num => queue.enqueue(num));
    expect(queue.size()).toBe(70);
  });
});`,
  testCode: defaultTestCode,
};
