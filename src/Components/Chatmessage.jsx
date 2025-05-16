// import React from 'react'

// export default function Chatmessage({text,logo,email,user}) {
//   return (
//     <div className={`d-flex ${email === user.email ? 'justify-content-end' : ''}`}>

      
//       {
//         user.email === email ?(
//         <span className="message-right">
//         <span className='message-text'>{text}</span>
//         <img src={logo} alt="logo" className='logo-icon' />
//           </span>

//         ):(
//           <span className="message-neft">
//           <span className='message-text'>{text}</span>
//           <img src={logo} alt="logo" className='logo-icon' />
//             </span>

//       )
//       }

//     </div>
//   )
// // }
// export default function Chatmessage({ text = '', logo = '', email = '', user = {} }) {
//   return (
//     <div className={`d-flex ${email === user?.email ? 'justify-content-end' : ''}`}>
//       {
//         email === user?.email ? (
//           <span className="message-right">
//             <span className="message-na">{name}</span>
//             <span className='message-text'>{text}</span>
//             <img src={logo} alt="logo" className='logo-icon' />
//           </span>
//         ) : (
//           <span className="message-neft">
//             <span className='message-text'>{text}</span>
//             <img src={logo} alt="logo" className='logo-icon' />
//           </span>
//         )
//       }
//     </div>
//   );
// }

export default function Chatmessage({ text = '', logo = '', email = '', name = '', user = {} }) {
  const isCurrentUser = email === user?.email;

  return (
    <div className={`d-flex ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className={isCurrentUser ? 'message-right' : 'message-neft'}>
        {!isCurrentUser && name && <span className="message-na">{name}</span>}:
        <span className="message-text">{text}</span>
      </div>
    </div>
  );
}
