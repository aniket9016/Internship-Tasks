import React from 'react';

class CRUDUsingClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            newItem: '',
            editIndex: -1,
            editValue: ''
        };
    }

    // Create operation
    addItem = () => {
        if (this.state.newItem.trim() !== '') {
            this.setState(prevState => ({
                items: [...prevState.items, this.state.newItem],
                newItem: ''
            }));
        }else{
            alert("Enter item value");
        }
    };

    // Read operation
    renderItems = () => {
        return this.state.items.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {this.state.editIndex === index ? (
                    <div className="d-flex w-100 gap-2">
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.editValue}
                            onChange={this.handleEditChange}
                        />
                        <button className="btn btn-success btn-sm" onClick={this.saveEdit}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={this.cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <span>{item}</span>
                        <div>
                            <button className="btn btn-primary btn-sm me-2" onClick={() => this.editItem(index)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => this.deleteItem(index)}>Delete</button>
                        </div>
                    </>
                )}
            </li>
        ));
    };

    // Update operation
    editItem = (index) => {
        this.setState({
            editIndex: index,
            editValue: this.state.items[index]
        });
    };

    handleEditChange = (event) => {
        this.setState({ editValue: event.target.value });
    };

    saveEdit = () => {
        const { editIndex, editValue } = this.state;
        const updatedItems = [...this.state.items];
        updatedItems[editIndex] = editValue;
        this.setState({
            items: updatedItems,
            editIndex: -1,
            editValue: ''
        });
    };

    cancelEdit = () => {
        this.setState({
            editIndex: -1,
            editValue: ''
        });
    };

    // Delete operation
    deleteItem = (index) => {
        const updatedItems = [...this.state.items];
        updatedItems.splice(index, 1);
        this.setState({ items: updatedItems });
    };

    handleInputChange = (event) => {
        this.setState({ newItem: event.target.value });
    };

    render() {
        return (
            <div className="container py-5">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">CRUD App Using Class Component </h2>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.newItem}
                                onChange={this.handleInputChange}
                                placeholder="Enter item"
                            />
                            <button className="btn btn-primary" onClick={this.addItem}>Add</button>
                        </div>
                        <ul className="list-group">
                            {this.renderItems()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CRUDUsingClass;
