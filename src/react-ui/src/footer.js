import React, { Component } from 'react';
import './styles/footer.css';
import Contact from "./contact";

class Footer extends Component {
  render() {
    return (
        <div className="App-footer">
            <footer className="page-footer font-small teal pt-4">


                <div className="container-fluid text-center text-md-left">


                    <div className="row">
                        <Contact />

                        <div className="col-md-6 mt-md-0 mt-3">


                            <h5 className="text-uppercase font-weight-bold">Footer text 1</h5>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita sapiente sint, nulla,
                                nihil repudiandae commodi voluptatibus corrupti animi sequi aliquid magnam debitis,
                                maxime quam recusandae harum esse fugiat. Itaque, culpa?</p>

                        </div>

                    </div>

                </div>



                <div className="footer-copyright text-center py-3">© 2019 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/"> dontgiveafuck.com</a>
                </div>


            </footer>

        </div>
    );
  }
}

export default Footer;