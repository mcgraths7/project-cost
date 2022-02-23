## Requirements

1. A user should be able to create a project
2. A project should have many tasks
3. A task should have a material cost, a labor cost, and a total cost
4. The project should aggregate all of the costs of each task

## Models

1. Project
  - Title
  - Tasks

2. Task
  - Title
  - Material Cost
  - Labor Cost

## Actions

1. Create a project
2. Create a task within a project
3. List all projects
4. List all tasks within a project
5. Update project
6. Update task
7. Delete project (should delete all associated tasks)
8. Delete task

## Future Improvements

1. Better handling of loading states (there's a little bit of a delay between modal closing and data appearing, 
   due to the fact that I wasn't sure how to hook into the loading state of Apollo's refetch after mutation)
  
2. Add users, so that you can view who made changes last (something like last updated Feb 22, 2022 by Steven)

3. Potentially allow drag and drop reordering of projects and tasks (currently they're populated by updated date on fetch)

4. Hide database credentials behind an environment variable + lambda function - seemed outside the scope of this project so I chose not to

5. Improve accessibility - there are some noticeable accessibility issues, namely some of the colors don't meet the contrast requirement. 

6. Improve fluid design - nothing is broken, but it could use a facelift for mobile users

## Decision Making

1. I chose to use a Hasura database because they're easy to spin up for a proof of concept, and can scale if needed. Setting up a flask or rails server seemed out of scope for the project

2. I chose a few quality of life libraries for the same reason I used a third party database - the focus wasn't on designing a loading spinner or creating my own graphql wrapper. 
  
  I chose @Apollo/client + graphql + isomorphic-fetch because they're more or less feature complete and well supported.

  I chose moment for the same reason - formatting dates is mostly busy work, and I wanted to spend my time elsewhere

  I chose React Modal because it solves a lot of the accessibility issues of modals out of the box, like hiding content that shouldn't be visible to screen readers

  I chose React loader spinner because I didn't feel the need to make my own

3. I prefer small utility classes in css vs full design systems like material because they're often overkill. Adding a bunch of one line classes like "flex column jst-center gap-1" specifies exactly what the styles are doing. 

4. I added some custom react hooks that I've made for other projects - useEventListener and useWindowSize - these are super helpful because you can compose different hooks together (useWindowSize utilizes useEventListener) to build really rich functionality, and they're portable from project to project. I use useWindowSize to determine whether the Create Edit & Delete project buttons are next to or below the title (switch from row to column)

5. I structured it a bit differently than the specification asks for, but I think the functionality is the same. I used the notion of projects and tasks rather than estimates and line items. Additionally, you can add and remove tasks from a project at any time, and it keeps a running total, and lets you know whether it's above or below budget (I added a budget field to the project so you can specify)


## UX & Testing

1. I asked a few friends (one developer and two non developers) for feedback on usability and asked them to try to break things. They pointed out a number of edge cases that I might not have caught otherwise. Examples:

  a. I didn't have anything stopping someone from entering negative numbers or very large numbers in the cost.
  b. I didn't have anything stopping someone from making an absurdly long title for an item which would push everything to the right
  c. In an early version, I didn't have anything stopping people from pressing multiple buttons at once
  d. My color choices initially were less than ideal. They were a little too saturated. I made the colors a bit paler and I think it looks a lot better because of that

## Design

1. I think for a utilitarian application like this one, the design isn't offensive. Everything is neat (as far as I can tell), but nothing groundbreaking. 

## Code Quality

1. I used Create React App's eslint defaults which were good enough, but in larger projects where there are more things going on, I would normally customize it. I generally use this eslint config: https://github.com/wesbos/eslint-config-wesbos

