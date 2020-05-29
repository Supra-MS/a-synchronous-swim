
$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    SwimTeam.move(direction.toLowerCase());
    // SwimTeam.move(ajaxFetchHomePage());
    // ajaxFetchHomePage(direction.toLowerCase());
  }
});

console.log('Client is running in the browser!');





