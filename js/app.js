$(function () {
  // A model with src of the image and click count number
  let model = {
    cats: [
      {
        catName: 'cat1',
        src: 'image/cat_picture1.jpg',
        count: 0
      },
      {
        catName: 'cat2',
        src: 'image/cat_picture2.jpeg',
        count: 0
      },
      {
        catName: 'cat3',
        src: 'image/cat_picture3.jpeg',
        count: 0
      },
      {
        catName: 'cat4',
        src: 'image/cat_picture4.jpeg',
        count: 0
      },
      {
        catName: 'cat5',
        src: 'image/cat_picture5.jpeg',
        count: 0
      }
    ],
  };

  let octopus = {
    getCats: function () {
      return model.cats;
    },

    init: function () {
      view1.init();
      view2.init();
      view3.init();
    },

    /* With each button, add click event then it
     * show the image view for the image that the button bind
     * to. Set the name and image URL value for the admin area too */
    showCat: function () {
      octopus.getCats().forEach(function (cat, catId) {
        catId+=1;
        $("#button"+catId).click(function() {
          view2.render(cat.count, cat.src, catId);
          $('#catName').val(cat.catName);
          $('#imgUrl').val(cat.src);
        });
      });
    },
    /* Using IIFE to avoid the count variable influence to other count
     * of the image
     */
    clickCounter: function (count, index) {
      $('img').click(function () {
        count = count + 1;

        (function setCount(count, index) {
          model.cats[index].count = count;
          $('#clicks').val(count);
        })(count, index - 1);

        $('.counter').replaceWith(`<span class="counter">${count}</span>`);

      });
    },

    /* Hide admin area by default */
    hideAdminArea: function () {
      $('.adminForm').hide();
    },
    /* Show admin area when user clicks on admin button*/
    showAdminArea: function () {
      $('.adminButton').click(function () {
        octopus.isEnableCancelSaveButtons = true;
        view3.render(octopus.isEnableCancelSaveButtons);
        $('.adminForm').show();
      });
    },
    /* Update value of model when user clicks on save button in admin area*/
    saveCatData: function (index) {
      $('#save').click(index ,function () {
        model.cats[index].catName = $('#catName').val();
        model.cats[index].src = $('#imgUrl').val();
        model.cats[index].count = $('#clicks').val();
        view1.render();
        $('.counter').replaceWith(`<span class="counter">${model.cats[index].count}</span>`);
        $('.clicker').replaceWith(`<img class="clicker" src="${model.cats[index].src}">`);
      //  TODO: need to check issue for click counter
      });
    },
    /* Hide admin area form when user clicks on cancel button in admin area*/
    hideAdminForm: function (idLocation) {
      $(`#${idLocation}`).click(function () {
        octopus.isEnableCancelSaveButtons = false;
        view3.render(octopus.isEnableCancelSaveButtons);
        octopus.hideAdminArea();
      })
    },
  };

  let view1 = {
    imageIndex: 0,
    // Identify in HTML page, the place for the buttons to show
    init: function () {
      this.buttons = $('#buttons');
      this.lengthOfListCat;
      view1.render();
    },
    render: function () {
      let htmlStr = '';
      octopus.getCats().forEach(function (cat, index) {
        index += 1;
        htmlStr += `<button id="button${index}">` + cat.catName + '</button>';
      });
      this.buttons.html(htmlStr);
      this.lengthOfListCat = octopus.getCats().length;
      for (let i = 1; i <= this.lengthOfListCat; i++) {
        $(`#button${i}`).click(function () {
          $('#clicks').val('');
          view3.imageIndex = i - 1;
        });
      }
      octopus.showCat();
    },
  };

  let view2 = {
    // Identify in HTML page the place for cat image to show
    init: function () {
      this.catList = $('#catlist');
    },
    render: function (count, src, index) {
      let htmlStr = '';
      htmlStr += `<div class="cat" id="cat${index}">` +
        '<span class="counter">' + count + '</span>' + ' Clicks' +
        '<br>' + `<img class="clicker" src="${src}">` +
        '</div>';
      $('button').id = 'button' + index;
      this.catList.html(htmlStr);
      octopus.clickCounter(count, index);
    },
  };

  let view3 = {
    // Identify in HTML page the place admin area to display
    imageIndex: 0,
    init: function () {
      this.buttonArea = $('#buttonArea');
      octopus.hideAdminArea();
      octopus.showAdminArea();
    },
    render: function (value) {
      if (value) {
        const htmlStr = '<button id="cancel">' + 'Cancel' + '</button>' +
          '<button id="save">' + 'Save' + '</button>';
        this.buttonArea.html(htmlStr);
        octopus.hideAdminForm('cancel');
        octopus.saveCatData(view3.imageIndex)
      } else {
        this.buttonArea.html('');
      }
    },
  };

  octopus.init();
});
