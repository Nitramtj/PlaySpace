# PlaySpace Architecture
This document is the second attempt to document what PlaySpace is.
## Motivation
PlaySpace is motivated by the desire to have a persistent environment where applications can run and
## Goals
This section attempts to explain the goals of this platform, without explaining how to achieve them.

* Replace, or unload/load pieces of runtime in a stateful environment
* Network this environment across useragents
  * State
  * Application code
* Long running. New devices should not need a long history of the previous state

These goals can be implemented in different ways and different layers. At first only a programmable interface is needed. Ideally though, the concepts are accomplished in a language agnostic and platform independent way. This basically means forming a protocol for state and application logic to be shared.

## Requirements
This section attempts to be more specific on what each goal should allow. It should not specify specifics of the implementation, but can define restrictions and characteristics. Notice how these tasks don't necessarily mention state.

### Replace, or unload/load pieces of runtime in a stateful environment
In order to swap pieces of the runtime, what pieces are must be defined, how to swap them out, and how to reload state between an old and new piece.

A piece definition should include what the piece is in source code semantics, along with runtime state, and interactions with external systems (or other pieces).

A state system along with a possible event or state transfer system is nice, because it separates how the piece interacts with other code at runtime. This means it is easier to swap the piece in and out, as interactions are part of another system that the application as a whole is built around. Understanding the language semantics that make up a piece is also useful, as it is a good first step for understanding what the piece is. Is it a class, or a function for instance. Replacing language semantics can also be easy. For instance, changing methods on a class can be done by modifying the class' prototype.

Ideally, whichever way a user defines a piece, PlaySpace can automatically hot swap it without the developer understanding the process.

As an aside, an interesting way to think about pieces, is to think of them as state themselves. A piece at compile time is simply the initial state of the piece when the application runs. This state might be mutated as the application runs, and other pieces might rely on the state having certain modifications. Hot swapping by simple replacement is just the current to a new initial state. The rest of the application still expects the old state mutations to still apply though, so the complex part of hot swapping is restoring those mutations.

Old bullet points:
* Resources of the old code should be cleaned
* Parts of the application relying on the old code must be able to detach OR the new application must be able to
* The unloaded part of the application should be able to detach itself from other parts of the application.
* Other parts of the application should be able to respond to the new code being deployed.
