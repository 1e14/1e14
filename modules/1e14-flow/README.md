1e14-flow
=========

Flow control nodes for 1e14.

Nodes
-----

* `Buffer` / `createBuffer()`: Buffers and releases values.
* `Gate` / `createGate()`: Forwards value only when open.
* `Merger` / `createMerger()`: Merges values from different input ports reactively.
* `Splitter` / `createSplitter()`: Splits value from one port to multiple ports.
* `Syncer` / `createSyncer()`: Syncs values from different input ports that 
have the same tag.
