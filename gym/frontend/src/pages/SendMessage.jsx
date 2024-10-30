import React, { useState } from 'react';

function SendMessage() {
  const [message, setMessage] = useState('');
  const [completed, setCompleted] = useState(false);
  const [whatsappGroupLink, setWhatsappGroupLink] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // WhatsApp group invite link (replace with your actual link)
    const groupId = 'https://chat.whatsapp.com/FNE1kwVNEHKBcscnMUSn9I'; 
    const encodedMessage = encodeURIComponent(message);
    const inviteLink = `https://wa.me/?text=${encodedMessage}%20Join%20my%20WhatsApp%20group:%20${groupId}`;
    
    // Set the WhatsApp group link for display
    setWhatsappGroupLink(inviteLink);
    setCompleted(true);
    
    // Reset the message input
    setMessage('');
  };

  return (
    <section className='p-10 md:p-20 bg-gray-100 min-h-screen'>
      <main className='flex flex-col bg-white shadow-lg rounded-lg p-5 max-w-2xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-center text-gray-700'>Send Message to WhatsApp Group</h2>
        <div>
          <label className='block mb-2 text-lg font-medium text-gray-700'>Message</label>
          <input
            type='text'
            value={message}
            onChange={handleMessageChange}
            className='w-full p-3 border border-gray-300 rounded-md'
            placeholder='Enter your message'
          />
        </div>
        <button
          type='button'
          onClick={handleSendMessage}
          className='w-full px-5 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mt-4'
        >
          Send Message
        </button>
        {completed && (
          <div className='text-center text-green-500 mt-4'>
            <p>Message ready to send!</p>
            <p>
              <a href={whatsappGroupLink} className='text-blue-500' target="_blank" rel="noopener noreferrer">Click here to send it on WhatsApp</a>
            </p>
          </div>
        )}
      </main>
    </section>
  );
}

export default SendMessage;
