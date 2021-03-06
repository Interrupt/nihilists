/* NihiList application logic. */

var listKey = "nihilists";

function getStoredList(callback) {
  chrome.storage.sync.get(['list','something'], function(items) {
    console.log("Got list!");
    if(items.list != null)
      callback(items.list, items.something);
    else
      callback([]);
  });
}

function storeList(list) {
  chrome.storage.sync.set({'list': list}, function() {
    console.log("Synced!");
  });
}

function storeSomething(something) {
  chrome.storage.sync.set({'something': something}, function() {
    console.log("Synced!");
  });

  // Track this event
  _gaq.push(['_trackEvent', "SomethingToggle", 'toggled']);
}

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
};

var SomethingToggle = React.createClass({
  render: function() {
    return (
      <div className="toggle-area">
        <input type="radio" id="toggle-on" name="toggle" checked={this.state.something} className="toggle toggle-left" onChange={this.changeSelection.bind(this, true)} />
        <label htmlFor="toggle-on" className="toggle">Something</label>
        <div className="toggle-button" onClick={this.toggleSelection}><div className={this.state.something ? 'toggle-button-dot' : 'toggle-button-dot off'}></div></div>
        <input type="radio" id="toggle-off" name="toggle" className="toggle toggle-right" onChange={this.changeSelection.bind(this, false)} checked={!this.state.something} />
        <label htmlFor="toggle-off" className="toggle">Nothing</label>
      </div>
    );
  },
  updateState: function(list, something) {
      this.setState({something: something});
  },
  getInitialState: function () {
    return { something: this.props.defaultChecked };
  },
  changeSelection: function(item, data) {
    this.setState({something: item});
    this.props.onChange(item);
    storeSomething(item);
  },
  toggleSelection: function(e) {
    var selection = !this.state.something;
    this.setState({something: selection});
    this.props.onChange(selection);
    storeSomething(selection);
  },
  onStorageChange: function(changes, namespace) {
    if(namespace == "sync") {
      if(changes.something != null) {
        var newval = changes.something.newValue == true;
        console.log(newval);
        this.setState({something: newval});
        this.props.onChange(newval);
      }
    }
  },
  componentDidMount: function () {
    console.log("Getting saved state.");
    getStoredList(this.updateState);

    console.log("Watching storage...");
    chrome.storage.onChanged.addListener(this.onStorageChange);
  }
});

var NewListForm = React.createClass({
  render: function () {
    return React.createElement('input', { 'className': 'addItem', type: 'text', placeholder: 'Add something...', onKeyDown: this.handleKeyDown });
  },
  handleKeyDown: function (e) {
    // Watch for 'Enter' being pressed.
    if (e.which == 13) {
      if(!this.isEmptyString(e.target.value)) {
        this.props.onNewItem(e.target.value);
      }
      e.target.value = null;
    }
  },
  isEmptyString: function(value) {
    return (value.length === 0 || !value.trim());
  }
});

var ListArea = React.createClass({
  render: function () {

    var items = this.state.items.map((function (item, i) {
      if (!item.done) {
        return (
            <li key={item.key} onClick={this.finishItem.bind(this, i)}>{item.title}</li>
          );
      } else {
        return;
      }
    }).bind(this));

    var cssClass = this.state.something ? "something" : "nothing";

    return (
      this.state.visible ? (
        <div>
          <SomethingToggle defaultChecked={this.state.something} onChange={this.handleSomethingToggle} />
            <div className={cssClass}>
              <div className="listSection section">
                <NewListForm onNewItem={this.makeNewItem} />
                <ul>{items}</ul>
              </div>
              <div className="quoteSection section">
                <QuoteArea />
              </div>
            </div>
        </div>
      ) : null
    );
  },
  handleSomethingToggle: function(something) {
    this.setState({something:something});
  },
  getInitialState: function () {
    var something = localStorage[something];
    if(something == null) something = true;
    console.log("Something: " + something);
    return { items: [], something: something };
  },
  makeNewItem: function (title) {
    console.log("Adding: " + title);

    var list = this.state.items;
    list.unshift({ key: generateUUID(), title: title, done: false });

    this.updateList(list);

    // Track this event
    _gaq.push(['_trackEvent', "List", 'added-item']);
  },
  finishItem: function (key) {
    console.log("Finishing " + key);

    var list = this.state.items;
    list[key].done = true;

    this.updateList(list);

    // Track this event
    _gaq.push(['_trackEvent', "List", 'finished-item']);
  },
  updateList: function (list) {
    this.setState({ items: list });
    storeList(list);
  },
  refreshList: function (list) {
    this.setState({ items: list });
  },
  setInitialState: function(list, something) {
    this.refreshList(list);
    this.handleSomethingToggle(something);
    this.setState({visible:true});
  },
  onStorageChange: function(changes, namespace) {
    if(namespace == "sync") {
      if(changes.list != null) {
        this.refreshList(changes.list.newValue);
      }
    }
  },
  componentDidMount: function () {
    console.log("Getting saved state.");
    getStoredList(this.setInitialState);

    console.log("Watching storage...");
    chrome.storage.onChanged.addListener(this.onStorageChange);
  }
});


ReactDOM.render(<ListArea />, document.getElementById('list-component'));
