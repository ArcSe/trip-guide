import React, {Component} from 'react';
import {addCategory, getCategories} from "../util/APIUtils";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            showModal: false,
            newCategoryData: null,
        };

        this.getCategories = this.getCategories.bind(this);
        this.changeShowModal = this.changeShowModal.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        getCategories()
            .then(response => {
                this.setState({categories: JSON.parse(JSON.stringify(response))});
            });
    }

    changeShowModal() {
        this.setState({showModal: !this.state.showModal});
    }

    addNewCategory() {
        const categoryRequest = {name: this.state.newCategoryData};

        addCategory(categoryRequest)
            .then(response => {
                Alert.success("Категория успешно добавлена!");
                this.setState({showModal: false});

                let { categories } = this.state;
                categories.push({id: response.id, name: response.name});
                this.setState({categories: categories});
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        })
    }

    render() {
        if (!this.state.categories){
            return null;
        }

        return (
            <div className="container">
                <Modal show={this.state.showModal} onHide={this.changeShowModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить новую категорию</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Название категории</label>
                                <input type="text" className="form-control" id="textInput"
                                       onChange={e => {this.state.newCategoryData = e.target.value; }}
                                       placeholder="Введите название категории"/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.changeShowModal}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.addNewCategory}>
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Modal>


                <div>
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.changeShowModal}>Добавить</button>
                </div>
                <div className="list-group">
                    {
                        this.state.categories.map(category =>
                            <div>
                                <li className="mb-1 list-group-item d-flex justify-content-between">
                                    <p className="mt-2 flex-grow-1">{category.name}</p>
                                    <div className="btn-group" >
                                        <button type="button" className="mr-1 btn btn-outline-success">Изменить</button>
                                        <button type="button" className="mr-1 btn btn-outline-danger">Удалить</button>
                                    </div>
                                </li>
                            </div>)
                    }
                </div>
            </div>

        )
    }
};