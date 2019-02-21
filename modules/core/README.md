River Core
==========

"River Core" is a minimal set of functions for building *computational graphs*.

Getting started
---------------

`npm i river-core`

API
---

### `createNode(outFields, createInPorts)`

Creates a node with the specified output and input ports. As output ports 
have no logic associated with them, only their names are required.

The function `createInPorts()` takes one argument, `outputs`' which is a 
lookup of functions emitting on the node's output ports, and returns 
functions in a similar structure but for input ports.

Both input and output functions take two arguments:
* `value`, which is the value being sent ot / emitted by the node, and
* `tag`, which identifies the impulse throughout the graph.

#### Example / Typescript

```typescript
import {createNode} from "river-core";
type In = {d_in: number};
type Out = {d_out: number};
const node = createNode<In, Out>(["d_out"], (outputs) => ({
  d_in: (value, tag) => outputs.d_out(value, tag)
}));
```

#### Example / Javascript

```javascript
const core = require("river-core");
const node = createNode(["d_out"], (outputs) => ({
  d_in: (value, tag) => outputs.d_out(value, tag)
}));
```

`connect(outPort, inPort)`
--------------------------

`disconnect(outPort, [inPort])`
-------------------------------
