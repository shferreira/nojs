noJS
====

Declarative JavaScript.

The noJS is a small library built on top of jQuery/zepto.js to easily enable progressive enhacement. It will fetch data, and apply it into a template. It is similar to Pjax but I started writing it before I was aware of it.

It is aimed at very simple apps and prototypes.

## The basics

First, you begin by building regular links and pages:

    <a href="/login.html">Login</a>

Then, you add markup to load only partials:

    <a href="/login.html"
      data-source="/login.partial.html">Login</a>

But that just invokes the URL. You have to send the data somewhere:

    <a href="/login.html"
      data-source="/login.partial.html"
      data-target="#target">Login</a>

    <div id="target"></div>

Sometimes you will be receiveing JSON instead of HTML. You need a template.

    <a href="/login.html"
      data-target="#target"
      data-source="/messages.json"
      data-layout="#template">Login</a>

    <script id="template" type="text/layout">
      {{user}} sent: {{message}}<br>
    </script>

The JSON must be a list, containing a hash of values. This is a valid JSON for the template above:

    [{"user":"shf", "message":"Hello"}, {"name":"Somebody else", "message":"Hi there"}]

The layout can also be served from a remote location:

    <a href="/login.html"
      data-target="#target"
      data-source="/messages.json"
      data-layout-url="/template.html">Login</a>

Since we are using "live" bindings, you can also include declarations inside your templates:

    {{summary}} <br>
    <a href="#"
      data-source="/more/{{id}}"
      data-target="#more_{{id}}">View more</a>
    <div id="more_{{id}}"></div>

## Callbacks

You might want to do stuff before or after fetching data, or before or after filling a target:

    $("#my_link").bind("before_fetch", function() { /* do something */ });
    $("#my_link").bind("after_fetch", function() { /* do something */ });
    $("#my_link").bind("after_fill", function() { /* do something */ });

    $("#my_target").bind("before_fill", function() { /* do something */ });
    $("#my_target").bind("after_fill", function() { /* do something */ });

## TODO

 - Ways to handle error.
 - Templating on source URLs (reading from QueryStrings, from the URL, etc).
 - More flexible templates.
 - Ways of receiving data other than clicking a link:
   - Simple polling with a timer
   - Long polling (Comet)
   - Event Sourcing
   - Websockets
 - Different ways of displaying the content:
   - Modal windows
   - Javascript alerts
   - Rails-style "flash" messages (that go away after a while)
   - Appending/Prepending to a target instead of replacing.
   - Fading the target before showing.
   - Sliding, like GitHub

## Disclaimer

I built this library in less than an hour, for some co-workers who needed a way to rapidly build a prototype using jQuery.

I don't really think that it's the best way to write an app, since it lacks a lot of features, but I sincerely believe that declarative programming is much better, as long as it offers the desired features and is well-documented.

Also, I used to call this library a "Framework" before Backbone.js and such, but today it's clearily a different beast.


## Fast forward to 2014...

It's nice to see more frameworks taking the declarative route, such as AngularJS, KnockoutJS, and even Ansible in a completely different area. I'm a big proponent of using declarative interfaces, DSLs and rule engines instead of imperative languages. Sure, we won't have turing-completeness, but we'll have a sane interface that's easier to parse by multiple consumers, easier to write (and read) by non-programmers and, sometimes, saner and safer operations.
