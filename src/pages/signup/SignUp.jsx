import { Message } from '@common/Message/';
import { ControlBar } from '@sections/controlbar/ControlBar';

export const SignUp = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'info'} title={'SignUp'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};
