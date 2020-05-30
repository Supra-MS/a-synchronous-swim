(function () {

  const serverUrl = 'http://127.0.0.1:3000';
  const Jimp = require("jimp")
  //
  // TODO: build the swim command fetcher here
  //

  const ajaxFetchSwimCommand = () => {
    console.log('inside ajax fetch swim comm');
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
        console.log('Success: ', data);
        SwimTeam.move(data);

        //  setTimeout( () => {
        //     ajaxFetchSwimCommand();
        //   }, 4000);

      },
      error: (error) => {
        console.log('Fail: ', error);
      }
    });
  };

  $('body').on('keydown', (event) => {
    var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
    console.log(event.key);
    if (arrowPress) {
      console.log('inside ajax click ')
      ajaxFetchSwimCommand();
    }
  });

  // not to use dot
  const ajaxFetchHomePage = () => {
    $.ajax({
      type: 'GET',
      url: `${serverUrl}/index`,

      success: (data) => {
        console.log('Success: ', data);

      }
    });
  };
  ajaxFetchHomePage();




  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {



    Jimp.read("image.jpg", function (err, image) {
      if (err) {
        console.log(err)
      } else {
        image.write("new-image.png")
      }
    })


    console.log('client file ', file);
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: `${serverUrl}/background.jpg`,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function (e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    console.log('file type ', file.type);
    let fType = 'image/jpg'.match(/image\/(jpg|jpeg|png)/);

    if (fType === null) {
      console.log('Not a proper image file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();

