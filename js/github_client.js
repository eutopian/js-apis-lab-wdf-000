//define functions here
var createGist = function(file_name, content, description, token){
  var data = {
    "description": description,
    "public": true,
    "files": {}
  }
  data['files'][file_name] = {
    'content': content
  };

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    console.log(response)
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  var url = 'https://api.github.com/users/' + username
  $.ajax({
    url: url + '/gists',
    type: 'GET',
    dataType: 'json'
  }).done(function(gists){

    $.each(gists, function(index, gist) {

      var link = $('<a>')
        .attr('href', gist.html_url)
        .text(gist.description);
        
      var listItem = $('<li>')
        .append(link);

      $('#myGists').append(listItem);
    })
  })
};

var bindCreateButton = function() {
  // call functions here
  $('#create').click(function(){
    var token = $('#token').val();
    var file_name = $('#file_name').val();
    var content = $('#content').val();
    var description = $('#description').val();
    createGist(file_name, content, description, token)
  })
};

$(document).ready(function(){
	bindCreateButton()
});