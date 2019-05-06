---
layout: blog
title: database modelling and ERDs
date: 2019-04-23 12:26 +0300
categories: Developer
published: false
author: Melvin Atieno
blog-image: ERD/blog-image2.jpg
intro: Data is perhaps the most important part of any software system. A database can be defined as a system in which data is stored in an organized format to allow analysis, easy-access, manipulation and, if necessary, augmentation. In order to come up with a database system that meets all the database needs of a system/software developers go through a process commonly referred to as database modelling. This process involves  defining and analysing a system’s data requirements, determining what information is needed and how it will be organized/accessed and ultimately coming up with a visual represention of the intended database for development.
---

![database modelling](/assets/images/blog/{{page.blog-image}}){:.img-responsive .center}

{{page.intro}}

There are two main data modelling techniques used by developers:

1. Entity Relationship Modelling(ERM) which results into Entity Relationship Diagrams(ERDs).
2. Unified Modelling Language(UML) which results into Class diagrams/ UML diagrams.

**ERD**

An ERD(Entity Relationship diagram) is a graphical representation of interrelated things of interest in a specific domain.  
In software engineering, it refers to the things(entities) software needs to remember to fully perform business processes.  

ER diagrams are related to data structure diagrams (DSDs), which focus on the relationships of elements within entities instead of relationships between entities themselves.

There are four basic components of an ER diagram:

1. **Entities**: definable objects or concepts about which data stored.
2. **Attributes**: Properties or characteristics of entities.
3. **Relationship**: The relationship between the entities.
4. **Cardinality**: possible number of occurrence in one entity which is associated with the number of occurrences in another.
   
Three different levels of data model abstraction can be achieved in the data modelling process, namely: 
There are a number of symbols and notations used to represent these components when coming up with an ER diagram.

1. [Bachman](https://en.wikipedia.org/wiki/Data_structure_diagram#Bachman_diagram).
2. [Crow’s Foot/Martin/Information Engineering style](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model#Crow's_foot_notation)
3. [IDEF1X style](https://en.wikipedia.org/wiki/IDEF1X)
4. [Barker style](https://en.wikipedia.org/wiki/Barker%27s_notation)

The most popular and recommended of these symbols and notation styles is the **Crow's Foot/Martin information Engineering style**

### Crow's Foot/Martin information Engineering style.

![crow's Foot notation](/assets/images/blog/ERD/Crows-Foot-notation-symbols.png){:.img-responsive .center}

5. **Conceptual data model.** A high-level description of the project's/software's information needs. It specifically describes the entities about which information will be collected and their relationship to one another. Translates into a logical data model.  
6. **Logical data model.** Based off of a conceptual data model. Since logical data models anticipate implementation on a specific computing system, it describes the internal details of physical storage(relational or non-relational). The details include entities(tables), attributes(rows/columns), relationships(keys). Logical data models are technology independent.  
7. **Physical data model.** A database schema. A complete physical data model will include all the database artefacts required to create relationships between tables or to achieve performance goals, such as indexes, constraint definitions, linking tables, partitioned tables or clusters.




## Tools

Tools that can be used for database modelling include:

1. [dbdiagram.io](https://dbdiagram.io/home)
2. [Draw.io](https://www.draw.io/)
3. [Lucidchart](https://www.lucidchart.com)
4. [QuickDBD](https://www.quickdatabasediagrams.com/)
5. [SQLDBM](https://sqldbm.com/Home/)