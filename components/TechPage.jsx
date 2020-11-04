import * as React from "react";
import * as axios from "axios";
import TechList from "./TechList";
import TechForm from "./TechForm";

export default class TechPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { adding: false, newTech: {} };
        this.props = props;
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onAdd(e) {
        e.preventDefault();

        this.setState({ adding: true });
    }

    onChange(target) {
        var newTech = { ...this.state.newTech };
        newTech[target.name] = target.value;
        this.setState({ newTech: newTech });
    }

    onSave() {
        axios
            .post("/api/tech/", this.state.newTech)
            .then(() => this.load())
            .then(this.setState({ newTech: {}, adding: false }))
            .catch
            //todo: set an error condition
            ();
    }

    onCancel() {
        this.setState({ newTech: {}, adding: false });
    }

    componentDidMount() {
        this.load();
    }

    increment(techIndex) {
        return () => {
            this.setState((state, props) => {
                const updatedTech = state.tech.slice();
                updatedTech[techIndex].count++;
                return { tech: updatedTech };
            });
        };
    }

    decrement(techIndex) {
        return () => {
            this.setState((state, props) => {
                if (state.tech[techIndex].count === 0) {
                    return state;
                }
                const updatedTech = state.tech.slice();
                updatedTech[techIndex].count--;
                return { tech: updatedTech };
            });
        };
    }

    remove(techIndex) {
        return () => {
            this.setState((state, props) => {
                const updatedTech = [...state.tech];
                updatedTech.splice(techIndex, 1);
                return { tech: updatedTech };
            });
        };
    }

    //lift state from item to page -done
    async load() {
        let response = await axios.get("/api/tech");
        this.setState({ tech: response.data });
    }
    // ** start here  create  inc and dec func thats a handler in new render method takes a peram which tech to modify 1.find item to modify 2. create clone of item 3. inc/dec the count 4. call rest api to update the item 5. reload items -done
    render() {
        return (
            <div>
                <button onClick={this.onAdd}>Add</button>
                {this.state.adding && (
                    <TechForm
                        tech={this.state.newTech}
                        onChange={this.onChange}
                        onSave={this.onSave}
                        onReset={this.onCancel}
                    />
                )}
                {this.state.tech && this.state.tech.length && (
                    <TechList
                        tech={this.state.tech}
                        incrementFn={(index) => this.increment(index)}
                        decrementFn={(index) => this.decrement(index)}
                        deleteFn={(index) => this.remove(index)}
                    />
                )}
            </div>
        );
    }
}
