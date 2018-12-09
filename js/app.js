$(function () {
  // A model with src of the image and click count number
  let model = {
    cats: [
      {
        src: 'image/cat_picture1.jpg',
        count: 0
      },
      {
        src: 'image/cat_picture2.jpeg',
        count: 0
      },
      {
        src: 'image/cat_picture3.jpeg',
        count: 0
      },
      {
        src: 'image/cat_picture4.jpeg',
        count: 0
      },
      {
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
    },

    /* With each button, add click event then it
     * show the view for the image that the button bind
     * to it */
    showCat: function () {
      octopus.getCats().forEach(function (cat, catId) {
        catId+=1;
        $("#button"+catId).click(function() {
          view2.render(cat.count, cat.src, catId);
        });
      });
    },
    /* Using IFII to avoid the count variable influence to other count
     * of the image
     */
    clickCounter: function (count, index) {
      $('img').click(function () {
        count = count + 1;

        (function setCount(count, index) {
          model.cats[index].count = count;
        })(count, index - 1);

        $('.counter').replaceWith(`<span class="counter">${count}</span>`);
      });
    }

  };

  let view1 = {
    // Identify in HTML page, the place for the buttons to show
    init: function () {
      this.buttons = $('#buttons');
      view1.render();
    },
    render: function () {
      let htmlStr = '';
      octopus.getCats().forEach(function (cat, index) {
        index += 1;
        htmlStr += `<button id="button${index}">` + 'cat' + index + '</button>';
      });
      this.buttons.html(htmlStr);
      octopus.showCat();
    },
  };

  let view2 = {
    // Identify in HTML, page the place for cat image to show
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

  octopus.init();
});
