---
layout: blog
title: database modelling and ERDs
date: 2019-04-23 12:26 +0300
categories: Developer
published: false
author: 
blog-image: 
intro: 
---
Database modelling, the process through where the database requirements of a software are defined and anylyzed
Also referred to as an ER- diagram.
A graphical represantation of interelated things of interest in a specific domain.
In software engineering it refers to the things(entities) a software needs to remember to fully perfom a business processes.

ER diagrams are related to data structure diagrams (DSDs), which focus on the relationships of elements within entities instead of relationships between entities themselves.

There are a number of notations used to ER modeling.
1. [Bachman](https://en.wikipedia.org/wiki/Data_structure_diagram#Bachman_diagram).
2. Chen notation style
3. Crow’s Foot/Martin/Information Engineering style.
4. IDEF1X style.
5. Barker style

There are three basic components of an ER diagram:

1. **Entities**: Objects or concepts that have data stored about them.
2. **Attributes**: Properties or characteristics of entities.
3. **Relationship**: The relationship between the entities.

## Symbols and notation.

### Entity symbols
1. *Strong entity*
![](https://i.imgur.com/578f2Q2.png)

    
These shapes are independent from other entities, and are often called parent entities, since they will often have weak entities that depend on them. They will also have a primary key, distinguishing each occurrence of the entity.
   
2. *Weak entity*
![](https://i.imgur.com/iVLO5tL.png)


Weak entities depend on some other entity type. They don't have primary keys, and have no meaning in the diagram without their parent entity.

3. *Associative entity*
![](https://i.imgur.com/5ooxuk1.png)



Associative entities relate the instances of several entity types. They also contain attributes specific to the relationship between those entity instances.

### Attributes symbols
![](https://i.imgur.com/kOu9glB.png)



### Cardinality and ordinality.
Cardinality refers to the maximum number of times an instance in one entity can relate to instances of another entity.
Ordinality, on the other hand, is the minimum number of times an instance in one entity can be associated with an instance in the related entity.

The arrow head point to the parent.
The arrow tail shows cardinality/ordinality
![](https://i.imgur.com/1nrhrqX.png)

