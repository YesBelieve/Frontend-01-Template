# 每周总结可以写在这里

#### JS中的特殊对象

###### Immutable prototype object
+ methods
    - \[\[SetPrototypeOf]](V)
    - SetImmutablePrototype(O, V)

###### Arguments object
+ methods
    - \[\[GetOwnPrototype]](P)
    - \[\[DefinedOwnProperty]](P, Desc)
    - \[\[Get]](P. Receiver)
    - \[\[Set]](P, V, Receiver)
    - \[\[Delete]](P)
    - \[\[IsAccessorDescriptor]](Desc)

+ property
    - \[\[ParameterMap]]
    - \[\[Class]]

###### String object
+ methods
    - \[\[GetOwnProperty]](P)
    - \[\[DefinedOwnProperty]](P, Desc)
    - \[\[StringCreate]](value, proptotype)
    - \[\[StringGetOwnProperty]](S, P)
+ properties
    - \[\[Class]]
    - \[\[Extensible]]
    - \[\[length]]

###### Function object
+ methods
    - \[\[call]](thisArgument, argumentsList)
    - \[\[Construct]](argumentsList, newTarget)
    - \[\[BoundFunctionCreate]](targetFunction, boundThis, boundArgs)
+ properties
    - \[\[length]]
    - \[\[class]]
    - \[\[BoundThis]]
    - \[\[BoundArguments]]

###### Array Exotic Objects
+ methods
    - \[\[DefineOwnProperty]] ( P, Desc )
    - \[\[ArrayCreate]] ( length [ , proto ] )
    - \[\[ArraySpeciesCreate]] ( originalArray, length )
    - \[\[ArraySetLength]] ( A, Desc )

###### Module Namespece

+ methods
    - \[\[Get]](P, Recevier)
    - \[\[Set]](P, V, Receiver)
    - \[\[ModuleNamespaceCreate]](module, exports)
    - \[\[IsExtensions]]()
    - \[\[HasProperty]](P)
    - \[\[Delete]](P)
    - \[\[OwnPropertyKeys]]()
    - \[\[SetPrototypeOf]](V)
+ properties
    - \[\[Module]]
    - \[\[Exports]]