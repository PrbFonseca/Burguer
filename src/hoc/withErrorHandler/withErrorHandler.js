import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import AuxWrapper from '../AuxWrapper';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        
        state = {
            error:null
        }
        
        // Component Will mount is going to be deprecated. We can also do this on the constructor
        componentWillMount () {

            // Clear any error on request
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });

            // Add the error to the state, if any
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error:error});
            });
        }

        componentWillUnmount () {
            // We need to remove the interceptors when the component is unmounted
            // Also to prevet memory leaks
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            // Used to clear the modal
            this.setState( { error:null}  );
        }

        render () {
            return (
                <AuxWrapper>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </AuxWrapper>
            )
        }
    }
}

export default withErrorHandler;