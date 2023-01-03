import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__image"></div>
        <div className="footer__info">
          <dl className="footer__info-column">
            <dt className="footer__info-column-header">
              ждем вас в наших ресторанах
            </dt>
            <dd className="footer__info-column-block">
              <span className="footer__info-column-row">Уфа, центр</span>
              <span className="footer__info-column-row">Парковая, 1</span>
              <a className="footer__phone-link" href="tel:+73471234567">
                <span className="footer__phone">+7 (347) 123-45-67</span>
              </a>
            </dd>
            <dd className="footer__info-column-block">
              <span className="footer__info-column-row">
                Уфа, Цветы Башкирии
              </span>
              <span className="footer__info-column-row">Цветочная, 1</span>
              <a className="footer__phone-link" href="tel:+73471234567">
                <span className="footer__phone">+7 (347) 123-45-67</span>
              </a>
            </dd>
            <dd className="footer__info-column-block">
              <span className="footer__info-column-row">
                Уфа, р-н Молодежный
              </span>
              <span className="footer__info-column-row">Молодежная, 1</span>
              <a className="footer__phone-link" href="tel:+73471234567">
                <span className="footer__phone">+7 (347) 123-45-67</span>
              </a>
            </dd>
          </dl>
          <dl className="footer__info-column">
            <dt className="footer__info-column-header">мы открыты для вас</dt>
            <dd className="footer__info-column-block">
              <span className="footer__info-column-row">
                понедельник - четверг
              </span>
              <span className="footer__info-column-row">9:00 - 22:00</span>
            </dd>
            <dd className="footer__info-column-block">
              <span className="footer__info-column-row">
                пятница - воскресенье
              </span>
              <span className="footer__info-column-row">11:00 - 24:00</span>
            </dd>
          </dl>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
