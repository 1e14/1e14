1e14
====

**1e14 == 100000000000000 == one hundred trillion = approx. number of synapses 
in the human brain**

1e14 is a minimal set of functions for building *function graphs*.

Getting started
---------------

`npm i 1e14`

API
---

The 1e14 core API consists of three functions:

* `createNode(outFields, createInPorts)`
* `connect(outPort, inPort)`
* `disconnect(outPort[, inPort])`

### `createNode(outFields, createInPorts)`

Creates a node with the specified output and input ports. As output ports 
have no logic associated with them, only their names are required.

The function `createInPorts()` takes one argument, `outputs`' which is a 
lookup of functions emitting on the node's output ports, and returns 
functions in a similar structure but for input ports.

Both input and output functions take two arguments:
* `value`, which is the value being sent ot / emitted by the node, and
* `tag`, which identifies the impulse throughout the graph.

`createNode()` returns a `Node` object, with at least two properties:
* `i`, a collection of functions that serve as the node's input ports
* `o`, a collection of structures that serve as output ports (the specifics 
of these structures are not relevant to their usage)

#### Example / TypeScript

```typescript
import {createNode} from "1e14";
type In = {d_in: number};
type Out = {d_out: number};
const node = createNode<In, Out>(["d_out"], (outputs) => ({
  d_in: (value, tag) => outputs.d_out(value, tag)
}));
```

#### Example / ES6

```javascript
const core = require("1e14");
const node = core.createNode(["d_out"], (outputs) => ({
  d_in: (value, tag) => outputs.d_out(value, tag)
}));
```

### `connect(outPort, inPort)`

Connects an output port to an input port. After a connection is made, when a 
node emits a value on one of its connected output ports, that value will be 
used to invoke all connected input ports.

It's worth noting that input ports are simply functions, and therefore it's 
possible to 'connect' an output port to a function, eg. `console.log`. 

#### Example / TypeScript

```typescript
import {connect} from "1e14";
// initializing node1 & node2 
connect(node1.o.d_out, node2.i.d_in);
```

#### Example / ES6

```javascript
const core = require("1e14");
// initializing node1 & node2 
core.connect(node1.o.d_out, node2.i.d_in);
```

### `disconnect(outPort[, inPort])`

Disconnects an input port from an output port, or, disconnect all input ports
from an output port.

#### Example / TypeScript

```typescript
import {disconnect} from "1e14";
// initializing & connecting node1 & node2 
disconnect(node1.o.d_out, node2.i.d_in);
disconnect(node1.o.d_out);
```

#### Example / ES6

```javascript
const core = require("1e14");
// initializing & connecting node1 & node2 
core.disconnect(node1.o.d_out, node2.i.d_in);
core.disconnect(node1.o.d_out);
```

### Types

1e14 exports the following types:

* `Any`: Lookup with string keys
* `InPort`: Describes an input port
* `InPorts`: Describes a set of input ports. Usually corresponds to the `i` 
property of nodes.
* `Node<In, Out>`: Describes a node, where `In` and `Out` describe the value 
type carried by each input and output port, respectively.
* `OutPort`: Describes an output port
* `OutPorts`: Describes a set of input ports. Usually corresponds to the `o` 
property of nodes.
* `Outputs`: Describes a set of functions that invoke connected input ports.
* `Tag`: Identifies *impulses*. (In turn, an impulse is an identifiable input
 that ripples through multiple nodes throughout the graph.)

Custom nodes
------------

In practice, `createNode()` is not invoked directly, as one would have to 
supply types (for TypeScript), output port names, and the function 
`createInPorts()` on each call. Instead, `createNode()` usually gets wrapped 
inside an outer factory function which has these already bundled.

The example below will produce the same node as the ones above, in a reusable
way. For those coming from an OOP background, this would be analogous to 
subclassing.

#### Example / TypeScript

```typescript
import {createNode, Node} from "1e14";
type In = {d_in: number};
type Out = {d_out: number};
type Forwarder<V> = Node<In, Out>
function createForwarder<V>(): Node {
    return createNode<In, Out>(["d_out"], (outputs) => ({
      d_in: (value, tag) => outputs.d_out(value, tag)
    }));
}
```

#### Example / ES6

```javascript
const core = require("1e14");
function createForwarder() {
    return createNode(["d_out"], (outputs) => ({
      d_in: (value, tag) => outputs.d_out(value, tag)
    }));
}
```

Composite nodes
---------------

One of the most useful features of computational graphs is their 
composability. A number of interconnected nodes may act as as a single node 
themselves, making it easier to compartmentalize functionality, as well as 
reason about different parts of the application.

Implementing a composite node is quite simple with a factory function, which 
will create multiple nodes, establish internal connections, and expose
specific ports of its components as its own.

#### Example / TypeScript

```typescript
import {connect, Node} from "1e14";
type In = {d_in: number};
type Out = {d_out: number};
type Composite = Node<In, Out>;
function createComposite<In, Out>(): Composite {
    const forwarder1 = createForwarder();
    const forwarder2 = createForwarder();
    connect(forwarder1.o.d_out, forwarder2.i.d_in);
    return {
        i: {d_in: forwarder1.i.d_in},
        o: {d_out: forwarder2.o.d_out}
    };
}
``` 

#### Example / ES6

```javascript
const core = require("1e14");
function createComposite() {
    const forwarder1 = createForwarder();
    const forwarder2 = createForwarder();
    connect(forwarder1.o.d_out, forwarder2.i.d_in);
    return {
        i: {d_in: forwarder1.i.d_in},
        o: {d_out: forwarder2.o.d_out}
    };
}
``` 
