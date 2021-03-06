import * as React from "react";
import * as axios from "axios";
import TechList from "./TechList";
import TechForm from "./TechForm";

const getNewTech = () => ({ name: "", count: 0 });

export default class TechPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { adding: false, newTech: getNewTech() };
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
            .then(this.setState({ newTech: getNewTech(), adding: false }))
            .catch();
        //todo: set an error condition
    }

    onCancel() {
        this.setState({ newTech: {}, adding: false });
    }

    componentDidMount() {
        this.load();
    }

    increment(techIndex) {
        return () => {
            const updatedTech = this.state.tech.slice();
            updatedTech[techIndex].count++;

            axios
                .put(
                    `/api/tech/${this.state.tech[techIndex].name}`,
                    updatedTech[techIndex]
                )
                .then(() => this.load())
                .then(this.setState({ newTech: getNewTech(), adding: false }))
                .catch(); //error message

            // return { tech: updatedTech };
        };
    }

    decrement(techIndex) {
        return () => {
            if (this.state.tech[techIndex].count === 0) {
                return state;
            }
            const updatedTech = this.state.tech.slice();
            updatedTech[techIndex].count--;

            axios
                .put(
                    `/api/tech/${this.state.tech[techIndex].name}`,
                    updatedTech[techIndex]
                )
                .then(() => this.load())
                .then(this.setState({ newTech: getNewTech(), adding: false }))
                .catch(); //error message
        };
    }

    remove(techIndex) {
        return () => {
            axios
                .delete(`/api/tech/${this.state.tech[techIndex].name}`)
                .then(() => this.load())
                .catch(); //error message
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
                        onReset={this.onCancel}
                        onSubmit={this.onSave}
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
