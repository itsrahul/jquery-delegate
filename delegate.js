class Delegate
{
  constructor(details)
  {
    this.containerElement = details.containerElement;
    this.buttonElement = details.buttonElement;
    this.itemDiv = details.itemDiv;
    this.highlight = details.highlight;
    this.count = details.count;
  }
  implement()
  {
    this.buttonElement.appendTo(this.containerElement);
    this.buttonElement.on("click", () => this.addDivItem());
  }

  addDivItem()
  {
    let divText = `New Div Item: ${this.count++}`;
    let item = this.itemDiv
      .clone()
      .text(divText)
      .on("click", () => this.onClickItem());
    this.buttonElement.after(item);
  }

  onClickItem()
  {
    let clickedItem = event.target;
    if(this.containerElement.children("div")[0] == clickedItem)
    {
      clickedItem.remove();
      this.count--;
    }
    else
    {
      $(clickedItem)
        .addClass(this.highlight)
        .siblings().removeClass(this.highlight);
    }
  }
}

$(document).ready(function() {
  let details  = {
    containerElement: $('#container'),
    buttonElement: $('<button>').text('add'),
    itemDiv:  $('<div>').addClass("item"),
    highlight: 'highlight',
    count: 1,
  };
  
  let stack = new Delegate(details);
  stack.implement();
});