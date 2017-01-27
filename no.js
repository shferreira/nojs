$(function()
{
  $.fn.nojs = function()
  {
    caller = $(this);

    // Read attributes
    source = caller.attr("data-source");
    layout_url = caller.attr("data-layout-url");
    target = $(caller.attr("data-target"));
    layout = $(caller.attr("data-layout")).html();
    method = caller.attr('method') || "GET";

    // Execute, if applicable
    if (source)
    {
      event.preventDefault();
      // Fetch the source with AJAX
      caller.trigger('before_fetch', source);
      $.ajax({ url: source, data: caller.serialize(), type: method }).success(function(data)
      {
        caller.trigger('after_fetch', data);
        if (target)
        {
          target.trigger('before_fill', data);
          // Fill the target
          if (layout)
          {
            // Apply the data to the layout
            target.nojs_fill(layout, data);
          }
          else if (layout_url)
          {
            // Fetch the layout using AJAX
            $.get(layout_url, function(layout)
            {
              // Apply the data to the layout
              target.nojs_fill(layout, data);
            });
          }
          else
          {
            // Just throw the data into the target
            target.html(data);
          }
          target.trigger('after_fill', data);
          caller.trigger('after_fill', data, target);
        }
      });
    }
    else if (target && layout)
    {
      target.trigger('before_fill', {});
      target.html(layout);
      target.trigger('after_fill', {});
    }
  }

  // Templating.
  $.fn.nojs_fill = function(layout, data)
  {
    var result = "";
    for (var item in data instanceof Array ? data : [data])
    {
      var partial = layout;
      for(var attribute in data[item])
      {
        partial = partial.replace(new RegExp('{{'+attribute+'}}','g'), data[item][attribute]);
      }
      result += partial;
    }

    $(this).html(result);
  }

  // Apply it to all links
  $("a").live('click', function()
  {
    $(this).nojs();
  });

  // And to all forms
  $("form").live('submit', function()
  {
    $(this).nojs();
  });
});
