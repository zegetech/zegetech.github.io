---
layout: blog
title: database modeling and ERDs
date: 2019-04-23 12:26 +0300
categories: Developer
published: false
author: 
blog-image: ERD/blog-image2.jpg
intro: 
---

![database modeling](/assets/images/blog/{{page.blog-image}}){:.img-responsive .center}
{{page.intro}}
Database modeling is the process through which the data requirements of a software/project are defined and anylysed with the aim of coming up with an actual database model.
Three different levels of data model abstraction can be achieved in the data modeling process, namely: 

1. **Conceptual data model.** A high level description of the project's/software's infomational needs.It specifically describes the entities about which information will be collected and their relationship to one another. Translates into a logical data model.  
2. **Logical data model.** Based off of a conceptual data model. Since logical data models anticipate implementation on a specific computing system, it describes the internal details of physical storage(relational or non-relational). The details include entities(tables), attributes(rows/columns), relationships(keys). Logical data models are technology independent.  
3. **Physical data model.** A database schema. A complete physical data model will include all the database artifacts required to create relationships between tables or to achieve performance goals, such as indexes, constraint definitions, linking tables, partitioned tables or clusters.

An ERD(Entity Relationship diagram) can be used to illustrate the three levels of abstraction. It is a graphical represantation of interelated things of interest in a specific domain.  
In software engineering it refers to the things(entities) a software needs to remember to fully perfom a business processes.  

ER diagrams are related to data structure diagrams (DSDs), which focus on the relationships of elements within entities instead of relationships between entities themselves.

There are three basic components of an ER diagram:

1. **Entities**: definable objects  or concepts about which data stored.
2. **Attributes**: Properties or characteristics of entities.
3. **Relationship**: The relationship between the entities.
4. **Cardinality**: possible number of occurrence in one entity which are associated to the number of occurrences in another.


There are a number of symbols and are notations used when coming up with an ER diagram.
1. [Bachman](https://en.wikipedia.org/wiki/Data_structure_diagram#Bachman_diagram).
2. [Crow’s Foot/Martin/Information Engineering style](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model#Crow's_foot_notation)
3. [IDEF1X style](https://en.wikipedia.org/wiki/IDEF1X)
4. [Barker style](https://en.wikipedia.org/wiki/Barker%27s_notation)

The most popular one of these symbols and notation styles is the **Crow's Foot/Martin information Engineering style**

### Crow's Foot/Martin information Engineering style.

![crow's Foot notation](/assets/images/blog/ERD/Crows-Foot-notation-symbols.png){:.img-responsive .center}

## Tools

Some tools that can be used to develop ERDs are:

1. [dbdiagram.io](https://dbdiagram.io/home)
2. [Draw.io](https://www.draw.io/)
3. [Lucidchart](https://www.lucidchart.com)
4. [QuickDBD](https://www.quickdatabasediagrams.com/)
5. [SQLDBM](https://sqldbm.com/Home/)