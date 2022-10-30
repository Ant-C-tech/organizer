import { Message } from '@common/Message/';
import { ControlBar } from '@sections/Controlbar';

export const Contacts = () => {
  return (
    <>
      <section className='content-container'>
        <Message type={'message-info'} title={'Contact'}>
          <p>Sorry, this functionality is in development at the moment.</p>
        </Message>
      </section>
      <ControlBar />
    </>
  );
};