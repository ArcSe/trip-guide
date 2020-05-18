import React, { Component } from 'react';
import './Payment.css';
import { withRouter } from "react-router-dom";
import ScheduleAPI from "../util/ScheduleAPI";
import Alert from "react-s-alert";


class PaymentInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schedule: null,
            loading: true,
        };

        this.getSchedule = this.getSchedule.bind(this);
    }

    componentDidMount() {
        this.getSchedule();
    }

    getSchedule() {
        const scheduleRequest = { id: this.props.scheduleId };

        ScheduleAPI.getScheduleById(scheduleRequest)
            .then(response => {
                this.setState({ schedule: response });
                this.setState({ loading: false });
            })
            .catch(error => {
                Alert.error((error && error.message) || "Возникла ошибка! Пожалуйста, попробуйте ещё раз!");
            });
    }

    render() {
        const order = new Date().valueOf();

        if (this.state.loading) {
            return null;
        }

        let price = +(Math.round(this.state.schedule.price + "e+2")  + "e-2");
        let commission = +(Math.round(price * 0.03 + "e+2")  + "e-2");
        let sum = +(Math.round(price + commission + "e+2")  + "e-2");

        return (
            <div className="pay-container-table">
                <table cellPadding="5" cellSpacing="0">
                    <tbody>
                    <tr>
                        <td className="param-name">
                            Номер платежа:
                        </td>
                        <td className="param">
                            Заказ { order }
                        </td>
                    </tr>
                    <tr>
                        <td className="param-name">
                            Сумма платежа:
                        </td>
                        <td className="param">
                            {price} руб.
                        </td>
                    </tr>
                    <tr>
                        <td className="param-name">
                            Комиссия:
                        </td>
                        <td className="param">
                            {commission} руб.
                        </td>
                    </tr>
                    <tr>
                        <td className="param-name sum">
                            Сумма к оплате:
                        </td>
                        <td className="param sum">
                            {sum} руб.
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

class CardInfo extends Component {
    render() {
        return (
            <div className="pay-container__content">
                <div className="pay-container__cards">
                    <div className="pay-container__card pay-container__card-front">
                        <div className="card-front no-cardholder">
                            <label className="card-front__label" htmlFor="card"
                                   data-lang-ru="Номер карты" data-lang-en="Card number">
                                Номер карты </label>
                            <input className="card-front__input" type="tel" name="CARD" id="card"
                                   maxLength="19" required="" align="baseline"
                                   placeholder="1234 5678 9876 5432" />

                            <div className="card-front__expiry-date">
                                <label className="card-front__label card-front__label_exp_date"
                                       htmlFor="EXP" data-lang-ru="Срок действия"
                                       data-lang-en="Valid thru">
                                    Срок действия
                                </label>

                                <div className="card-front__select">
                                    <input id="EXP" type="tel" name="EXP" autoComplete="off"
                                           maxLength="2" required="" align="baseline"
                                           data-now_value="05" placeholder="ММ"
                                           data-lang-ru="ММ" data-lang-en="MM" />
                                    <span>/</span>
                                    <input id="EXP_YEAR" type="tel" name="EXP_YEAR"
                                           autoComplete="off" maxLength="2" required=""
                                           align="baseline" data-now_value="20"
                                           placeholder="ГГ" data-lang-ru="ГГ"
                                           data-lang-en="YY" />
                                </div>
                            </div>

                            <div className="card-front__pslogo desktop-only">
                                <img alt="logos"
                                     src="https://pay.pscb.ru/templates/oos2/img/cards.svg" />
                            </div>
                            <div className="card-front__pslogo__cover desktop-only">&nbsp;</div>
                        </div>


                    </div>

                    <div className="pay-container__card pay-container__card-back">
                        <div className="card-back">
                            <div className="card-back__stripe" />
                            <label htmlFor="cvc2" className="card-back__label">CVV2/CVC2</label>

                            <div className="card-back__code">
                                <input autoComplete="off" size="3" id="cvc2" name="CVC2"
                                       type="password" maxLength="3" required="" align="baseline"
                                       placeholder="•••" />
                            </div>

                            <div className="card-back-cvvdesc"
                                 data-lang-ru="Три последние цифры на обороте карты">
                                Три последние цифры на обороте карты
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class PaymentButton extends Component {
    render() {
        return (
            <div className="pay-container__pay">
                <div>
                    <input className="pay-button active" type="submit" value="Оплатить"
                           name="button1" />
                </div>

            </div>
        )
    }
}




class Payment extends Component {

    render() {
        const scheduleId = this.props.match.params.id;

        return (
            <div className="payment-container">
                <div className="payform">
                    <div className="pay-container-wrapper">
                        <div className="pay-container">

                            <div className="pay-container-header">
                                <div className="merchant-logo">
                                    <img alt="logo"
                                         className="bank-logo desktop-only"
                                         src="https://pay.pscb.ru/templates/oos2/img/oos2_pscb-logo.svg" />
                                </div>
                            </div>

                            <div className="pay-container-main">

                                <PaymentInfo scheduleId={scheduleId}/>

                                <CardInfo />

                                <PaymentButton />

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Payment)