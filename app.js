class App extends React.Component {
  state = {
    activeClock: true
  };

  handleSwitchClock = () => {
    this.setState({
      activeClock: !this.state.activeClock
    });
  };
  render() {
    return (
      <>
        <h1>witaj</h1>
        <h2>
          Projetk będzie upiększony o css niebawem, zrobiłem go w celu ćwiczenia
          biblioteki react.{" "}
        </h2>
        <button onClick={this.handleSwitchClock}>
          {this.state.activeClock === true ? "Wyłącz zegar" : "Włącz zegar"}
        </button>
        {this.state.activeClock && <Clock />}
        <ToDoApp />
      </>
    );
  }
}
const ToDoHeader = props => {
  const allTasks = props.taskList.length;
  const DoneTasks = props.taskList.filter(task => task.active === false).length;
  const activeTasks = props.taskList.filter(task => task.active === true)
    .length;
  return (
    <>
      <h1>{`Ilość wszystkich zadań : ${allTasks}`}</h1>
      <h1>{`Ilość zadań zrobionych:${DoneTasks} `}</h1>
      <h1>{`Ilość zadań do zrobienia:${activeTasks} `}</h1>
    </>
  );
};

const ShowWhatIncludes = props => {
  return (
    <>
      {props.task.title}
      <ButtonToDoOrDone
        active={props.task.active}
        id={props.task.id}
        change={props.handleChangeActive}
      />
    </>
  );
};

const TaskList = props => {
  const tasksArray = props.taskList.map(task => (
    <li
      style={{ listStyleType: "none" }}
      key={task.id}
      id={task.id}
      className={`${task.active === true ? "active" : "non-active"}`}
    >
      {task.title.includes(props.searchValue) ? (
        <ShowWhatIncludes
          task={task}
          handleChangeActive={props.handleChangeActive}
        />
      ) : null}
    </li>
  ));
  return tasksArray;
};
class ToDoApp extends React.Component {
  state = {
    taskList: [
      {
        id: 0,
        title: "nakarmić psa",
        active: true
      },
      {
        id: 1,
        title: "pobiegać",
        active: false
      },
      {
        id: 2,
        title: "czytać książkę",
        active: true
      }
    ],
    valueOfInput: ""
  };

  handleChangeActive = e => {
    // console.log(e.target.id);
    const id = e.target.id;

    let newTaskList = Array.from(this.state.taskList);
    // debugger;
    newTaskList.map(item => {
      if (item.id === parseInt(id)) {
        item.active = !item.active;
      }
      // debugger;
    });
    this.setState({
      taskList: newTaskList
    });
  };

  handleAddTask = value => {
    console.log(value);
    let newTaskList = Array.from(this.state.taskList);
    const lenght = newTaskList.length;
    newTaskList.push({
      id: lenght,
      title: value,
      active: true
    });
    // debugger;
    this.setState({
      taskList: newTaskList
    });
  };

  handleValueOfInput = e => {
    this.setState({
      valueOfInput: e.target.value
    });
  };

  render() {
    return (
      <>
        <div>
          <ToDoHeader taskList={this.state.taskList} />
          <TaskInput handleAddTask={this.handleAddTask} />
          <label>
            Wyszukaj: {` `}
            <input
              type="text"
              placeholder={"Search..."}
              value={this.state.valueOfInput}
              onChange={this.handleValueOfInput}
            />
          </label>
          <ul>
            <TaskList
              searchValue={this.state.valueOfInput}
              taskList={this.state.taskList}
              handleChangeActive={this.handleChangeActive}
            />
          </ul>
        </div>
      </>
    );
  }
}

class Clock extends React.Component {
  getTime = () => {
    const currentTime = new Date();

    return {
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds()
    };
  };
  setTime = () => {
    const time = this.getTime();
    this.setState({
      time
    });
  };

  componentDidMount() {
    this.interval = setInterval(this.setTime, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  state = {
    time: this.getTime()
  };
  render() {
    const { hours, minutes, seconds } = this.state.time;
    return (
      <h1>
        {" "}
        {`${hours > 9 ? hours : "0" + hours} : ${
          minutes > 9 ? minutes : "0" + minutes
        } : ${seconds > 9 ? seconds : "0" + seconds}`}
      </h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
