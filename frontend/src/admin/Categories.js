import React, {Component} from 'react';
import {editCategories, createCategory, deleteCategory, getCategories} from "../util/APIUtils";
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
            showEditModal: false,
            editCategoryData: {
                id: '',
                name: ''
            },
            search: "",
        };

        this.getCategories = this.getCategories.bind(this);
        this.changeEditModal = this.changeEditModal.bind(this);
        this.changeShowModal = this.changeShowModal.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        getCategories()
            .then(response => {
                this.setState({categories: response});
            });
    }

    changeShowModal() {
        this.setState({showModal: !this.state.showModal});
    }

    createCategory() {
        const categoryRequest = {name: this.state.newCategoryData};

        createCategory(categoryRequest)
            .then(response => {
                Alert.success("Категория успешно добавлена!");
                this.setState({showModal: false});

                let { categories } = this.state;
                categories.push({id: response.id, name: response.name});
                this.setState({categories: categories});
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }

    changeEditModal(){
        this.setState({showEditModal: !this.state.showEditModal});
    }

    updateCategory(){
        const categoryRequest = {id:this.state.editCategoryData.id, name: this.state.editCategoryData.name};
        editCategories(categoryRequest.id, categoryRequest)
            .then(() =>{
                Alert.success("Категория успешно изменена!");
                this.setState({showEditModal: false});
                this.getCategories();

            }).catch(error => {
            Alert.error((error && error.message) || 'Что-то пошло не так');
        })
    }

    editCategory(id, name){
        this.setState({editCategoryData: {id, name}, showEditModal: !this.state.showEditModal});
    }
    deleteCategory(categoryId) {
        deleteCategory(categoryId)
            .then(() => {
                Alert.success("Категория успешно удалена!");
                let {categories} = this.state;
                let filteredCategories = categories.filter(category => category.id !== categoryId);
                this.setState({categories: filteredCategories});
            }).catch(error => {
                Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }

    handleSearchChange(event) {
        event.preventDefault();
        this.setState({search: event.target.value});
    }

    render() {
        if (!this.state.categories){
            return null;
        }

        let filteredCategories = this.state.categories.filter(category => {
            return category.name.indexOf(this.state.search) !== -1;
            });

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
                        <Button variant="primary" onClick={this.createCategory}>
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showEditModal} onHide={this.changeEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить категорию</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Название категории</label>
                                <input type="text" className="form-control" id="textInput"
                                       value={this.state.editCategoryData.name}
                                       onChange={e => {let {editCategoryData} = this.state;

                                           editCategoryData.name = e.target.value;

                                           this.setState({editCategoryData});
                                       }}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.changeEditModal}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.updateCategory}>
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Modal>


                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.changeShowModal}>Добавить</button>
                    <div>
                        <input className="form-control mr-sm-1" type="search" placeholder="Поиск"
                               aria-label="Search" value={this.state.search} onChange={this.handleSearchChange}/>
                    </div>

                </div>
                <div className="list-group">
                    {
                        filteredCategories.map(category =>
                            <div>
                                <li className="mb-1 list-group-item d-flex justify-content-between">
                                    <p className="mt-2 flex-grow-1">{category.name}</p>
                                    <div className="btn-group" >
                                        <button type="button" className="mr-1 btn btn-outline-success"
                                                onClick={() => this.editCategory(category.id, category.name)}>Изменить</button>
                                        <button type="button" className="mr-1 btn btn-outline-danger"
                                                onClick={() => this.deleteCategory(category.id)}>Удалить</button>
                                    </div>
                                </li>
                            </div>)
                    }
                </div>
            </div>

        )
    }
};