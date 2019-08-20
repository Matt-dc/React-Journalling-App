const { CLIENT_ORIGIN } = require('../config/config')

module.exports = {

  confirm: token => ({   

    subject: 'JournalApp Email Confirmation',
    html: `

    <div 
      style="text-align: center;">

        <h1 style="font-family: verdana;
                    letter-spacing: -0.05em;
                    font-size: 50px;
                    font-weight: bold;
                    color: black;"
              >JournalApp</h1>

        <p style="font-size: 16px; color: #000">Click the link below to sign into your JournalApp account and complete your sign up details.</p>

        <p style="font-size: 16px; color: #000; margin: 30px 0;">This link will expire in one hour.</p>

        <p style="margin: 30px 0;">
          <a href="${CLIENT_ORIGIN}/confirm/${token}"
              style="  
                background-color: #0045ad;
                font-size: 16px;
                margin: 30px 0;
                color: #fff;
                padding: 0.6em 1.5em;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none"
            >Sign in to Journal App</a>
        </p>
            
        <div style="width: 50%; margin: 3% auto; font-size: 14px; color: black">
          If the button doesn't work, paste this link into your web browser: <br />
          ${CLIENT_ORIGIN}/confirm/${token}
        </div>
         
        <p style="color: #b3b3b1"; font-size: 12px; >If you did not make this request, you can safely ignore this email.</<p>

    </div>
      `,

    text: `If the button doesn't work, paste this link into your web browser: ${CLIENT_ORIGIN}/confirm/${token}


        <a> 
            ${CLIENT_ORIGIN}/confirm/${token}
        </a>`
  }) 
}

