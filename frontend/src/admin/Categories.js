import React, {Component} from 'react';
import CategoryAPI from "../util/CategoryAPI";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

class EditModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editData: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateButton = this.handleUpdateButton.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const data = event.target.value;
        this.setState({editData: data});
    }

    handleUpdateButton(){
        const categoryRequest = { id: this.props.categoryId, name: this.state.editData};
        CategoryAPI.editCategory(categoryRequest)
            .then(() =>{
                Alert.success("Категория успешно изменена!");
                this.props.toggleDialog();
                this.props.getCategories();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        })
    }


    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.toggleDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить категорию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Название категории</label>
                            <input type="text" className="form-control" id="textInput"
                                   value={this.state.editData}
                                   onChange={this.handleInputChange}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggleDialog}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.handleUpdateButton}>
                        Обновить
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createData: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreateButton = this.handleCreateButton.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const data = event.target.value;
        this.setState({createData: data});
    }

    handleCreateButton() {
        const categoryRequest = {name: this.state.createData};

        CategoryAPI.createCategory(categoryRequest)
            .then(response => {
                Alert.success("Категория успешно добавлена!");
                this.props.toggleDialog();
                this.props.getCategories();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }

    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.toggleDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новую категорию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Название категории</label>
                            <input type="text" className="form-control" id="textInput"
                                   onChange={this.handleInputChange}
                                   placeholder="Введите название категории"/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggleDialog}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.handleCreateButton}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
    }

    handleSearchChange(event) {
        event.preventDefault();
        this.props.setCategoriesState("search", event.target.value);
    }

    handleClearClick() {
        this.props.getCategories();
    }

    handleSearchButton() {
        this.props.getCategoriesByName(this.props.search);
    }

    render() {
        return(
            <div>
                <form className="form-inline" onSubmit={event => event.preventDefault()}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Искать"
                           aria-label="Search" value={this.props.search} onChange={this.handleSearchChange}
                    onClick={this.handleClearClick}/>
                    <button className="btn btn-outline-success my-2 my-sm-0"
                            onClick={this.handleSearchButton}>Искать</button>
                </form>
            </div>
        )
    }
}

class CreateButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <button type="button" className="mb-2 btn btn-outline-dark"
                        onClick={this.props.toggleDialog}>Добавить</button>
            </div>
        )
    }
}

class Content extends Component {
    constructor(props) {
        super(props);

        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
    }

    handleEditButton(categoryId){
        this.props.toggleDialog();
        this.props.setCategoriesState("editCategoryId", categoryId);
    }

    handleDeleteButton(categoryId) {
        deleteCategory(categoryId)
            .then(() => {
                Alert.success("Категория успешно удалена!");
                this.props.getCategories();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }


    render() {
        return(
            <div className="list-group">
                {
                    this.props.categories.map(category =>
                        <div>
                            <li className="mb-1 list-group-item d-flex justify-content-between">
                                <p className="mt-2 flex-grow-1">{category.name}</p>
                                <div className="btn-group" >
                                    <button type="button" className="mr-1 btn btn-outline-success"
                                            onClick={() => this.handleEditButton(category.id)}>Изменить</button>
                                    <button type="button" className="mr-1 btn btn-outline-danger"
                                            onClick={() => this.handleDeleteButton(category.id)}>Удалить</button>
                                </div>
                            </li>
                        </div>)
                }
            </div>
        )
    }
}

class Pagination extends Component  {
    constructor(props) {
        super(props);

        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
    }

    handleBackButton() {
        const activePage = this.props.activePage;

        if (activePage !== 0) {
            this.props.setCategoriesState("activePage", activePage - 1);
        }

        this.props.getCategories();
    }

    handleNextButton() {
        const activePage = this.props.activePage;
        const totalPages = this.props.totalPages;

        if (activePage !== totalPages - 1) {
            this.props.setCategoriesState("activePage", activePage + 1);
        }

        this.props.getCategories();
    }

    render() {
        return(
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                        <button type="button" className="btn btn-light"
                                onClick={this.handleBackButton}>Предыдущая</button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="btn btn-light"
                                onClick={this.handleNextButton}>Следующая</button>
                    </li>
                </ul>
            </nav>
        )
    }
}

export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            showCreateModal: false,
            showEditModal: false,
            editCategoryId: null,
            search: null,
            activePage: 0,
            totalPages: 0,
            pageSize: 5,
        };


        this.getCategoriesByName = this.getCategoriesByName.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.setNewState = this.setNewState.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        CategoryAPI.getCategories({page: this.state.activePage, size: this.state.pageSize})
            .then(response => {
                this.setState({totalPages: response.totalPages});
                this.setState({categories: response.content});
            });
    }

    getCategoriesByName() {
        getCategoriesByName({name: this.state.search})
            .then(response => {
                this.setState({categories: [response]});
            });
    }

    setFilterState(key, value) {
        this.setState({[key]: value});
    }

    setNewState(key, value) {
        this.setState({[key]: value});
    }

    toggleCreateModal() {
        this.setState({showCreateModal: !this.state.showCreateModal});
    }

    toggleEditModal() {
        this.setState({showEditModal: !this.state.showEditModal});
    }

    render() {
        if (!this.state.categories){
            return null;
        }

        return (
            <div className="container">
                <CreateModalDialog show={this.state.showCreateModal}
                                   toggleDialog={this.toggleCreateModal}
                                   getCategories={this.getCategories}/>

                <EditModalDialog show={this.state.showEditModal}
                                 toggleDialog={this.toggleEditModal}
                                 getCategories={this.getCategories}
                                 categoryId={this.state.editCategoryId}/>

                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <CreateButton toggleDialog={this.toggleCreateModal}/>
                    <SearchComponent search={this.state.search}
                                     getCategories={this.getCategories}
                                     getCategoriesByName={this.getCategoriesByName}
                                     setCategoriesState={this.setNewState}/>
                </div>

                <Content toggleDialog={this.toggleEditModal}
                         setCategoriesState={this.setNewState}
                         getCategories={this.getCategories}
                         categories={this.state.categories}/>

                <Pagination totalPages={this.state.totalPages}
                            activePage={this.state.activePage}
                            setCategoriesState={this.setNewState}
                            getCategories={this.getCategories}/>
            </div>

        )
    }
}