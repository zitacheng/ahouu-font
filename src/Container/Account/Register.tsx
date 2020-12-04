import * as React from 'react';
import i18n from 'i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { History } from 'history';
import logo from '../../Assets/logo.png';
import upload from '../../Assets/upload.png';

export interface RegisterProps { history: History;}
export interface RegisterState {
  pseudo?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  imgChanged?: boolean;
  inputOpenFileRef?: React.RefObject<HTMLInputElement>;
  file?: string;
}

// TODO outline none ou 0 pour le click des images ou button your identity

class Register extends React.PureComponent<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      pseudo: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      imgChanged: false,
      inputOpenFileRef: React.createRef<HTMLInputElement>(),
      file: '',
    };
    // this.inputOpenFileRef = React.createRef<HTMLDivElement>();
  }

  authenticate = (history: History): void => {
    // TODO call back api to create account
    history.push('/Profile');
  };

  handleImgChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    if (!event.target || !event.target.files || event.target.files.length <= 0) return;
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: reader.result as string,
        imgChanged: true,
      });
    };
    if (file) reader.readAsDataURL(file);
  }

  render(): React.ReactNode {
    const { history } = this.props;
    const {
      pseudo,
      password,
      firstname,
      lastname,
      email,
      imgChanged,
      inputOpenFileRef,
      file,
    } = this.state;

    return (
      <Container className="containerBg" fluid>
        <Col>
          <Row className="py-2">
            <Image className="loginLogo mx-auto" src={logo} />
          </Row>
          <Card
            bg="dark"
            text="white"
            style={{ width: '18rem' }}
            className="mb-2 mx-auto p-2 cardShadow"
          >
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicImg">
                  <Form.File
                    ref={inputOpenFileRef}
                    className="mt-2"
                    style={{ display: 'none' }}
                    accept="image/*"
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      this.handleImgChange(event);
                    }}
                  />
                  {
                    imgChanged && file
                      ? (
                        <div
                          role="button"
                          tabIndex={0}
                          className="mx-auto click chooseImg"
                          onClick={() => {
                            if (inputOpenFileRef && inputOpenFileRef.current) {
                              inputOpenFileRef?.current.click();
                            }
                          }}
                          onKeyDown={() => { }}
                        >
                          <Image
                            className="my-auto mx-auto"
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                            }}
                            src={file}
                            roundedCircle
                          />
                        </div>
                      )
                      : (
                        <div
                          role="button"
                          tabIndex={0}
                          className="mx-auto click inputImg"
                          onClick={() => {
                            if (inputOpenFileRef && inputOpenFileRef.current) {
                              inputOpenFileRef?.current.click();
                            }
                          }}
                          onKeyDown={() => { }}
                        >
                          <Image className="my-auto mx-auto" style={{ width: '50px', height: 'auto' }} src={upload} />
                        </div>
                      )
                  }
                </Form.Group>
                <Form.Group controlId="formBasicPseudo">
                  <Form.Label>
                    {i18n.t('pseudo', { lng: localStorage.getItem('lang') as string })}
                    *
                  </Form.Label>
                  <Form.Control type="text" placeholder="Bob" value={pseudo} onChange={(e) => { this.setState({ pseudo: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicFirstname">
                  <Form.Label>{i18n.t('firstname', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                  <Form.Control type="text" placeholder="Bob" value={firstname} onChange={(e) => { this.setState({ firstname: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicLastname">
                  <Form.Label>{i18n.t('lastname', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                  <Form.Control type="text" placeholder="Durand" value={lastname} onChange={(e) => { this.setState({ lastname: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    {i18n.t('email', { lng: localStorage.getItem('lang') as string })}
                    *
                  </Form.Label>
                  <Form.Control type="text" placeholder="Bob@gmail.com" value={email} onChange={(e) => { this.setState({ email: e.currentTarget.value }); }} />
                </Form.Group>
                <Form.Group controlId="formBasicPass">
                  <Form.Label>
                    {i18n.t('password', { lng: localStorage.getItem('lang') as string })}
                    *
                  </Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => { this.setState({ password: e.currentTarget.value }); }} />
                </Form.Group>
              </Form>
            </Card.Body>
            <Row>
              <Button disabled={!pseudo || !password || !email} onClick={() => { this.authenticate(history); }} className="mx-auto mb-2 btn" variant="outline-success">{i18n.t('register', { lng: localStorage.getItem('lang') as string })}</Button>
            </Row>
          </Card>
        </Col>
      </Container>
    );
  }
}

export default Register;

// {
//   this.state.imgChanged
//    ?
//      <Image
//        className="pointerClick"
//        style={{
//          width: '100px', height: '100px', objectFit: 'cover',
// boxShadow: '0px 8px 10px 1px rgba(0, 0, 0, 0.14)',
//        }}
//        src={logo}
//        onClick={() => {inputOpenFileRef.current.click()}}
//        roundedCircle
//      />

//    :
//      <div
//        className="mx-auto pointerClick"
//        onClick={() => {inputOpenFileRef?.current.click()}}
//        style={{
//          backgroundColor: '#7EB681', width: '100px', height: '100px',
// borderRadius: '50px', display: 'flex',
//        }}
//      >
//        <Image className="my-auto mx-auto" style={{ width: '50px', height: 'auto' }} src={logo} />
//      </div>
// }
// `data:image/jpeg;base64
