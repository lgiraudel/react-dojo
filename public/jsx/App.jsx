var Dashboard = React.createClass({
    getInitialState: function () {
        return {
            containers: []
        }
    },

    addGraphContainer: function (e) {
        this.setState({
            containers: this.state.containers.concat({id: Date.now()})
        });
    },

    deleteGraphContainer: function (graphContainerId) {
        this.setState({
            containers: this.state.containers.filter(function (container) {
                return container.id !== graphContainerId
            })
        });
    },

    render: function () {
        var graphContainers = this.state.containers.map(function (graphContainer, i) {
            return <li key={'graph' + graphContainer.id}><GraphContainer id={graphContainer.id} onGraphContainerDelete={this.deleteGraphContainer}></GraphContainer></li>;
        }, this);
        return (
            <div className="panel panel-default dashboard">
                <div className="panel-heading">
                    <h1 className="panel-title">Hello, I'm the Dashboard</h1>
                </div>
                <div className="panel-body">
                    <button className="btn btn-primary" onClick={this.addGraphContainer}>Add a GraphContainer</button>
                    <ul className="panel panel-default">
                    {graphContainers}
                    </ul>
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <Dashboard></Dashboard>, document.getElementById('my-app')
);