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
Database modeling, the process through which the data requirements of a software/project are defined and anylysed with the aim of coming up with an actual database model.
Three different levels of data model abstraction can be achieved in the data modeling process. 

1. **Conceptual data model.** A high level description of the project's/software's infomational needs.It specifically describes the entities about which information will be collected and their relationship to one another. Translates into a logical data model.  
2. **Logical data model.** Based off of a conceptual data model. Since logical data models anticipate implementation on a specific computing system, it describes the internal details of physical storage(relational or non-relational). The details include entities(tables), attributes(rows/columns), relationships(keys). Logical data models are technology independent.  
3. **Physical data model.** A database schema. A complete physical data model will include all the database artifacts required to create relationships between tables or to achieve performance goals, such as indexes, constraint definitions, linking tables, partitioned tables or clusters.


## ENTITY RELATIONSHIP DIAGRAM

An Entity relationship diagram is defined as a graphical represantation of interelated things of interest in a specific domain.  
In software engineering it refers to the things(entities) a software needs to remember to fully perfom a business processes.  
An Entity Relationship Diagram(ERD) can be drawn upto the three levels of abstraction.

ER diagrams are related to data structure diagrams (DSDs), which focus on the relationships of elements within entities instead of relationships between entities themselves.

There are three basic components of an ER diagram:

1. **Entities**: definable objects  or concepts about which data stored.
2. **Attributes**: Properties or characteristics of entities.
3. **Relationship**: The relationship between the entities.
4. **Cardinality**: possible number of occurrence in one entity which are associated to the number of occurrences in another.


There are a number of notations used when coming up with an ER diagram.
1. [Bachman](https://en.wikipedia.org/wiki/Data_structure_diagram#Bachman_diagram).
2. [Crow’s Foot/Martin/Information Engineering style](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model#Crow's_foot_notation)
3. [IDEF1X style](https://en.wikipedia.org/wiki/IDEF1X)
4. [Barker style](https://en.wikipedia.org/wiki/Barker%27s_notation)
   
## Symbols and notation.

### Crow's Foot/Martin?information Engineering style

![crow's Foot notation](/assets/images/blog/ERD/Crows-Foot-notation-symbols.png){:.img-responsive .center}



### Entity symbols
1. *Strong entity*
![](https://i.imgur.com/578f2Q2.png)

    
These shapes are independent from other entities, and are often called parent entities, since they will often have weak entities that depend on them. They will also have a primary key, distinguishing each occurrence of the entity.
   
2. *Weak entity*
[](https://i.imgur.com/iVLO5tL.png)


Weak entities depend on some other entity type. They don't have primary keys, and have no meaning in the diagram without their parent entity.

3. *Associative entity*
[](https://i.imgur.com/5ooxuk1.png)
Associative entities relate the instances of several entity types. They also contain attributes specific to the relationship between those entity instances.

### Attributes symbols
![](https://i.imgur.com/kOu9glB.png)



### Cardinality and ordinality.
Cardinality refers to the maximum number of times an instance in one entity can relate to instances of another entity.
Ordinality, on the other hand, is the minimum number of times an instance in one entity can be associated with an instance in the related entity.

The arrow head point to the parent.
The arrow tail shows cardinality/ordinality
![](https://i.imgur.com/1nrhrqX.png)

