var GraphContainer = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },

    handleSubmit: function (e) {
        e.preventDefault();

        var sprint = this.refs.sprint.value;
        var field = this.refs.field.value;

        if (!sprint) {
            return;
        }

        $.ajax({
            url: '/stories',
            data: {
                sprint: sprint,
                field: field
            },
            dataType: 'json',
            cache: false
        }).done(function (data) {
            this.setState({data: data});
        }.bind(this))
        .fail(function () {
            console.log(arguments);
        }.bind(this));
    },

    delete: function (e) {
        e.preventDefault();

        this.props.onGraphContainerDelete(this.props.id);
    },

    render: function () {
        return (
            <div className="graph-container panel panel-default">
                <form onSubmit={this.handleSubmit} className="form-inline">
                    <div className="form-group">
                        <input type="text" ref="sprint" placeholder="Sprint n°" className="form-control"/>
                        <select ref="field" className="form-control">
                            <option value="nb-points">Nb points</option>
                            <option value="status">Status</option>
                            <option value="creator">Creator</option>
                            <option value="labels">Labels</option>
                        </select>
                        <button type="submit" className="btn btn-primary">Go</button>
                        <span className="glyphicon glyphicon-remove" onClick={this.delete}></span>
                    </div>
                </form>
                <div className="content">{JSON.stringify(this.state.data, null, 2)}</div>
            </div>
        );
    }
});