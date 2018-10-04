Mongo Half Stack App
======

## Directions

This is a **paired** lab.

* Combine a vanilla NodeJS http server with the mongodb drivers to create another REST API
* Pick a 2 "resource" - the entity (or collection in mongo speak) you're saving and getting, like `pirates` and `ships`
* Use the strategy pattern (an object dictionary that has router functions as values) to choose the "router" to use (same as last lab).
* Use the strategy pattern _within_ the router implementation to choose the "method" router to use (plus handle two varieties of get!)
* Implement:
    * `GET /<resource>` - returns array of all of the resources
    * `POST /<resource>` - inserts the supplied request body as a document into the resource collection
    * `GET /<resource>/:id` -
      * returns the single object specified by the id
      * returns 404 not found if no resource found with that id    
    * `DELETE /<resource>/:id` - removes the resource with that id (okay if doesn't exist). 
    * `PUT /<resource>/:id` - updates the resource with supplied request body
* Use plural name in your url path (`/unicorns`, **not** `/unicorn`)

### Architecture and Design

* Use modules and project organization (files). There is now enough complexity that large, overly complicated modules 
will significantly impact your ability to focus on the task at hand. Use the structure we used
in class.

## Testing

* E2E API tests for each resource

## BONUS

* Implement handling the query part of the url in `GET` all as a mongo find query
* Add another resource type
  * SUPER BONUS: Generisize your first route handler into a general purpose
  handler by wrapping in a higher order function that takes a collection name. This is a meta
  exercise for generalizing patterns 

## Rubric

* Server, App, Project Organization: *2pt*
* Data
  * `GET` all: *2pts*
  * `POST`: *2pts*
  * `GET` by id: *2pts*
  * `PUT` by id: *2pts*
  * `DELETE` by id: *2pts*
* Tests
  * setup *3pts*
  * Each method *.5pt* x 10 = *5pts*
