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
import { useStoreActions } from '../../Store';

export interface RegisterProps { history: History;}

function handleImgChange(event: React.ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<string>>,
  setImgChanged: React.Dispatch<React.SetStateAction<boolean>>): void {
  event.preventDefault();
  if (!event.target || !event.target.files || event.target.files.length <= 0) return;
  const reader = new FileReader();
  const file = event.target.files[0];
  reader.onloadend = () => {
    setFile(reader.result as string);
    setImgChanged(true);
  };
  if (file) reader.readAsDataURL(file);
}

const Register = (props: RegisterProps): React.ReactElement => {
  const [pseudo, setPseudo] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [imgChanged, setImgChanged] = React.useState(false);
  const inputOpenFileRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const [file, setFile] = React.useState('');
  const setUser = useStoreActions((actions) => actions.setUser);

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
                    handleImgChange(event, setFile, setImgChanged);
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
                <Form.Control type="text" placeholder="Bob" value={pseudo} onChange={(e) => { setPseudo(e.currentTarget.value); }} />
              </Form.Group>
              <Form.Group controlId="formBasicFirstname">
                <Form.Label>{i18n.t('firstname', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                <Form.Control type="text" placeholder="Bob" value={firstname} onChange={(e) => { setFirstname(e.currentTarget.value); }} />
              </Form.Group>
              <Form.Group controlId="formBasicLastname">
                <Form.Label>{i18n.t('lastname', { lng: localStorage.getItem('lang') as string })}</Form.Label>
                <Form.Control type="text" placeholder="Durand" value={lastname} onChange={(e) => { setLastname(e.currentTarget.value); }} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>
                  {i18n.t('email', { lng: localStorage.getItem('lang') as string })}
                  *
                </Form.Label>
                <Form.Control type="text" placeholder="Bob@gmail.com" value={email} onChange={(e) => { setEmail(e.currentTarget.value); }} />
              </Form.Group>
              <Form.Group controlId="formBasicPass">
                <Form.Label>
                  {i18n.t('password', { lng: localStorage.getItem('lang') as string })}
                  *
                </Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => { setPassword(e.currentTarget.value); }} />
              </Form.Group>
            </Form>
          </Card.Body>
          <Row>
            <Button
              disabled={!pseudo || !password || !email}
              onClick={() => {
                setUser({
                  id: 123, pseudo, email, firstname, lastname,
                }); props.history.push('/profile');
              }}
              className="mx-auto mb-2 btn"
              variant="outline-success"
            >
              {i18n.t('register', { lng: localStorage.getItem('lang') as string })}
            </Button>
          </Row>
        </Card>
      </Col>
    </Container>
  );
};

export default Register;
