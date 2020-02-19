class TaskInput extends React.Component {
  state = {
    value: ""
  };

  handleInputValue = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleClearAfterAdd = () => {
    // console.log("w clear");
    this.setState({
      value: ""
    });
  };
  render() {
    return (
      <div>
        <label>
          Wpisz zadanie:{` `}
          <input
            placeholder={"Task..."}
            onChange={this.handleInputValue}
            type="text"
            value={this.state.value}
          ></input>
        </label>
        <button
          onClick={() => {
            this.props.handleAddTask(this.state.value);
            this.handleClearAfterAdd();
          }}
        >
          Dodaj
        </button>
      </div>
    );
  }
}
