'use strict';

jQuery(document).ready(function($) {

var str = window.location.pathname;

 var values = getValues();
 var comments = saveComments(values);
 printComments(comments, 0, 5);

  // ### CLICK ###
  var count = 5;
  $('.read-more-comments').on('click', function()
  {
    printComments(comments, 5, 25);
    $('.read-more-comments').remove(); 
  });

  // ### GET VALUES ###
  function getValues()
  {
    var comment = [];
    var dateText = [];
    var dateLink = [];
    var title = [];
    var user = [];
    var arr = {};
    $('.dsq-widget-item').each(function()
    {
      comment.push($('.dsq-widget-comment', this).text());
      dateText.push($('.dsq-widget-meta a:contains("ago")', this).text());
      dateLink.push($('.dsq-widget-meta a:contains("ago")', this).attr('href'));
      title.push($('.dsq-widget-meta a:not(:contains("ago"))', this).text());
      user.push($('.dsq-widget-user', this).text());
    });
    return arr = {comment: comment, dateText: dateText, dateLink: dateLink, title: title, user: user};
  }

  // ### SAVE COMMENTS ###
  function saveComments(arr)
  {
    var saveComments = {};
    for (var i = 0; i < arr.comment[0].length; i++)
    {
      saveComments[i] = '<div class="dsq-widget-item" style="margin-bottom: 5px;"><a href="' + arr.dateLink[i] + '" style="text-decoration: none; text-align: left;"><div class="recent-comment-headline" style="margin-bottom: 2px; font-weight: bold; line-height: 1.2;">' + arr.title[i] + '</div></a><a class="comments-content" href="' + arr.dateLink[i] + '" style="line-height: 1.2; text-align: justify;">' + arr.comment[i] + '</a><div style="font-size: 13px; margin-top: 10px;"><b>' + arr.user[i] + '</b> ' + arr.dateText[i] + ' <span><a href="' + arr.dateLink[i] + '" ></a></span></div></div>';
    }
    return saveComments;
  }

  // ### PRINT COMMENTS ###
  function printComments(arr, n, m)
  {
    var n;
    var m;
    $('.dsq-widget-list').remove();
    for (var i = n; i < m; i++)
    {
      $('.comments-result').append(arr[i]);
    }
  }


});
