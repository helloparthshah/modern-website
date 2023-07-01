import { Col, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import parth from '/public/images/parth.jpg';
export default function Hello() {
  return (
    <Row className='mt-5 mb-5 hello'>
      <Col xs={5}>
        <div className='animate'>
          <Image src={parth} alt='Parth Shah'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </Col>
      <Col className='d-flex justify-content-center flex-column ms-5'>
        <Row>
          <h1 className='name'>
            Parth Shah
          </h1>
        </Row>
        <Row>
          Hello! I am a Software Engineer at Amazon.
          I graduated from the University of California, Davis with a B.S. in Computer Science and Engineering.
        </Row>
        <Row className='mt-3'>
          <Col className='d-flex justify-content-center'>
            <Button variant='outline-secondary' href='/resume.pdf' target='_blank'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
                <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
              </svg>
              {' Download Resume'}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}