import "../Footer.css"
const Footer = () => {
  return (
    <>
        <div className="container-footer" id="footer">
            <div className="content-footer">
                <div className="footer-contact">
                    <img alt='logo' src="./img/logo.png" style={{ width: '50px' }} /> 
                    <p>Etiam sutor risus, dapibus act elefend katen, lacinia sitamet denim. Mauris sagittis kansa interdum dignissim.</p>  
                    <p>123 calle, Buenos Aires, AR</p>
                    <p>+54. 011 12356789</p>
                    <p>info.dento@gmail.com</p>
                </div>
                <div className="footer-schedule">
                    <div className="footer-hours">
                    <h5>HORARIOS</h5>
                        <div className="days">
                            <p>Lun - Vie</p>
                            <p>9:00 - 18:00</p>
                        </div>
                        <div className="time">
                            <p>Sab - Dom</p>
                            <p>Cerrado</p>
                        </div>
                    </div>
                </div>
                <div className="footer-social">
                    <h5>REDES</h5>
                    <div>
                        <p>Facebook</p>
                    </div>
                    <div>
                        <p>Twitter</p>
                    </div>
                    <div>
                        <p>Instagram</p>
                    </div>
                </div>
                <div className="footer-social">
                    <h5>MÁS INFORMACIÓN</h5>
                    <div>
                        <p>Etiam sutor risus, dapibus act elefend katen, lacinia sitamet denim. Mauris sagittis kansa interdum dignissim.</p>  
                    </div>
                </div>
                <div className="footer-author">
                    <hr />
                    <p>&copy; {new Date().getFullYear()} - Todos los derechos reservados. Brian G.</p>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Footer