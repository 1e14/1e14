River-Stdlib
============

"River Stdlib" implements a standard set of commonly used River nodes.

Nodes
-----

River Core introduces the following nodes.

* `Buffer` / `createBuffer()`: Buffers and releases values.
* `ChangeDetector` / `createChangeDetector()`: Detects changes in value between impulses.
* `ChangeFilter` / `createChangeFilter()`: Forwards values that are different than the 
previous.
* `Comparer` / `createComparer()`: Tests equality between two values.
* `Delayer` / `createDelayer()`: Forwards values with a delay.
* `Demuxer` / `createDemuxer()`: Demultiplexes values.
* `Diverter` / `createDiverter()`: Diverts input value to one of many output ports.
* `Filter` / `createFilter()`: Forwards value only when it satisfies a tester 
function. 
* `Folder` / `createFolder()`: Folds (reduces) bursts of values according to a 
reducer 
function.
* `Gate` / `createGate()`: Forwards value only when open.
* `Joiner` / `createJoiner()`: Joins values from different input ports that have the 
same 
tag.
* `Mapper` / `createMapper()`: Maps values according to a mapper function.
* `Merger` / `createMerger()`: Merges values from different input ports reactively.
* `Muxer` / `createMuxer()`: Multiplexes values.
* `Sampler` / `createSampler()`: Forwards last input value on signal.
* `Serializer` / `createSerializer()`: Forwards values in an order set by a reference 
input.
* `Shifter` / `createShifter()`: Forwards last input value.
* `Unfolder` / `createUnfolder()`: Unfolds values. Opposite of `Folder`.

Types
-----

River Core introduces the following types.

* `Muxed`: Describes a multiplexed input. Bundles port name with value.
