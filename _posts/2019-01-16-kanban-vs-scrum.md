---
layout: blog
title: Kanban Vs Scrum
categories: developer
author: Melvin Atieno
blog-image: kanban-vs-scrum/collaboration.jpg
intro: The management method used in a product development process is crucial for the general success of the product development process. The right approach will always lead to the timely delivery of a high-value product. There are a number of different frameworks that can be used for the development of different products. This means that the type of product determines the approach. This post sheds light on two of the main Agile frameworks. This time we are all making an informed choice.
# published: false
---
{:.post-figure}
![post image](/assets/images/blog/{{page.blog-image}}){:class="img-responsive center"}

{{page.intro}}

Software development is the process of conceiving, specifying, designing, programming, documenting, testing, and bug fixing involved in creating and maintaining applications, frameworks, or other software components.
Different development teams/individuals approach the software development process differently. The most common methodologies are;

1. Waterfall. A linear, more traditional approach to the software development process.
2. Agile. A more flexible, newer approach to the software development process. An approach based on the simple truth that requirements and solutions evolve through the collaborative efforts of a team.

In this post, as indicated in the title, we will focus on two popular frameworks that can be applied in the Agile development methodology to manage workflow.
Scrum and Kanban.
It important to note that these frameworks are not definitive methods, techniques or processes. Rather, they are frameworks that provide a base onto which various techniques and processes can be applied.  
<!-- body -->
# Scrum.

A design in which teams break their work into actions that can be completed within timeboxed iterations called **sprints**, no longer than a month and most commonly two weeks.
Scrum revolves around three main components.

1. Scrum Teams and their associated roles.
2. Events.
3. Scrum Artifacts.

## Scrum Team

The scrum team is made up of The Product Owner, The Development Team, and a Scrum Master.

**The product owner** as the name suggests, is the owner of the product. The product owner is responsible for describing the intended product and/or outlining expected tasks in the backlog.
![kanban board](/assets/images/blog/kanban-vs-scrum/product-owner.jpg){:class="img-responsive center"}

**The development team** is just that, the team that develops the product. The programmers. Their objective is to complete requested tasks, achieve the sprint goals and ultimately the product goal.

**The Scrum master** is in charge of the product development process as a whole. He/she ensures that everyone in the scrum team understands Scrum theory, practices, rules, and values. The Scrum master also facilitates the scrum [events](Scrum Events)

## Scrum Events.

All scrum events are time-boxed, in that once an event begins, the time is fixed. It cannot be shortened or lengthened.

**Sprint**  
The heart of Scrum is a sprint. A fixed duration during which a "Done", useable, and potentially releasable product Increment is created. Sprints have consistent durations throughout the development process. Sprints are made up of a number of Scrum events:

1. *Sprint Planning*. This involves a meeting in which the Scrum team will highlight the work to be done during the sprint. Sprint planning is time-boxed to a maximum of  8hours for a one month sprint. The topics will focus on, what can be done, how it will be done and ultimately the end goal.
2. *Daily Scrums*.  Also referred to as daily stand-ups.Daily Scrums are time-boxed at 15 mins and done every day of the sprint by the development team. During this period the team plans for work to be done in the next 24 hours. It is during this session, the team also tackles any impediments/blockers that might hinder the team from meeting the sprint goal.
3. *The development work*. This is the actual development work. The time when the development team completes individual tasks that are aimed at achieving the sprint goals.
4. *The Sprint Review*.During the Sprint Review, the Scrum team and stakeholders collaborate about what was done in the Sprint. They inspect what has been achieved and adapt the backlog if needed. Sprint review is tTime-boxed at 4hours for a one-month sprint and shorter for shorter sprints.
5. *Sprint Retrospective*. A time during which the Scrum team inspects itself and creates a plan for improvements to be enacted during the next Sprint. Time-boxed at 3hours for a one-month sprint.

## Scrum Artifacts

Scrum’s representation of the work or value that provide transparency and opportunities for inspection and change recommendation. This will include the product backlog(list of tasks to be completed for the final product), a sprint backlog(list of tasks to be completed for each sprint), an Increment  (the sum of all the Product Backlog items completed during a Sprint).

## Advantages

1. Time-boxing saves on time and costs.
2. Increases team accountability.

## Disadvantages

1. Requires an experienced and committed team.
2. Changes cannot be made mid-sprint. Thus less flexible compared to kanban.

# Kanban

Kanban is an Agile framework that focuses on balancing tasks demands with available capacity. Kanban revolves around the idea that problems should be tackled by starting with what one understands and moving on from there.
Kanban is based but not limited to the following principles.

1. **visualization**  
    An informative board usually referred to as a kanban board created to give an informative description of the available tasks and show their relationship to each other.
    Here's an example of a kanban board.
    ![kanban board](/assets/images/blog/kanban-vs-scrum/kanban.png){:class="img-responsive center"}
    The tasks progress through the board from the backlog section to the done section. A task is considered done only when it has been tested.

2. **Limited amount of Work-In-Progress(WIP)**    
   The idea here is to only commit to a new task once an existing task is completed and well in the done section. 

3. **Flow**  
   At the core of Kanban is the concept of “Flow”. This means that the tasks should flow through the system as evenly as possible, without long waiting times or blockages. Everything that hinders the flow should be critically examined.

## Advantages

   1. Timeboxed iterations are optional.
   2. It is event-driven.
   3. New items can be added whenever capacity is available.
   4. The direct limiting of the amount of work in progress forces teams to focus their energy on completing one piece of the puzzle at a time.
   5. Relatively flexible as compared to the scrum as changes can be requested at any point as the task is progressed through the different sections of the board.
   6. No definitive role. The team members are thus free to suggest feature and changes to the end product.

## Disadvantages

   1. Since timeboxed iterations are optional, if not implemented, tasks can drag on for too long.

## Tools

There is an obscene number of tools that can be used to make the workflow management with both Scrum and kanban frameworks more efficient. While these tools generally cut across both frameworks there are those that, in my opinion, are more inclined to a specific framework. I will categorize them as such.
For Scrum there is [Jira](https://www.atlassian.com/software/jira), [Targetprocess](https://www.targetprocess.com/), [Planbox](https://www.planbox.com/), [Pivotal tracker](https://www.pivotaltracker.com/)[Vivify Scrum](https://www.vivifyscrum.com/), and  [clickup](https://clickup.com/), 
While those that are more inclined to the kanban include [LeanKit](https://leankit.com/), [Asana](https://app.asana.com/), and [Trello](https://trello.com/)


